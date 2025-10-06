import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaSearch } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredGallery, setFilteredGallery] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const sectionRefs = useRef([]);
  
  // Add to refs array
  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Gallery data with categories
  const galleryItems = [
    // Classes Images
    {
      id: 1,
      title: "NEET Classroom Session",
      category: "classes",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: "Students engaged in an interactive NEET preparation session"
    },
    {
      id: 2,
      title: "JEE Advanced Workshop",
      category: "classes",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: "Intensive problem-solving workshop for JEE aspirants"
    },
    {
      id: 3,
      title: "Foundation Builder Class",
      category: "classes",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: "Young students building strong academic foundations"
    },
    {
      id: 4,
      title: "MHT-CET Group Study",
      category: "classes",
      image: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: "Collaborative learning session for MHT-CET preparation"
    },
    
    // Study Material
    {
      id: 5,
      title: "Physics Study Materials",
      category: "study-material",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: "Comprehensive physics materials for competitive exams"
    },
    {
      id: 6,
      title: "Chemistry Lab Manual",
      category: "study-material",
      image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: "Detailed chemistry lab procedures and experiments"
    },
    {
      id: 7,
      title: "Mathematics Formula Handbook",
      category: "study-material",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: "Quick reference guide for mathematical formulas"
    },
    {
      id: 8,
      title: "Biology Diagrams Collection",
      category: "study-material",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: "Visual aids for biology concepts and systems"
    },
    
    // Technology
    {
      id: 9,
      title: "Digital Learning Lab",
      category: "technology",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: "State-of-the-art computer lab for digital learning"
    },
    {
      id: 10,
      title: "Virtual Reality Session",
      category: "technology",
      image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: "Immersive learning through VR technology"
    },
    {
      id: 11,
      title: "Smart Classroom",
      category: "technology",
      image: "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: "Interactive digital boards and learning tools"
    },
    {
      id: 12,
      title: "Online Assessment Platform",
      category: "technology",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: "Digital testing and performance analytics system"
    },
    
    // Events
    {
      id: 13,
      title: "Science Exhibition",
      category: "events",
      image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: "Annual science project showcase and competition"
    },
    {
      id: 14,
      title: "Graduation Ceremony",
      category: "events",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: "Celebrating student achievements and milestones"
    },
    {
      id: 15,
      title: "Career Counseling Day",
      category: "events",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: "Professional guidance for future career paths"
    },
    {
      id: 16,
      title: "Parents-Teachers Meeting",
      category: "events",
      image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: "Collaborative discussion on student progress"
    }
  ];

  // Filter gallery items based on active category and search term
  useEffect(() => {
    let filtered = galleryItems;
    
    // Apply category filter
    if (activeCategory !== "all") {
      filtered = filtered.filter(item => item.category === activeCategory);
    }
    
    // Apply search filter if search term exists
    if (searchTerm.trim() !== "") {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        item => 
          item.title.toLowerCase().includes(searchLower) || 
          item.description.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredGallery(filtered);
  }, [activeCategory, searchTerm]);

  // Initialize animations
  useEffect(() => {
    // Set initial filtered gallery
    setFilteredGallery(galleryItems);
    
    // Animate sections on scroll
    sectionRefs.current.forEach((section) => {
      gsap.fromTo(
        section,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Animate gallery items with staggered effect
    const galleryCards = document.querySelectorAll('.gallery-card');
    gsap.fromTo(
      galleryCards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.gallery-grid',
          start: "top 80%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    
    // Animate the gallery grid when category changes
    const galleryCards = document.querySelectorAll('.gallery-card');
    gsap.fromTo(
      galleryCards,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.4,
        ease: "power2.out",
      }
    );
  };

  // Get category color
  const getCategoryColor = (category) => {
    switch(category) {
      case "classes":
        return "bg-blue-500";
      case "study-material":
        return "bg-green-500";
      case "technology":
        return "bg-purple-500";
      case "events":
        return "bg-amber-500";
      default:
        return "bg-gray-500";
    }
  };

  // Get category display name
  const getCategoryName = (category) => {
    switch(category) {
      case "classes":
        return "Classes";
      case "study-material":
        return "Study Material";
      case "technology":
        return "Technology";
      case "events":
        return "Events";
      default:
        return category;
    }
  };

  return (
    <div className="pt-16 bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-gray-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Gallery</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Explore our vibrant learning environment through images of our classes, study materials, technology, and events.
          </p>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section ref={addToRefs} className="py-12 px-4">
        <div className="container mx-auto">
          {/* Search Bar */}
          <div className="mb-8 max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search gallery..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#663399] focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === "all"
                  ? "bg-[#663399] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All Gallery
            </button>
            <button
              onClick={() => handleCategoryChange("classes")}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === "classes"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Classes
            </button>
            <button
              onClick={() => handleCategoryChange("study-material")}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === "study-material"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Study Material
            </button>
            <button
              onClick={() => handleCategoryChange("technology")}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === "technology"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Technology
            </button>
            <button
              onClick={() => handleCategoryChange("events")}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === "events"
                  ? "bg-amber-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Events
            </button>
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGallery.length > 0 ? (
              filteredGallery.map((item) => (
                <div
                  key={item.id}
                  className="gallery-card bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className={`absolute top-4 right-4 ${getCategoryColor(item.category)} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                      {getCategoryName(item.category)}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-medium text-gray-500">No gallery items found matching your criteria.</h3>
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setSearchTerm("");
                  }}
                  className="mt-4 px-6 py-2 bg-[#663399] text-white rounded-full hover:bg-[#7a4baf] transition-colors duration-300"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section ref={addToRefs} className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#663399]">Join Our Learning Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
            Experience our vibrant learning environment and state-of-the-art facilities firsthand.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-[#663399] text-white font-bold rounded-full hover:bg-[#7a4baf] transition-colors duration-300"
          >
            Contact Us Today
          </a>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;