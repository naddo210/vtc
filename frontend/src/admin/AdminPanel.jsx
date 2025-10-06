import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import AdminSidebar from "./AdminSidebar";
import AdminResourceUpload from "./AdminResourceUpload";
import AdminStudentData from "./AdminStudentData";
import AdminCarouselUpload from "./AdminCarouselUpload";
import axios from "axios";

const AdminPanel = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    const checkAdminStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          setIsAdmin(false);
          setLoading(false);
          // Redirect to login page if not logged in
          navigate("/login");
          return;
        }

        // Check if user is admin
        const response = await axios.get("http://localhost:5000/api/auth/verify-admin", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.isAdmin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          // Redirect non-admin users
          navigate("/");
        }
      } catch (error) {
        console.error("Error verifying admin status:", error);
        setIsAdmin(false);
        // Set error state if it exists
        if (typeof setError === 'function') {
          setError("You are not authorized to access the admin panel. Please log in as an admin.");
        }
        // Redirect to login page after a short delay
        setTimeout(() => navigate("/login"), 2000);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Go to Login
        </button>
      </div>
    );
  }

  // Redirect non-admin users
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/resources" element={<AdminResourceUpload />} />
          <Route path="/carousel" element={<AdminCarouselUpload />} />
          <Route path="/students" element={<AdminStudentData />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;