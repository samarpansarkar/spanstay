import { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useGetUnreadCountQuery } from '@/redux/api/notificationApi';
import { NotificationDropdown } from './NotificationDropdown';
import { AnimatePresence } from 'framer-motion';

export const NotificationBell = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: countData } = useGetUnreadCountQuery(undefined, {
    skip: !user,
    pollingInterval: 60000,
  });

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const unreadCount = countData?.data?.count || 0;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5 text-slate-300 hover:text-white transition-colors" />

        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-slate-950">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <NotificationDropdown onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};
