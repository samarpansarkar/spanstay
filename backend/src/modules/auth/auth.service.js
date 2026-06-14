import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import AppError from '../../shared/utils/AppError.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../../shared/utils/generateToken.js';
import {
  createUser,
  findUserByEmail,
  findUserById,
  findUserPasswordByEmail,
  findUserByResetToken,
} from './auth.repository.js';
import { addEmailJob } from '../../jobs/services/email-job.service.js';
import { EMAIL_JOB_TYPES } from '../../jobs/constants/job.constants.js';
import { resetPasswordTemplate } from '../email/templetes/resetPassword.templete.js';
import { otpTemplate } from '../email/templetes/otp.templete.js';
import { auditLogger } from '../audit/audit.service.js';
import { AUDIT_ACTIONS, ENTITY_TYPES, ACTOR_ROLES } from '../audit/audit.constants.js';

export const registerUserService = async (userData) => {
  const existingUser = await findUserByEmail(userData.email);

  if (existingUser) {
    if (existingUser.isVerified) {
      throw new AppError('user already exist!!!', 409);
    } else {
      throw new AppError(
        'Email already registered but not verified. Please verify your email or request a new code.',
        409
      );
    }
  }

  const user = await createUser(userData);

  const otp = user.createVerificationToken();
  await user.save({ validateModifiedOnly: true });

  const message = otpTemplate(otp, user.name);

  try {
    await addEmailJob(EMAIL_JOB_TYPES.EMAIL_VERIFICATION, {
      email: user.email,
      name: user.name,
      otp: otp,
    });
  } catch (error) {
    user.verificationToken = undefined;
    user.verificationTokenExpire = undefined;
    await user.save({ validateModifiedOnly: true });
    throw new AppError(
      'There was an error sending the verification email. Try again later!',
      500
    );
  }

  return { email: user.email, message: 'Verification email sent' };
};

export const signinUserService = async (userData) => {
  const existingUser = await findUserPasswordByEmail(userData.email);

  if (!existingUser) {
    throw new AppError('User is not register!!!', 404);
  }

  if (!existingUser.isVerified) {
    throw new AppError(
      'Please verify your email address before signing in.',
      403
    );
  }

  const isPasswordMatched = await existingUser.comparePassword(
    userData.password
  );

  if (!isPasswordMatched) {
    throw new AppError('Invalid password!!', 401);
  }

  const payload = {
    id: existingUser._id,
    role: existingUser.role,
    email: existingUser.email,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  existingUser.refreshToken = refreshToken;

  await existingUser.save();

  let response = {
    user: {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
    },
    accessToken,
    refreshToken,
  };
  return response;
};

export const userProfileService = async (userId) => {
  let user = await findUserById(userId);

  if (!user) {
    throw new AppError('No data found!!', 404);
  }

  return user;
};

export const refreshAccessTokenService = async (refreshToken) => {
  if (!refreshToken) {
    throw new AppError('Refresh token missing!!!', 401);
  }

  try {
    const decodeTokenData = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const user = await findUserById(decodeTokenData.id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (user.refreshToken !== refreshToken) {
      throw new AppError('Invalid refresh token', 401);
    }

    const payload = {
      id: user._id,
      role: user.role,
      email: user.email,
    };

    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    user.refreshToken = newRefreshToken;

    await user.save();

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (error) {
    throw new AppError('Invalid refresh token signin again!!!', 401);
  }
};

export const logoutService = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  user.refreshToken = null;

  await user.save();
};

export const sendTestEmail = async () => {
  await addEmailJob(EMAIL_JOB_TYPES.TEST_EMAIL, {
    to: 'samarpansarkar209@gmail.com',
    subject: 'SpanStay SMTP Test',
    html: `<h1>SpanStay Test Email</h1>`,
  });
};

export const forgotPasswordService = async (email) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError('There is no user with this email address.', 404);
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateModifiedOnly: true });

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  const message = resetPasswordTemplate(resetUrl, user.name);

  try {
    await addEmailJob(EMAIL_JOB_TYPES.FORGOT_PASSWORD, {
      email: user.email,
      name: user.name,
      resetUrl: resetUrl,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateModifiedOnly: true });

    throw new AppError(
      'There was an error sending the email. Try again later!',
      500
    );
  }
};

export const resetPasswordService = async (token, newPassword) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await findUserByResetToken(hashedToken);

  if (!user) {
    throw new AppError('Token is invalid or has expired', 400);
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  const payload = {
    id: user._id,
    role: user.role,
    email: user.email,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  user.refreshToken = refreshToken;
  await user.save({ validateModifiedOnly: true });

  // Audit Logging
  auditLogger({
    actorId: user._id,
    actorRole: ACTOR_ROLES.SYSTEM,
    action: AUDIT_ACTIONS.PASSWORD_CHANGED,
    entityType: ENTITY_TYPES.USER,
    entityId: user._id,
    targetUserId: user._id,
    description: `User reset their password`,
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};

export const verifyEmailService = async (email, otp) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (user.isVerified) {
    throw new AppError('User is already verified', 400);
  }

  const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

  if (
    user.verificationToken !== hashedOtp ||
    user.verificationTokenExpire < Date.now()
  ) {
    throw new AppError('Invalid or expired verification code', 400);
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpire = undefined;
  await user.save({ validateModifiedOnly: true });

  const payload = {
    id: user._id,
    role: user.role,
    email: user.email,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  user.refreshToken = refreshToken;
  await user.save({ validateModifiedOnly: true });

  // Audit Logging
  auditLogger({
    actorId: user._id,
    actorRole: ACTOR_ROLES.SYSTEM,
    action: AUDIT_ACTIONS.EMAIL_VERIFIED,
    entityType: ENTITY_TYPES.USER,
    entityId: user._id,
    targetUserId: user._id,
    description: `User verified their email address`,
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};

export const resendVerificationService = async (email) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (user.isVerified) {
    throw new AppError('User is already verified', 400);
  }

  const otp = user.createVerificationToken();
  await user.save({ validateModifiedOnly: true });

  const message = otpTemplate(otp, user.name);

  try {
    await addEmailJob(EMAIL_JOB_TYPES.EMAIL_VERIFICATION, {
      email: user.email,
      name: user.name,
      otp: otp,
    });
  } catch (error) {
    user.verificationToken = undefined;
    user.verificationTokenExpire = undefined;
    await user.save({ validateModifiedOnly: true });
    throw new AppError(
      'There was an error sending the verification email.',
      500
    );
  }

  return { message: 'Verification email resent successfully' };
};
