import asyncHandler from '../../shared/utils/asyncHandler.js';
import sendResponse from '../../shared/utils/SendResponse.js';
import AppError from '../../shared/utils/AppError.js';
import User from '../auth/user.model.js';
import ApprovalRequest from './approval.model.js';
import Hotel from '../hotel/hotel.model.js';
import SystemLog from './log.model.js';

export const getAllUsersController = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Users fetched successfully',
    data: users,
  });
});

export const updateUserController = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).select('-password');
  if (!user) throw new AppError('User not found', 404);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User updated successfully',
    data: user,
  });
});

export const deleteUserController = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) throw new AppError('User not found', 404);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User deleted successfully',
  });
});

export const getPendingApprovalsController = asyncHandler(async (req, res) => {
  const approvals = await ApprovalRequest.find({ status: 'PENDING' })
    .populate('hotel', 'title location')
    .populate('requestedBy', 'name email role')
    .sort({ createdAt: -1 });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Pending approvals fetched',
    data: approvals,
  });
});

export const resolveApprovalController = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const approval = await ApprovalRequest.findById(req.params.id);

  if (!approval) throw new AppError('Approval request not found', 404);
  if (approval.status !== 'PENDING')
    throw new AppError('Approval request is already resolved', 400);

  approval.status = status;
  await approval.save();

  if (status === 'APPROVED') {
    const hotel = await Hotel.findById(approval.hotel);
    if (!hotel) throw new AppError('Hotel not found', 404);

    if (approval.action === 'CREATE') {
      hotel.approvalStatus = 'APPROVED';
      await hotel.save();
    } else if (
      approval.action === 'UPDATE' ||
      approval.action === 'STATUS_CHANGE'
    ) {
      Object.assign(hotel, approval.payload);
      await hotel.save();
    } else if (approval.action === 'DELETE') {
      await Hotel.findByIdAndDelete(hotel._id);
    }
  } else if (status === 'REJECTED') {
    if (approval.action === 'CREATE') {
      await Hotel.findByIdAndDelete(approval.hotel);
    }
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `Approval request ${status.toLowerCase()}`,
    data: approval,
  });
});

export const getSystemLogsController = asyncHandler(async (req, res) => {
  const logs = await SystemLog.find()
    .populate('user', 'name email')
    .sort({ createdAt: -1 })
    .limit(100);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'System logs fetched',
    data: logs,
  });
});
