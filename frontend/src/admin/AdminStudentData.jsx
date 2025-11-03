import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaSearch } from "react-icons/fa";

const AdminStudentData = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
    enrollingCourse: ""
  });

  // Fetch students data
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/students", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (Array.isArray(response.data)) {
          setStudents(response.data);
        } else {
          console.error("Expected array but got:", typeof response.data);
          setStudents([]);
          setError("Invalid data format received from server");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Failed to fetch student data: " + (err.response?.data?.message || err.message));
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Set form data when editing a student
  const handleEdit = (student) => {
    setEditingStudent(student._id);
    setFormData({
      name: student.name,
      age: student.age,
      dob: student.dob ? student.dob.substring(0, 10) : "",
      email: student.email,
      phone: student.phone,
      address: student.address,
      enrollingCourse: student.enrollingCourse
    });
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingStudent(null);
    setFormData({
      name: "",
      age: "",
      dob: "",
      email: "",
      phone: "",
      address: "",
      enrollingCourse: ""
    });
  };

  // Update student data
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/api/students/${editingStudent}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Update the students list
      const updatedStudents = students.map(student => 
        student._id === editingStudent ? { ...student, ...formData } : student
      );
      setStudents(updatedStudents);
      
      // Reset form
      handleCancel();
    } catch (err) {
      setError("Failed to update student data");
    }
  };

  // Delete student
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/api/students/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Remove from students list
        setStudents(students.filter(student => student._id !== id));
      } catch (err) {
        setError("Failed to delete student");
      }
    }
  };

  // Filter students based on search term
  const filteredStudents = Array.isArray(students) ? students.filter(student => 
    student && student.name && student.email && student.enrollingCourse &&
    (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.enrollingCourse.toLowerCase().includes(searchTerm.toLowerCase()))
  ) : [];

  // Pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Student Data Management</h2>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      )}
      
      {/* Search bar */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search students by name, email or course..."
          className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Edit form */}
      {editingStudent && (
        <div className="mb-8 bg-gray-50 p-4 rounded-md border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Edit Student Information</h3>
          <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Enrolling Course</label>
              <select
                name="enrollingCourse"
                value={formData.enrollingCourse}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              ></textarea>
            </div>
            
            <div className="md:col-span-2 flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800"
              >
                Update Student
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Students table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentStudents.length > 0 ? (
              currentStudents.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="py-4 px-4 whitespace-nowrap">{student.name}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{student.age}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{student.email}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{student.phone}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{student.enrollingCourse}</td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(student)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(student._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 px-4 text-center text-gray-500">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav>
            <ul className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i + 1}>
                  <button
                    onClick={() => paginate(i + 1)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === i + 1
                        ? "bg-red-700 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default AdminStudentData;