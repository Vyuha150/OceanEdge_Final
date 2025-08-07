import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AdminSidebar from '../components/Admin/AdminSidebar';
import AdminDashboard from '../components/Admin/AdminDashboard';
import TourismManagement from '../components/Admin/TourismManagement';
import InvestmentManagement from '../components/Admin/InvestmentManagement';
import BookingManagement from '../components/Admin/BookingManagement';
import FormResponses from '../components/Admin/FormResponses';
import { FaBars, FaTimes } from 'react-icons/fa';

const AdminPannel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'tourism':
        return <TourismManagement />;
      case 'investments':
        return <InvestmentManagement />;
      case 'bookings':
        return <BookingManagement />;
      case 'responses':
        return <FormResponses />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="flex flex-col md:flex-row">
        {/* Mobile Sidebar Toggle */}
        <div className="md:hidden fixed top-[4.5rem] left-4 z-50">
          <button 
            onClick={toggleSidebar}
            className="bg-gradient-to-r from-[#cd754a] to-[#dfb562] p-3 rounded-full shadow-lg flex items-center justify-center"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>
        </div>

        {/* Sidebar - Hidden on mobile by default */}
        <div className={`
          fixed md:sticky top-16 md:top-16 transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'left-0 shadow-2xl' : '-left-[280px] md:left-0'} 
          w-[280px] h-[calc(100vh-4rem)] z-40
        `}>
          <AdminSidebar 
            activeTab={activeTab} 
            setActiveTab={(tab) => {
              setActiveTab(tab);
              setSidebarOpen(false);
            }} 
          />
        </div>

        {/* Overlay to close sidebar on mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 md:hidden" 
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 ml-0 md:ml-[280px] transition-all duration-300 ease-in-out">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPannel;