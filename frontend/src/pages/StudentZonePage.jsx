import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaCalendarAlt, FaPhone, FaEnvelope, FaHome, FaBook } from 'react-icons/fa';
import { motion } from 'framer-motion';

const StudentZonePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    dob: '',
    email: '',
    phone: '',
    address: '',
    enrollingCourse: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    
    console.log('Submitting student data:', formData);
    
    try {
      // Make sure we're using the correct API endpoint
      const response = await axios.post('/api/students', formData);
      console.log('Registration successful:', response.data);
      setSuccess(true);
      setFormData({
        name: '',
        age: '',
        dob: '',
        email: '',
        phone: '',
        address: '',
        enrollingCourse: ''
      });
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-700 to-red-900 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Student Zone</h1>
          <p className="text-xl">Register as a student and access exclusive resources</p>
        </div>
      </div>
      
      {/* Registration Form */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 bg-gradient-to-b from-red-700 to-black p-8 text-white">
              <h2 className="text-2xl font-bold mb-6">Student Registration</h2>
              <p className="mb-6">Fill out the form to register as a student at VTC Smart Classes.</p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaUser className="mr-3" />
                  <span>Personal Details</span>
                </div>
                <div className="flex items-center">
                  <FaBook className="mr-3" />
                  <span>Course Selection</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="mr-3" />
                  <span>Contact Information</span>
                </div>
              </div>
            </div>
            <div className="md:w-2/3 p-8">
              {success ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h3>
                  <p className="text-gray-600 mb-6">Thank you for registering with VTC Smart Classes.</p>
                  <button 
                    onClick={() => setSuccess(false)}
                    className="bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
                  >
                    Register Another Student
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Student Information</h3>
                  
                  {error && (
                    <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6">
                      {error}
                    </div>
                  )}
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaUser className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="age">
                        Age
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="dob">
                        Date of Birth
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaCalendarAlt className="text-gray-400" />
                        </div>
                        <input
                          type="date"
                          id="dob"
                          name="dob"
                          value={formData.dob}
                          onChange={handleChange}
                          className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaEnvelope className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phone">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaPhone className="text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="address">
                        Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaHome className="text-gray-400" />
                        </div>
                        <textarea
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          rows="3"
                          className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          required
                        ></textarea>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="enrollingCourse">
                        Enrolling Course
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaBook className="text-gray-400" />
                        </div>
                        <select
                          id="enrollingCourse"
                          name="enrollingCourse"
                          value={formData.enrollingCourse}
                          onChange={handleChange}
                          className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select a course</option>
                          <option value="Pre-Nurture Foundation">Pre-Nurture Foundation</option>
                          <option value="Foundation Builder">Foundation Builder</option>
                          <option value="Medical">Medical</option>
                          <option value="Engineering">Engineering</option>
                          <option value="MHT-CET">MHT-CET</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-black text-white font-semibold py-3 px-6 rounded-md transition duration-300 flex items-center justify-center"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : "Register as Student"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentZonePage;