import {
  createNotification,
  findNotificationsByUser,
  findUnreadNotifications,
  countUnreadNotifications,
  getNotificationById,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
} from './notification.repository.js';
import redisClient from '../../config/redis.js';
import AppError from '../../shared/utils/AppError.js';

const getCacheKey = (userId) => `notifications:unread:${userId}`;

export const createNotificationService = async (data) => {
  const notification = await createNotification(data);

  await redisClient.del(getCacheKey(data.userId));

  return notification;
};

export const getUserNotificationsService = async (userId, query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const { notifications, total } = await findNotificationsByUser(
    userId,
    skip,
    limit
  );

  return {
    notifications,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getUnreadNotificationsService = async (userId) => {
  return await findUnreadNotifications(userId);
};

export const getUnreadCountService = async (userId) => {
  const cacheKey = getCacheKey(userId);
  const cachedCount = await redisClient.get(cacheKey);

  if (cachedCount) {
    return { count: Number(cachedCount) };
  }

  const count = await countUnreadNotifications(userId);
  await redisClient.set(cacheKey, count, { EX: 300 }); // Cache for 5 minutes

  return { count };
};

export const markNotificationReadService = async (notificationId, userId) => {
  const notification = await getNotificationById(notificationId);

  if (!notification) {
    throw new AppError('Notification not found', 404);
  }

  if (notification.userId.toString() !== userId) {
    throw new AppError(
      'You do not have permission to modify this notification',
      403
    );
  }

  const updatedNotification = await markNotificationRead(
    notificationId,
    userId
  );
  await redisClient.del(getCacheKey(userId));

  return updatedNotification;
};

export const markAllNotificationsReadService = async (userId) => {
  const result = await markAllNotificationsRead(userId);
  await redisClient.set(getCacheKey(userId), 0, { EX: 300 });
  return result;
};

export const deleteNotificationService = async (notificationId, userId) => {
  const notification = await getNotificationById(notificationId);

  if (!notification) {
    throw new AppError('Notification not found', 404);
  }

  if (notification.userId.toString() !== userId) {
    throw new AppError(
      'You do not have permission to delete this notification',
      403
    );
  }

  await deleteNotification(notificationId, userId);
  await redisClient.del(getCacheKey(userId));

  return true;
};
