import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  
  FaInstagram, 

  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaArrowRight,
  FaCode,
  FaBrain,
  FaChartBar,
  FaFlask,
  FaGraduationCap,
  FaTrophy,
  FaUsers,
  FaHeart,
  FaRocket
} from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // Only run animations once when component mounts
    const ctx = gsap.context(() => {
      // Set initial state immediately to prevent flashing
      gsap.set('.footer-animate', { opacity: 1, y: 0 });
      
      // Logo gentle animation
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          scale: 1.05,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      }
    });

    // Clean up all animations when component unmounts
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-600 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-20 left-20 w-64 h-64 bg-gray-600 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* About Section */}
            <div className="footer-animate">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                VTC Smart Class
              </h3>
              <div ref={logoRef} className="mb-6">
                <img src="/logo.png" alt="VTC Logo" className="h-16 filter drop-shadow-lg" />
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Transforming lives through quality education. Join thousands of students who've achieved academic excellence with our expert-led programs.
              </p>
              
              {/* Stats - Now clearly visible */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gradient-to-r from-gray-600 to-gray-700 p-3 rounded-lg border border-gray-500 border-opacity-30">
                  <div className="flex items-center">
                    <FaUsers className="text-white mr-2 text-lg" />
                    <span className="text-white text-sm font-semibold">10K+ Students</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-gray-600 to-gray-700 p-3 rounded-lg border border-gray-500 border-opacity-30">
                  <div className="flex items-center">
                    <FaTrophy className="text-white mr-2 text-lg" />
                    <span className="text-white text-sm font-semibold">98% Success</span>
                  </div>
                </div>
              </div>

              {/* Fixed Social Media - Now clearly visible */}
              <div>
                <h4 className="text-white font-semibold mb-3">Follow Us</h4>
                <div className="flex space-x-3">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                     className="bg-gray-700 text-white p-3 rounded-full hover:bg-gray-600 hover:scale-110 transition-all duration-300 shadow-lg">
                    <FaFacebook size={20} />
                  </a>
                
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                     className="bg-gray-700 text-white p-3 rounded-full hover:bg-gray-600 hover:scale-110 transition-all duration-300 shadow-lg">
                    <FaInstagram size={20} />
                  </a>
              
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-animate">
              <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-purple-200 to-white bg-clip-text text-transparent">
                Quick Links
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'About Us', url: '/about' },
                  { name: 'All Courses', url: '/courses' },
                  { name: 'Events', url: '/events' },
                  { name: 'Resources', url: '/resources' },
                  { name: 'Special Offers', url: '/offers' },
                  { name: 'Contact', url: '/contact' },
                  { name: 'Admin Panel', url: '/admin' }
                ].map((link, index) => (
                  <Link
                    key={index}
                    to={link.url}
                    className="flex items-center text-gray-300 hover:text-white transition-all duration-300 transform hover:translate-x-2 group"
                  >
                    <FaArrowRight className="mr-3 text-purple-400 text-sm group-hover:text-purple-300" />
                    <span className="font-medium">{link.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Courses Section */}
            <div className="footer-animate">
              <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
                Our Courses
              </h3>
              <div className="space-y-3">
                {[
                  { icon: FaGraduationCap, name: 'NEET', url: '/courses/neet', color: 'text-gray-400' },
                  { icon: FaGraduationCap, name: 'JEE', url: '/courses/jee', color: 'text-gray-400' },
                  { icon: FaGraduationCap, name: 'MHT-CET', url: '/courses/mht-cet', color: 'text-gray-400' },
                  { icon: FaGraduationCap, name: 'Foundation Builder', url: '/courses/foundation-builder', color: 'text-gray-400' }
                ].map((course, index) => (
                  <Link
                    key={index}
                    to={course.url}
                    className="flex items-center text-gray-300 hover:text-white transition-all duration-300 transform hover:translate-x-2 group"
                  >
                    <course.icon className={`mr-3 ${course.color} text-lg group-hover:scale-110 transition-transform duration-300`} />
                    <span className="font-medium">{course.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Section */}
            <div className="footer-animate">
              <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
                Contact Us
              </h3>
              <div className="space-y-4">
                <div className="flex items-start group cursor-pointer">
                  <div className="bg-gray-500 bg-opacity-20 p-2 rounded-lg mr-3 group-hover:bg-opacity-30 transition-all duration-300">
                    <FaMapMarkerAlt className="text-gray-400 text-lg" />
                  </div>
                  <div className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm">
                    <p className="font-semibold mb-1">Head Office & Classroom No. 1</p>
                    <p>2nd Floor, Kamdar Shopping Centre, Shop No. 29, Opp. Railway ticket counter, Vile Parle (E), Mumbai - 400 057</p>
                  </div>
                </div>
                
                <div className="flex items-start group cursor-pointer">
                  <div className="bg-gray-500 bg-opacity-20 p-2 rounded-lg mr-3 group-hover:bg-opacity-30 transition-all duration-300">
                    <FaMapMarkerAlt className="text-gray-400 text-lg" />
                  </div>
                  <div className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm">
                    <p className="font-semibold mb-1">Ground Floor</p>
                    <p>Naminath Apt, Shop No. 10, Tejpal Road, Opp. Vile Parle Station Bus Stop.</p>
                  </div>
                </div>
                
                <div className="flex items-start group cursor-pointer">
                  <div className="bg-gray-500 bg-opacity-20 p-2 rounded-lg mr-3 group-hover:bg-opacity-30 transition-all duration-300">
                    <FaMapMarkerAlt className="text-gray-400 text-lg" />
                  </div>
                  <div className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm">
                    <p className="font-semibold mb-1">Lecture Hall Classroom No. 2</p>
                    <p>1st Floor, Kamdar Shopping Centre, Shop No. 3D, Opp. Railway ticket counter, Vile Parle (E), Mumbai - 400 057</p>
                  </div>
                </div>
                
                <div className="flex items-start group cursor-pointer">
                  <div className="bg-gray-500 bg-opacity-20 p-2 rounded-lg mr-3 group-hover:bg-opacity-30 transition-all duration-300">
                    <FaMapMarkerAlt className="text-gray-400 text-lg" />
                  </div>
                  <div className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm">
                    <p className="font-semibold mb-1">Conference Room & Classroom No. 3 & 4, VTC LIBRARY</p>
                    <p>1st Floor, Kamdar Shopping Centre, Shop No. 3D, Opp. Railway ticket counter, Vile Parle (E), Mumbai - 400 057</p>
                  </div>
                </div>
                
                <div className="flex items-center group">
                  <div className="bg-gray-500 bg-opacity-20 p-2 rounded-lg mr-3 group-hover:bg-opacity-30 transition-all duration-300">
                    <FaPhone className="text-gray-400 text-lg" />
                  </div>
                  <a href="tel:7077071737" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium">
                    7077071737 | 7710048831
                  </a>
                </div>
                
                <div className="flex items-center group">
                  <div className="bg-gray-500 bg-opacity-20 p-2 rounded-lg mr-3 group-hover:bg-opacity-30 transition-all duration-300">
                    <FaEnvelope className="text-gray-400 text-lg" />
                  </div>
                  <a href="mailto:vtcsmartclass@gmail.com" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium">
                    vtcsmartclass@gmail.com
                  </a>
                </div>
              </div>

              {/* Enhanced Newsletter */}
              <div className="mt-6 p-4 bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg border border-gray-400 border-opacity-30 shadow-lg">
                <h4 className="text-white font-bold mb-2 flex items-center">
                  <FaRocket className="mr-2" />
                  Stay Updated!
                </h4>
                <p className="text-gray-300 text-sm mb-3">Get latest courses & offers</p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 bg-white bg-opacity-30 border border-white border-opacity-30 rounded-l text-white placeholder-gray-300 focus:outline-none focus:bg-opacity-40 transition-all duration-300"
                  />
                  <button className="bg-white text-gray-800 px-4 py-2 rounded-r font-semibold hover:bg-gray-200 transition-colors duration-300 flex items-center">
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white border-opacity-20 bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <span className="text-gray-300 text-sm mr-2">Made with</span>
                <FaHeart className="text-gray-400 animate-pulse mx-1" />
                <span className="text-gray-300 text-sm ml-2">
                  &copy; {new Date().getFullYear()} VTC Smart Class. All rights reserved.
                </span>
              </div>
              
              <div className="flex space-x-6">
                <Link to="/privacy-policy" className="text-gray-300 hover:text-white text-sm transition-colors duration-300 relative group">
                  Privacy Policy
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-400 group-hover:w-full transition-all duration-300"></div>
                </Link>
                <Link to="/terms-of-service" className="text-gray-300 hover:text-white text-sm transition-colors duration-300 relative group">
                  Terms of Service
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-400 group-hover:w-full transition-all duration-300"></div>
                </Link>
                <Link to="/sitemap" className="text-gray-300 hover:text-white text-sm transition-colors duration-300 relative group">
                  Sitemap
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-400 group-hover:w-full transition-all duration-300"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
