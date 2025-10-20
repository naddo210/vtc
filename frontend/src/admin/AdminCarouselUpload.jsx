import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash, FaArrowUp, FaArrowDown, FaUpload } from 'react-icons/fa';

const AdminCarouselUpload = () => {
  const [carouselAds, setCarouselAds] = useState([]);
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [order, setOrder] = useState(0);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchCarouselAds();
  }, []);

  const fetchCarouselAds = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/carousel', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCarouselAds(response.data);
    } catch (error) {
      console.error('Error fetching carousel ads:', error);
      toast.error('Failed to fetch carousel ads');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setImageUrl('');
    setImageFile(null);
    setDescription('');
    setLink('');
    setOrder(0);
    setEditingId(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || (!imageUrl && !imageFile)) {
      toast.error('Title and Image are required');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      let finalImageUrl = imageUrl;
      
      // If there's a file to upload, handle it first
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        
        const uploadResponse = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          }
        });
        
        finalImageUrl = uploadResponse.data.imageUrl;
      }
      
      const adData = {
        title,
        imageUrl: finalImageUrl,
        description,
        link,
        order
      };
      
      if (editingId) {
        await axios.put(`/api/carousel/${editingId}`, adData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success('Carousel ad updated successfully!');
      } else {
        await axios.post('/api/carousel', adData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success('Carousel ad added successfully!');
      }
      
      resetForm();
      fetchCarouselAds();
    } catch (error) {
      console.error('Error saving carousel ad:', error);
      toast.error('Failed to save carousel ad. Please try again.');
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleEdit = (ad) => {
    setTitle(ad.title);
    setImageUrl(ad.imageUrl);
    setDescription(ad.description || '');
    setLink(ad.link || '');
    setOrder(ad.order || 0);
    setEditingId(ad._id);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this carousel ad?')) {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        await axios.delete(`/api/carousel/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success('Carousel ad deleted successfully!');
        fetchCarouselAds();
      } catch (error) {
        console.error('Error deleting carousel ad:', error);
        toast.error('Failed to delete carousel ad');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleToggleActive = async (ad) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.put(`/api/carousel/${ad._id}`, {
        ...ad,
        isActive: !ad.isActive
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success(`Carousel ad ${ad.isActive ? 'deactivated' : 'activated'} successfully!`);
      fetchCarouselAds();
    } catch (error) {
      console.error('Error updating carousel ad:', error);
      toast.error('Failed to update carousel ad');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit' : 'Add New'} Carousel Ad</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image Upload
          </label>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <input
                type="file"
                id="imageFile"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
              >
                <FaUpload className="mr-2" /> Upload Image
              </button>
              <span className="ml-3 text-sm text-gray-600">
                {imageFile ? imageFile.name : 'No file selected'}
              </span>
            </div>
            
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
                <p className="text-xs text-gray-600 mt-1">Uploading: {uploadProgress}%</p>
              </div>
            )}
            
            <p className="text-xs text-gray-500 mt-1">
              For best quality, use high-resolution images (at least 1200x800 pixels)
            </p>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
            Or Image URL (optional if uploading file)
          </label>
          <input
            type="url"
            id="imageUrl"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description (optional)
          </label>
          <textarea
            id="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            rows="3"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="link">
            Link URL (optional)
          </label>
          <input
            type="url"
            id="link"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Enter link URL"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="order">
            Display Order
          </label>
          <input
            type="number"
            id="order"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={order}
            onChange={(e) => setOrder(parseInt(e.target.value))}
            min="0"
          />
        </div>
        
        <div className="mb-4">
          {imageUrl && (
            <div className="mb-4">
              <p className="text-sm font-bold mb-2">Image Preview:</p>
              <img 
                src={imageUrl} 
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
        
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-[#cb1517] hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? 'Saving...' : editingId ? 'Update Ad' : 'Add Ad'}
          </button>
          
          {editingId && (
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">Existing Carousel Ads</h3>
        {loading ? (
          <p>Loading...</p>
        ) : carouselAds.length === 0 ? (
          <p>No carousel ads found. Add your first one above!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {carouselAds.map((ad) => (
              <div 
                key={ad._id} 
                className={`border rounded-lg overflow-hidden ${!ad.isActive ? 'opacity-60' : ''}`}
              >
                <img 
                  src={ad.imageUrl} 
                  alt={ad.title} 
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x200?text=Invalid+Image+URL';
                  }}
                />
                <div className="p-4">
                  <h4 className="font-bold">{ad.title}</h4>
                  {ad.description && <p className="text-sm text-gray-600 mt-1">{ad.description}</p>}
                  <div className="flex items-center justify-between mt-3">
                    <div className="text-xs text-gray-500">Order: {ad.order}</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(ad)}
                        className="p-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleToggleActive(ad)}
                        className={`p-1 ${ad.isActive ? 'bg-orange-500' : 'bg-green-500'} text-white rounded hover:${ad.isActive ? 'bg-orange-700' : 'bg-green-700'}`}
                        title={ad.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {ad.isActive ? 'Active' : 'Inactive'}
                      </button>
                      <button
                        onClick={() => handleDelete(ad._id)}
                        className="p-1 bg-red-500 text-white rounded hover:bg-red-700"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit' : 'Add New'} Carousel Ad</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image Upload
          </label>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <input
                type="file"
                id="imageFile"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
              >
                <FaUpload className="mr-2" /> Upload Image
              </button>
              <span className="ml-3 text-sm text-gray-600">
                {imageFile ? imageFile.name : 'No file selected'}
              </span>
            </div>
            
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
                <p className="text-xs text-gray-600 mt-1">Uploading: {uploadProgress}%</p>
              </div>
            )}
            
            <p className="text-xs text-gray-500 mt-1">
              For best quality, use high-resolution images (at least 1200x800 pixels)
            </p>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
            Or Image URL (optional if uploading file)
          </label>
          <input
            type="url"
            id="imageUrl"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description (optional)
          </label>
          <textarea
            id="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            rows="3"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="link">
            Link URL (optional)
          </label>
          <input
            type="url"
            id="link"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Enter link URL"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="order">
            Display Order
          </label>
          <input
            type="number"
            id="order"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={order}
            onChange={(e) => setOrder(parseInt(e.target.value))}
            min="0"
          />
        </div>
        
        <div className="mb-4">
          {imageUrl && (
            <div className="mb-4">
              <p className="text-sm font-bold mb-2">Image Preview:</p>
              <img 
                src={imageUrl} 
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
        
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-[#cb1517] hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? 'Saving...' : editingId ? 'Update Ad' : 'Add Ad'}
          </button>
          
          {editingId && (
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">Existing Carousel Ads</h3>
        {loading ? (
          <p>Loading...</p>
        ) : carouselAds.length === 0 ? (
          <p>No carousel ads found. Add your first one above!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {carouselAds.map((ad) => (
              <div 
                key={ad._id} 
                className={`border rounded-lg overflow-hidden ${!ad.isActive ? 'opacity-60' : ''}`}
              >
                <img 
                  src={ad.imageUrl} 
                  alt={ad.title} 
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x200?text=Invalid+Image+URL';
                  }}
                />
                <div className="p-4">
                  <h4 className="font-bold">{ad.title}</h4>
                  {ad.description && <p className="text-sm text-gray-600 mt-1">{ad.description}</p>}
                  <div className="flex items-center justify-between mt-3">
                    <div className="text-xs text-gray-500">Order: {ad.order}</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(ad)}
                        className="p-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleToggleActive(ad)}
                        className={`p-1 ${ad.isActive ? 'bg-orange-500' : 'bg-green-500'} text-white rounded hover:${ad.isActive ? 'bg-orange-700' : 'bg-green-700'}`}
                        title={ad.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {ad.isActive ? 'Active' : 'Inactive'}
                      </button>
                      <button
                        onClick={() => handleDelete(ad._id)}
                        className="p-1 bg-red-500 text-white rounded hover:bg-red-700"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCarouselUpload;