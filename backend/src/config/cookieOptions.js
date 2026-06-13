export const refreshTokenCookieOptions = {
  httpOnly: true,

  secure: process.env.NODE_ENV === 'production',

  sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
};

export const refreshTokenCookieConfig = {
  ...refreshTokenCookieOptions,

  maxAge: 7 * 24 * 60 * 60 * 1000,
};
