import asyncHandler from '../../shared/utils/asyncHandler.js';
import sendResponse from '../../shared/utils/SendResponse.js';
import {
  getUserNotificationsService,
  getUnreadNotificationsService,
  getUnreadCountService,
  markNotificationReadService,
  markAllNotificationsReadService,
  deleteNotificationService,
} from './notification.service.js';

export const getNotificationsController = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const result = await getUserNotificationsService(userId, req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Notifications fetched successfully',
    data: result,
  });
});

export const getUnreadNotificationsController = asyncHandler(
  async (req, res) => {
    const userId = req.user.id;
    const result = await getUnreadNotificationsService(userId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Unread notifications fetched successfully',
      data: result,
    });
  }
);

export const getUnreadCountController = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const result = await getUnreadCountService(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Unread count fetched successfully',
    data: result,
  });
});

export const markReadController = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const notificationId = req.params.id;

  const result = await markNotificationReadService(notificationId, userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Notification marked as read',
    data: result,
  });
});

export const markAllReadController = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  await markAllNotificationsReadService(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All notifications marked as read',
    data: null,
  });
});

export const deleteNotificationController = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const notificationId = req.params.id;

  await deleteNotificationService(notificationId, userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Notification deleted successfully',
    data: null,
  });
});
