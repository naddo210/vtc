import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt, FaSpinner } from "react-icons/fa";
import { getResources, createResource, updateResource, deleteResource, 
         getOffers, createOffer, updateOffer, deleteOffer } from "../api";
import AdminOfferUpload from "../admin/AdminOfferUpload";
import AdminResourceUpload from "../admin/AdminResourceUpload";
import AdminCarouselUpload from "../admin/AdminCarouselUpload";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("resources");
  const [resources, setResources] = useState([]);
  const [offers, setOffers] = useState([]);
  const [carousels, setCarousels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [themeColor, setThemeColor] = useState("#663399");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (activeTab === "resources") {
          const data = await getResources();
          setResources(data);
        } else {
          const data = await getOffers();
          setOffers(data);
        }
        setError(null);
      } catch (err) {
        setError("Failed to fetch data. Using sample data instead.");
        // Fallback to sample data if API fails
        if (activeTab === "resources") {
          setResources([
            {
              id: 1,
              title: "Web Development Fundamentals",
              imageUrl: "https://via.placeholder.com/300x200",
              url: "https://example.com/resource1",
              category: "web-development"
            },
            {
              id: 2,
              title: "Data Science Toolkit",
              imageUrl: "https://via.placeholder.com/300x200",
              url: "https://example.com/resource2",
              category: "data-science"
            }
          ]);
        } else {
          setOffers([
            {
              id: 1,
              title: "Early Bird Discount",
              description: "Get 25% off on all courses when you enroll before June 30th.",
              imageUrl: "https://via.placeholder.com/300x200",
              discount: "25%",
              expiryDate: "2023-06-30"
            },
            {
              id: 2,
              title: "Refer a Friend",
              description: "Refer a friend and both of you get 15% off on any course.",
              imageUrl: "https://via.placeholder.com/300x200",
              discount: "15%",
              expiryDate: "2023-12-31"
            }
          ]);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [activeTab]);
  
  // Resource handlers
  const [newResource, setNewResource] = useState({
    title: "",
    imageUrl: "",
    url: "",
    category: "web-development"
  });
  
  const [editingResource, setEditingResource] = useState(null);
  
  const handleResourceChange = (e) => {
    const { name, value } = e.target;
    if (editingResource) {
      setEditingResource({ ...editingResource, [name]: value });
    } else {
      setNewResource({ ...newResource, [name]: value });
    }
  };

  const handleResourceSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingResource) {
        const updatedResource = await updateResource(editingResource.id, editingResource);
        setResources(resources.map(resource => 
          resource.id === editingResource.id ? updatedResource : resource
        ));
        setEditingResource(null);
      } else {
        const newResourceData = await createResource(newResource);
        setResources([...resources, newResourceData]);
        setNewResource({
          title: "",
          imageUrl: "",
          url: "",
          category: "web-development"
        });
      }
    } catch (err) {
      setError("Failed to save resource. Please try again.");
      console.error("Error saving resource:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditResource = (resource) => {
    setEditingResource(resource);
  };

  const handleDeleteResource = async (id) => {
    try {
      setLoading(true);
      await deleteResource(id);
      setResources(resources.filter(resource => resource.id !== id));
      if (editingResource && editingResource.id === id) {
        setEditingResource(null);
      }
    } catch (err) {
      setError("Failed to delete resource. Please try again.");
      console.error("Error deleting resource:", err);
    } finally {
      setLoading(false);
    }
  };

  // Offer handlers
  const [newOffer, setNewOffer] = useState({
    title: "",
    description: "",
    imageUrl: "",
    discount: "",
    expiryDate: ""
  });
  
  const [editingOffer, setEditingOffer] = useState(null);
  
  const handleOfferChange = (e) => {
    const { name, value } = e.target;
    if (editingOffer) {
      setEditingOffer({ ...editingOffer, [name]: value });
    } else {
      setNewOffer({ ...newOffer, [name]: value });
    }
  };

  const handleOfferSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingOffer) {
        const updatedOffer = await updateOffer(editingOffer.id, editingOffer);
        setOffers(offers.map(offer => 
          offer.id === editingOffer.id ? updatedOffer : offer
        ));
        setEditingOffer(null);
      } else {
        const newOfferData = await createOffer(newOffer);
        setOffers([...offers, newOfferData]);
        setNewOffer({
          title: "",
          description: "",
          imageUrl: "",
          discount: "",
          expiryDate: ""
        });
      }
    } catch (err) {
      setError("Failed to save offer. Please try again.");
      console.error("Error saving offer:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditOffer = (offer) => {
    setEditingOffer(offer);
  };

  const handleDeleteOffer = async (id) => {
    try {
      setLoading(true);
      await deleteOffer(id);
      setOffers(offers.filter(offer => offer.id !== id));
      if (editingOffer && editingOffer.id === id) {
        setEditingOffer(null);
      }
    } catch (err) {
      setError("Failed to delete offer. Please try again.");
      console.error("Error deleting offer:", err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="pt-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#663399]">Admin Panel</h1>
          <button className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-700">×</button>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b">
            <button
              className={`px-6 py-3 font-medium ${activeTab === 'resources' ? 'bg-[#cb1517] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setActiveTab('resources')}
              disabled={loading}
            >
              Resources Management
            </button>
            <button
              className={`px-6 py-3 font-medium ${activeTab === 'offers' ? 'bg-[#cb1517] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setActiveTab('offers')}
              disabled={loading}
            >
              Offers Management
            </button>
            <button
              className={`px-6 py-3 font-medium ${activeTab === 'carousel' ? 'bg-[#cb1517] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setActiveTab('carousel')}
              disabled={loading}
            >
              Carousel Ads
            </button>
          </div>
          
          {loading && (
            <div className="flex justify-center items-center p-8">
              <FaSpinner className="animate-spin text-[#663399] text-3xl" />
              <span className="ml-2 text-gray-600">Loading...</span>
            </div>
          )}
          
          {!loading && (
            <div className="p-6">
              {activeTab === 'resources' ? (
                <div>
                  <AdminResourceUpload />
                  {/* Existing resource management UI can go here */}
                </div>
              ) : activeTab === 'offers' ? (
                <div>
                  <AdminOfferUpload />
                  {/* Existing offer management UI can go here */}
                </div>
              ) : (
                <div>
                  <AdminCarouselUpload />
                </div>
              )}
            </div>
          )}