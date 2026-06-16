import { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, CalendarDays, Users, CheckSquare, LifeBuoy, Terminal } from 'lucide-react';
import ManageHotels from '@/components/admin/ManageHotels';
import ManageBookings from '@/components/admin/ManageBookings';
import ManageUsers from '@/components/admin/ManageUsers';
import ManageApprovals from '@/components/admin/ManageApprovals';
import ManageTickets from '@/components/admin/ManageTickets';
import ManageAuditLogs from '@/components/admin/ManageAuditLogs';
import ManageMyApprovals from '@/components/admin/ManageMyApprovals';
import SEO from '@/components/shared/SEO';

const HOTEL_ADMIN_TABS = [
  { id: 'hotels', label: 'My Properties', icon: Building2 },
  { id: 'bookings', label: 'Reservations', icon: CalendarDays },
  { id: 'my-approvals', label: 'My Requests', icon: CheckSquare },
];

const SUPER_ADMIN_TABS = [
  { id: 'approvals', label: 'Property Approvals', icon: CheckSquare },
  { id: 'users', label: 'Manage Users', icon: Users },
  { id: 'tickets', label: 'Support Tickets', icon: LifeBuoy },
  { id: 'logs', label: 'Audit Logs', icon: Terminal },
];

const AdminDashboardPage = () => {
  const { user } = useSelector((state) => state.auth);

  const isSuperAdmin = user?.role === 'admin';
  const tabs = isSuperAdmin ? SUPER_ADMIN_TABS : HOTEL_ADMIN_TABS;

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="min-h-screen bg-surface-container-lowest pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <SEO title="Admin Dashboard" noindex={true} />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">

        <div className="w-full md:w-64 shrink-0">
          <div className="sticky top-28 bg-surface-container border border-glass-border rounded-sm p-4 flex flex-row md:flex-col gap-2 overflow-x-auto shadow-sm">
            <h2 className="text-xl font-bold text-on-surface mb-4 hidden md:block px-4 pt-2 font-display tracking-wide">
              {isSuperAdmin ? 'Platform Admin' : 'Concierge Dashboard'}
            </h2>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-all whitespace-nowrap uppercase tracking-wider text-[11px] font-bold font-body ${activeTab === tab.id
                  ? 'bg-warm-gold text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'hotels' && <ManageHotels />}
              {activeTab === 'bookings' && <ManageBookings />}
              {activeTab === 'users' && <ManageUsers />}
              {activeTab === 'approvals' && <ManageApprovals />}
              {activeTab === 'tickets' && <ManageTickets />}
              {activeTab === 'logs' && <ManageAuditLogs />}
              {activeTab === 'my-approvals' && <ManageMyApprovals />}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboardPage;
