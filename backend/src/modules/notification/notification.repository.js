import Notification from './notification.model.js';

export const createNotification = async (data) => {
  return await Notification.create(data);
};

export const findNotificationsByUser = async (userId, skip, limit) => {
  const notifications = await Notification.find({ userId, isDeleted: false })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Notification.countDocuments({ userId, isDeleted: false });

  return { notifications, total };
};

export const findUnreadNotifications = async (userId) => {
  return await Notification.find({
    userId,
    isRead: false,
    isDeleted: false,
  }).sort({ createdAt: -1 });
};

export const countUnreadNotifications = async (userId) => {
  return await Notification.countDocuments({
    userId,
    isRead: false,
    isDeleted: false,
  });
};

export const getNotificationById = async (notificationId) => {
  return await Notification.findById(notificationId);
};

export const markNotificationRead = async (notificationId, userId) => {
  return await Notification.findOneAndUpdate(
    { _id: notificationId, userId },
    { isRead: true },
    { new: true }
  );
};

export const markAllNotificationsRead = async (userId) => {
  return await Notification.updateMany(
    { userId, isRead: false, isDeleted: false },
    { isRead: true }
  );
};

export const deleteNotification = async (notificationId, userId) => {
  return await Notification.findOneAndUpdate(
    { _id: notificationId, userId },
    { isDeleted: true },
    { new: true }
  );
};
