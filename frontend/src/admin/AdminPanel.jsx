import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import AdminSidebar from "./AdminSidebar";
import AdminResourceUpload from "./AdminResourceUpload";
import ResourceManagement from "./ResourceManagement";
import AdminStudentData from "./AdminStudentData";
import AdminCarouselUpload from "./AdminCarouselUpload";
import EventManagement from "./EventManagement";
import TestimonialManagement from "./TestimonialManagement";
import api from "../api";

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
        const response = await api.get("/api/auth/verify-admin");

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
    return <Navigate to="/auth-error" replace />;
  }

  // Redirect non-admin users
  if (!isAdmin) {
    return <Navigate to="/auth-error" replace />;
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/resources" element={<AdminResourceUpload />} />
          <Route path="/resources/manage" element={<ResourceManagement />} />
          <Route path="/carousel" element={<AdminCarouselUpload />} />
          <Route path="/events" element={<EventManagement />} />
          <Route path="/testimonials" element={<TestimonialManagement />} />
          <Route path="/students" element={<AdminStudentData />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;