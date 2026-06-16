import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, CheckCircle2, Circle, X, Info, CreditCard, Star, Calendar } from 'lucide-react';
import {
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
  useDeleteNotificationMutation
} from '@/redux/api/notificationApi';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

const getIconForType = (type) => {
  switch (type) {
    case 'BOOKING_CONFIRMED':
    case 'BOOKING_CANCELLED':
      return <Calendar className="w-5 h-5 text-indigo-400" />;
    case 'PAYMENT_SUCCESS':
    case 'PAYMENT_FAILED':
      return <CreditCard className="w-5 h-5 text-emerald-400" />;
    case 'REVIEW_RECEIVED':
      return <Star className="w-5 h-5 text-amber-400" />;
    default:
      return <Info className="w-5 h-5 text-blue-400" />;
  }
};

export const NotificationDropdown = ({ onClose }) => {
  const navigate = useNavigate();
  const { data: notificationsData, isLoading } = useGetNotificationsQuery(
    { page: 1, limit: 10 },
    { refetchOnMountOrArgChange: true }
  );

  const [markRead] = useMarkNotificationReadMutation();
  const [markAllRead] = useMarkAllNotificationsReadMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  const notifications = notificationsData?.data?.notifications || [];
  const hasUnread = notifications.some(n => !n.isRead);

  const handleMarkAllRead = async () => {
    try {
      await markAllRead().unwrap();
      toast.success('All notifications marked as read');
    } catch {
      toast.error('Failed to mark all as read');
    }
  };

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      try {
        await markRead(notification._id).unwrap();
      } catch (error) {
        console.error('Failed to mark read', error);
      }
    }

    if (notification.metadata) {
      if (notification.metadata.bookingId) {
        navigate('/my-bookings');
      } else if (notification.metadata.hotelId) {
        navigate(`/hotels/${notification.metadata.hotelId}`);
      }
    }

    onClose();
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await deleteNotification(id).unwrap();
    } catch {
      toast.error('Failed to delete notification');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 origin-top-right"
    >
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-slate-950/50">
        <h3 className="font-semibold text-white">Notifications</h3>
        {hasUnread && (
          <button
            onClick={handleMarkAllRead}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Mark all read
          </button>
        )}
      </div>

      <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {isLoading ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500 mx-auto mb-3"></div>
            Loading notifications...
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 text-slate-500" />
            </div>
            You're all caught up!
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                onClick={() => handleNotificationClick(notification)}
                className={`p-4 hover:bg-white/5 cursor-pointer transition-colors relative group ${!notification.isRead ? 'bg-indigo-500/5' : ''
                  }`}
              >
                <div className="flex gap-3 items-start">
                  <div className="mt-1">
                    {getIconForType(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <p className={`text-sm font-medium truncate ${!notification.isRead ? 'text-white' : 'text-slate-300'}`}>
                        {notification.title}
                      </p>
                      <button
                        onClick={(e) => handleDelete(e, notification._id)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded text-slate-400 hover:text-rose-400 transition-all"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] text-slate-500 font-medium">
                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                      </span>
                      {!notification.isRead && (
                        <Circle className="w-1.5 h-1.5 fill-indigo-500 text-indigo-500" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {notifications.length > 0 && (
        <div className="p-3 border-t border-white/10 bg-slate-950/50 text-center">
          <span className="text-xs text-slate-500">
            Showing latest {notifications.length} notifications
          </span>
        </div>
      )}
    </motion.div>
  );
};
