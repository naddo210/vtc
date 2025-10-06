import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetail from './pages/CourseDetail';
import EventsPage from './pages/EventsPage';
import ResourcesPage from './pages/ResourcesPage';
import StudentZonePage from './pages/StudentZonePage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import AdminPanel from './admin/AdminPanel.jsx';
import CareersPage from './pages/CareersPage';
import GalleryPage from './pages/GalleryPage';
import BioVaccinePage from './pages/BioVaccinePage';
import Super7BatchPage from './pages/Super7BatchPage';
import NEETPage from './pages/CoursePages/NEETPage';
import JEEPage from './pages/CoursePages/JEEPage';
import MHTCETPage from './pages/CoursePages/MHTCETPage';
import FoundationBuilderPage from './pages/CoursePages/FoundationBuilderPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(location.pathname);
  const mainRef = useRef(null);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    setCurrentPage(location.pathname);
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
     <main ref={mainRef} className="flex-grow pt-9 transition-all duration-500 ease-in-out">

        <div className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/courses/neet" element={<NEETPage />} />
            <Route path="/courses/jee" element={<JEEPage />} />
            <Route path="/courses/mht-cet" element={<MHTCETPage />} />
            <Route path="/courses/foundation-builder" element={<FoundationBuilderPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/programs/bio-vaccine" element={<BioVaccinePage />} />
            <Route path="/programs/super-7" element={<Super7BatchPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/student-zone" element={<StudentZonePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin/*" element={<AdminPanel />} />
            <Route path="/careers" element={<CareersPage />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
