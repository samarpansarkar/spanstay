export const getErrorMessage = (error) =>
  error?.data?.message || 'Something went wrong';
