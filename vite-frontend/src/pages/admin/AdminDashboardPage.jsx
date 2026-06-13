import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, CalendarDays } from 'lucide-react';
import ManageHotels from './components/ManageHotels';
import ManageBookings from './components/ManageBookings';

const TABS = [
  { id: 'hotels', label: 'My Hotels', icon: Building2 },
  { id: 'bookings', label: 'Hotel Bookings', icon: CalendarDays },
];

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('hotels');

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Sidebar / Tabs */}
        <div className="w-full md:w-64 shrink-0">
          <div className="sticky top-28 bg-white/5 border border-white/10 rounded-3xl p-4 flex flex-row md:flex-col gap-2 overflow-x-auto">
            <h2 className="text-xl font-bold text-white mb-2 hidden md:block px-4 pt-2">Dashboard</h2>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/20'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
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
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboardPage;
