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
        order: parseInt(order) || 0
      };
      
      if (editingId) {
        // Update existing carousel ad
        await axios.put(`/api/carousel/${editingId}`, adData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success('Carousel ad updated successfully!');
      } else {
        // Create new carousel ad
        await axios.post('/api/carousel', adData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success('Carousel ad created successfully!');
      }
      
      resetForm();
      fetchCarouselAds();
    } catch (error) {
      console.error('Error submitting carousel ad:', error);
      toast.error('Failed to submit carousel ad');
    } finally {
      setLoading(false);
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
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Image
          </label>
          <div className="flex items-center">
            <input
              type="file"
              id="image"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
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
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}
          
          <div className="mt-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
              Or Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          {imageUrl && (
            <div className="mt-2">
              <img
                src={imageUrl}
                alt="Preview"
                className="max-w-xs h-auto border rounded"
              />
            </div>
          )}
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
            rows="3"
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="link">
            Link URL (optional)
          </label>
          <input
            type="text"
            id="link"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://example.com"
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
            onChange={(e) => setOrder(e.target.value)}
            min="0"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Processing...' : editingId ? 'Update' : 'Submit'}
          </button>
          
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Existing Carousel Ads</h2>
        {loading && !carouselAds.length ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {carouselAds.map((ad) => (
              <div
                key={ad._id}
                className={`border rounded-lg overflow-hidden ${
                  ad.isActive ? 'border-green-500' : 'border-red-500'
                }`}
              >
                <img
                  src={ad.imageUrl}
                  alt={ad.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg">{ad.title}</h3>
                  {ad.description && <p className="text-gray-700 mt-1">{ad.description}</p>}
                  {ad.link && (
                    <a
                      href={ad.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline mt-1 block"
                    >
                      {ad.link}
                    </a>
                  )}
                  <p className="text-gray-600 mt-1">Order: {ad.order}</p>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <button
                        onClick={() => handleEdit(ad)}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(ad._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      >
                        <FaTrash />
                      </button>
                    </div>
                    <button
                      onClick={() => handleToggleActive(ad)}
                      className={`${
                        ad.isActive
                          ? 'bg-red-500 hover:bg-red-700'
                          : 'bg-green-500 hover:bg-green-700'
                      } text-white font-bold py-1 px-2 rounded`}
                    >
                      {ad.isActive ? 'Deactivate' : 'Activate'}
                    </button>
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