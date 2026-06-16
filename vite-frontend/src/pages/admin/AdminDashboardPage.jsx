import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ManageHotels from '@/components/admin/ManageHotels';
import ManageBookings from '@/components/admin/ManageBookings';
import ManageUsers from '@/components/admin/ManageUsers';
import ManageApprovals from '@/components/admin/ManageApprovals';
import ManageTickets from '@/components/admin/ManageTickets';
import ManageAuditLogs from '@/components/admin/ManageAuditLogs';
import ManageMyApprovals from '@/components/admin/ManageMyApprovals';
import DashboardSidebar from '@/components/shared/DashboardSidebar';
import SEO from '@/components/shared/SEO';

const AdminDashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const isSuperAdmin = user?.role === 'admin';
  const defaultTab = isSuperAdmin ? 'approvals' : 'hotels';
  const [activeTab, setActiveTab] = useState(location.state?.tab || defaultTab);

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state?.tab]);

  return (
    <div className="flex min-h-screen bg-surface-container-lowest">
      <SEO title="Admin Dashboard" noindex={true} />
      
      <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 px-6 md:px-margin-desktop py-12 max-w-container-max mx-auto overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {activeTab === 'profile' && (
              <div className="bg-surface-container/40 backdrop-blur-3xl border border-glass-border rounded-xl p-12 text-center shadow-sm">
                <h3 className="font-display-lg text-headline-md mb-2">Platform Statistics</h3>
                <p className="text-on-surface-variant">Welcome back, {user?.name}. Your dashboard is ready.</p>
              </div>
            )}
            {activeTab === 'hotels' && <ManageHotels />}
            {activeTab === 'bookings' && <ManageBookings />}
            {activeTab === 'users' && <ManageUsers />}
            {activeTab === 'approvals' && <ManageApprovals />}
            {activeTab === 'tickets' && <ManageTickets />}
            {activeTab === 'logs' && <ManageAuditLogs />}
            {activeTab === 'my-approvals' && <ManageMyApprovals />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
