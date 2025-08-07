import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  ChartBarIcon,
  CurrencyDollarIcon, 
  CalendarIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalInvestments: 0,
    totalTourismPackages: 0,
    totalFormResponses: 0,
    recentBookings: [],
    recentInvestments: [],
    monthlyRevenue: 0,
    pendingApprovals: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/stats`);
      setStats(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch dashboard data');
      setLoading(false);
      console.error('Error fetching dashboard data:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-[#D4B678]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="bg-red-900/20 border border-red-500/50 text-red-400 px-8 py-6 rounded-xl">
          <p className="flex items-center text-base">
            <ClipboardDocumentListIcon className="w-6 h-6 mr-3" />
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 md:p-6 space-y-10">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-3xl font-[fairplay] font-bold text-white">Dashboard Overview</h1>
        <button 
          onClick={fetchDashboardData}
          className="px-5 py-2.5 bg-gradient-to-r from-[#cd754a]/30 to-[#dfb562]/30 text-[#D4B678] border border-[#D4B678]/20 rounded-lg hover:from-[#cd754a]/40 hover:to-[#dfb562]/40 transition-all duration-300 flex items-center space-x-2 shadow-lg shadow-[#dfb562]/5"
        >
          <ArrowTrendingUpIcon className="w-5 h-5" />
          <span>Refresh Stats</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<CalendarIcon className="w-6 h-6" />}
          title="Total Bookings"
          value={stats.totalBookings}
          trend="+12%"
          trendUp={true}
        />
        <StatCard
          icon={<CurrencyDollarIcon className="w-6 h-6" />}
          title="Monthly Revenue"
          value={`₹${stats.monthlyRevenue.toLocaleString()}`}
          trend="+8%"
          trendUp={true}
        />
        <StatCard
          icon={<ChartBarIcon className="w-6 h-6" />}
          title="Tourism Packages"
          value={stats.totalTourismPackages}
          trend="+5%"
          trendUp={true}
        />
        <StatCard
          icon={<UserGroupIcon className="w-6 h-6" />}
          title="Pending Approvals"
          value={stats.pendingApprovals}
          trend="-2%"
          trendUp={false}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentActivityCard
          title="Recent Bookings"
          data={stats.recentBookings}
          type="booking"
        />
        <RecentActivityCard
          title="Recent Investments"
          data={stats.recentInvestments}
          type="investment"
        />
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, trend, trendUp }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-black/60 to-gray-800/20 backdrop-blur-sm rounded-xl border border-gray-800/50 p-6 hover:border-[#D4B678]/50 transition-colors duration-300 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div className="p-3 bg-gradient-to-r from-[#cd754a]/10 to-[#dfb562]/10 rounded-lg">
          <div className="text-[#D4B678]">{icon}</div>
        </div>
        <div className={`flex items-center space-x-1 ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
          {trendUp ? (
            <ArrowTrendingUpIcon className="w-4 h-4" />
          ) : (
            <ArrowTrendingDownIcon className="w-4 h-4" />
          )}
          <span className="text-sm font-medium">{trend}</span>
        </div>
      </div>
      <div className="mt-5">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
      </div>
    </motion.div>
  );
};

const RecentActivityCard = ({ title, data, type }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
      case 'available':
        return 'bg-green-900/20 text-green-400 border border-green-500/50';
      case 'pending':
        return 'bg-gradient-to-r from-[#cd754a]/10 to-[#dfb562]/10 text-[#D4B678] border border-[#D4B678]/20';
      default:
        return 'bg-red-900/20 text-red-400 border border-red-500/50';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: type === 'booking' ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-black/60 to-gray-800/20 backdrop-blur-sm rounded-xl border border-gray-800/50 p-6 hover:border-[#D4B678]/50 transition-colors duration-300 shadow-lg"
    >
      <h3 className="text-xl font-[fairplay] font-bold text-white mb-6">{title}</h3>
      <div className="space-y-5">
        {data.map((item) => (
          <div 
            key={item._id} 
            className="flex items-center justify-between border-b border-gray-800/50 pb-5 last:border-0 last:pb-0"
          >
            <div className="space-y-1">
              <p className="font-medium text-white">
                {type === 'booking' ? item.customerName : item.title}
              </p>
              <p className="text-sm text-gray-400">
                {type === 'booking' ? item.packageName : `₹${item.price}`}
              </p>
            </div>
            <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${getStatusColor(item.status)}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AdminDashboard;