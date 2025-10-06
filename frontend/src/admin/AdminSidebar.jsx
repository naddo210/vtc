import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaFileAlt, FaGraduationCap, FaImages } from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <div className="bg-red-900 text-white w-64 min-h-screen p-4 flex flex-col">
      <div className="text-2xl font-bold mb-8 text-center text-white">Admin Panel</div>

      <nav className="flex-1">
        <ul>
          <li className="mb-2">
            <Link
              to="/admin"
              className="flex items-center p-3 rounded hover:bg-red-700 transition-colors"
            >
              <FaHome className="mr-3 text-white" />
              Dashboard
            </Link>
          </li>

          <li className="mb-2">
            <Link
              to="/admin/resources"
              className="flex items-center p-3 rounded hover:bg-red-700 transition-colors"
            >
              <FaFileAlt className="mr-3 text-white" />
              Resources
            </Link>
          </li>

          <li className="mb-2">
            <Link
              to="/admin/carousel"
              className="flex items-center p-3 rounded hover:bg-red-700 transition-colors"
            >
              <FaImages className="mr-3 text-white" />
              Carousel Ads
            </Link>
          </li>

          <li className="mb-2">
            <Link
              to="/admin/students"
              className="flex items-center p-3 rounded hover:bg-red-700 transition-colors"
            >
              <FaGraduationCap className="mr-3 text-white" />
              Student Data
            </Link>
          </li>
        </ul>
      </nav>

      <div className="mt-auto pt-8">
        <Link
          to="/"
          className="flex items-center p-3 rounded hover:bg-purple-700 transition-colors"
        >
          <span>← Back to Website</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
