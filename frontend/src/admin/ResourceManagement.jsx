import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const ResourceManagement = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [currentResource, setCurrentResource] = useState({
    title: '',
    imageUrl: '',
    driveLink: '',
    category: 'neet'
  });

  // Fetch all resources
  const fetchResources = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://vtct.onrender.com/api/resources');
      setResources(response.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast.error('Failed to load resources');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  // Handle edit button click
  const handleEditClick = (resource) => {
    setCurrentResource(resource);
    setEditMode(true);
    window.scrollTo(0, 0);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentResource({
      ...currentResource,
      [name]: value
    });
  };

  // Handle form submission for updating resource
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentResource.title || !currentResource.imageUrl || !currentResource.driveLink || !currentResource.category) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      await axios.put(`https://vtct.onrender.com/api/resources/${currentResource._id}`, currentResource);
      toast.success('Resource updated successfully!');
      setEditMode(false);
      setCurrentResource({
        title: '',
        imageUrl: '',
        driveLink: '',
        category: 'neet'
      });
      fetchResources();
    } catch (error) {
      console.error('Error updating resource:', error);
      toast.error('Failed to update resource');
    } finally {
      setLoading(false);
    }
  };

  // Handle resource deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        setLoading(true);
        await axios.delete(`https://vtct.onrender.com/api/resources/${id}`);
        toast.success('Resource deleted successfully!');
        fetchResources();
      } catch (error) {
        console.error('Error deleting resource:', error);
        toast.error('Failed to delete resource');
      } finally {
        setLoading(false);
      }
    }
  };

  // Cancel edit mode
  const handleCancel = () => {
    setEditMode(false);
    setCurrentResource({
      title: '',
      imageUrl: '',
      driveLink: '',
      category: 'neet'
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Resource Management</h1>
      
      {/* Edit Form */}
      {editMode && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Edit Resource</h2>
          <form onSubmit={handleUpdateSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Resource Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={currentResource.title}
                onChange={handleInputChange}
                placeholder="Enter resource title"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
                Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={currentResource.imageUrl}
                onChange={handleInputChange}
                placeholder="Enter image URL"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="driveLink">
                Google Drive Link
              </label>
              <input
                type="url"
                id="driveLink"
                name="driveLink"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={currentResource.driveLink}
                onChange={handleInputChange}
                placeholder="Enter Google Drive link"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                Resource Category
              </label>
              <select
                id="category"
                name="category"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={currentResource.category}
                onChange={handleInputChange}
                required
              >
                <option value="neet">NEET</option>
                <option value="jee">JEE</option>
                <option value="mht-cet">MHT-CET</option>
                <option value="foundation-builder">Foundation Builder</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="mb-4">
              {currentResource.imageUrl && (
                <div className="mb-4">
                  <p className="text-sm font-bold mb-2">Image Preview:</p>
                  <img 
                    src={currentResource.imageUrl} 
                    alt="Preview" 
                    className="max-w-full h-auto max-h-40 rounded border"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/300x200?text=Invalid+Image+URL';
                    }}
                  />
                </div>
              )}
            </div>
            
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Resource'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Resources List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">All Resources</h2>
        
        {loading && !editMode ? (
          <p className="text-center py-4">Loading resources...</p>
        ) : resources.length === 0 ? (
          <p className="text-center py-4">No resources found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {resources.map((resource) => (
                  <tr key={resource._id}>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {resource.title}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {resource.category}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <img 
                        src={resource.imageUrl} 
                        alt={resource.title} 
                        className="h-16 w-auto object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                        }}
                      />
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditClick(resource)}
                          className="text-blue-500 hover:text-blue-700"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <a
                          href={resource.driveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-500 hover:text-green-700"
                          title="View Resource"
                        >
                          <FaEye />
                        </a>
                        <button
                          onClick={() => handleDelete(resource._id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceManagement;