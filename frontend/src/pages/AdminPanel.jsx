import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt, FaSpinner } from "react-icons/fa";
import {
  getResources,
  createResource,
  updateResource,
  deleteResource,
  getOffers,
  createOffer,
  updateOffer,
  deleteOffer,
} from "../api";
import AdminOfferUpload from "../admin/AdminOfferUpload";
import AdminResourceUpload from "../admin/AdminResourceUpload";
import AdminCarouselUpload from "../admin/AdminCarouselUpload";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("resources");
  const [resources, setResources] = useState([]);
  const [offers, setOffers] = useState([]);
  const [carousels, setCarousels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  const navigate = useNavigate();

  // ✅ Verify admin authentication
  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        setAuthChecking(true);
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Authentication required. Please login.");
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "https://vtct.onrender.com/api/auth/verify-admin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        if (response.data.success) {
          setIsAdmin(true);
        } else {
          toast.error("Admin access required");
          navigate("/login");
        }
      } catch (error) {
        console.error("Admin verification failed:", error);
        toast.error("Admin verification failed. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setAuthChecking(false);
      }
    };

    verifyAdmin();
  }, [navigate]);

  // ✅ Fetch data after admin verified
  useEffect(() => {
    if (!isAdmin || authChecking) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        if (activeTab === "resources") {
          const data = await getResources();
          setResources(data);
        } else if (activeTab === "offers") {
          const data = await getOffers();
          setOffers(data);
        } else if (activeTab === "carousel") {
          // Placeholder until you integrate carousel API
          setCarousels([
            {
              id: 1,
              title: "Carousel 1",
              imageUrl: "https://via.placeholder.com/300x200",
            },
          ]);
        }
        setError(null);
      } catch (err) {
        setError("Failed to fetch data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, isAdmin, authChecking]);

  // ✅ Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="pt-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#663399]">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-700">
              ×
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex border-b">
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === "resources"
                  ? "bg-[#cb1517] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("resources")}
              disabled={loading}
            >
              Resources Management
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === "offers"
                  ? "bg-[#cb1517] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("offers")}
              disabled={loading}
            >
              Offers Management
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === "carousel"
                  ? "bg-[#cb1517] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("carousel")}
              disabled={loading}
            >
              Carousel Ads
            </button>
          </div>

          {/* Loader */}
          {loading && (
            <div className="flex justify-center items-center p-8">
              <FaSpinner className="animate-spin text-[#663399] text-3xl" />
              <span className="ml-2 text-gray-600">Loading...</span>
            </div>
          )}

          {/* Main content */}
          {!loading && (
            <div className="p-6">
              {activeTab === "resources" ? (
                <AdminResourceUpload resources={resources} />
              ) : activeTab === "offers" ? (
                <AdminOfferUpload offers={offers} />
              ) : (
                <AdminCarouselUpload carousels={carousels} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
