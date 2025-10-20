import React, { useState, useEffect } from 'react';
import { FaUsers, FaFileAlt, FaGraduationCap, FaSpinner } from "react-icons/fa";
import api, { endpoints } from '../api';

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({
    studentCount: 0,
    resourceCount: 0,
    eventCount: 0,
    testimonialCount: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        
        if (!token) {
          setError("Authentication token not found");
          setLoading(false);
          return;
        }

        const response = await api.get(endpoints.dashboardMetrics);

        setMetrics(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard metrics:", err);
        setError("Failed to load dashboard data");
        setLoading(false);
      }
    };

    fetchDashboardData();
    
    // Refresh data every 30 seconds
    const intervalId = setInterval(fetchDashboardData, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-3xl text-red-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-600">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
              <FaGraduationCap size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase">Total Students</p>
              <p className="text-2xl font-bold">{metrics.studentCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <FaFileAlt size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase">Resources Uploaded</p>
              <p className="text-2xl font-bold">{metrics.resourceCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <FaFileAlt size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase">Total Events</p>
              <p className="text-2xl font-bold">{metrics.eventCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <FaUsers size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase">Total Testimonials</p>
              <p className="text-2xl font-bold">{metrics.testimonialCount}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        {metrics.recentActivity.length === 0 ? (
          <p className="text-gray-500">No recent activity</p>
        ) : (
          metrics.recentActivity.map((activity, index) => (
            <div key={index} className="border-b pb-2 mb-2">
              <p className="text-gray-700">
                {activity.type === 'student' ? 'New student enrolled: ' : 'New resource added: '}
                <span className="font-medium">{activity.name}</span>
              </p>
              <p className="text-sm text-gray-600">{activity.detail}</p>
              <p className="text-xs text-gray-500">{formatDate(activity.timestamp)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;