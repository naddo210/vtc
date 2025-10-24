import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaDownload, FaExternalLinkAlt, FaSearch } from "react-icons/fa";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);

const ResourcesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRefs = useRef([]);
  
  // Add to refs array
  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Fetch resources from API
    const fetchResources = async () => {
      try {
        const response = await axios.get('https://vtct.onrender.com/api/resources');
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setResources(response.data);
        } else {
          console.log('No resources found or invalid data format, using fallback data');
          setResources(resourcesData); // Fallback to sample data
        }
      } catch (error) {
        console.error('Error fetching resources:', error);
        setResources(resourcesData); // Fallback to sample data
      } finally {
        setLoading(false);
      }
    };

    fetchResources();

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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Sample resources data (in a real app, this would come from an API)
  const resourcesData = [
    {
      id: 1,
      title: "NEET Biology Study Material",
      description: "Comprehensive study material covering all biology topics for NEET preparation.",
      imageUrl: "https://via.placeholder.com/300x200",
      url: "#",
      category: "neet"
    },
    {
      id: 2,
      title: "JEE Mathematics Formula Sheet",
      description: "Complete formula sheet for JEE Mathematics with solved examples.",
      imageUrl: "https://via.placeholder.com/300x200",
      url: "#",
      category: "jee"
    },
    {
      id: 3,
      title: "MHT-CET Previous Year Papers",
      description: "Collection of MHT-CET previous year papers with detailed solutions.",
      imageUrl: "https://via.placeholder.com/300x200",
      url: "#",
      category: "mht-cet"
    },
    {
      id: 4,
      title: "Foundation Builder Science Experiments",
      description: "Simple science experiments for Class 7-8 students to enhance practical understanding.",
      imageUrl: "https://via.placeholder.com/300x200",
      url: "#",
      category: "foundation-builder"
    },
    {
      id: 5,
      title: "NEET Physics Quick Revision Notes",
      description: "Concise revision notes for NEET Physics to help with last-minute preparation.",
      imageUrl: "https://via.placeholder.com/300x200",
      url: "#",
      category: "neet"
    },
    {
      id: 6,
      title: "JEE Chemistry Practice Questions",
      description: "Extensive practice question bank for JEE Chemistry with step-by-step solutions.",
      imageUrl: "https://via.placeholder.com/300x200",
      url: "#",
      category: "jee"
    },
    {
      id: 7,
      title: "Study Techniques for Competitive Exams",
      description: "Effective study techniques and time management strategies for competitive exams.",
      imageUrl: "https://via.placeholder.com/300x200",
      url: "#",
      category: "other"
    },
    {
      id: 8,
      title: "Career Guidance After 12th Science",
      description: "Comprehensive guide on career options available after 12th Science.",
      imageUrl: "https://via.placeholder.com/300x200",
      url: "#",
      category: "other"
    }
  ];

  // Filter resources based on search term and category filter
  const filteredResources = Array.isArray(resources) ? resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (resource.description && resource.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filter === "all" || resource.category === filter;
    
    return matchesSearch && matchesFilter;
  }) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-500 to-red-700 py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          Learning Resources
        </h1>
        <p className="mt-6 max-w-lg mx-auto text-xl text-indigo-100">
          Access our curated collection of learning materials to enhance your skills and knowledge.
        </p>
      </div>

      {/* Search and Filter */}
      <section ref={addToRefs} className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="relative w-full md:w-1/2 mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#663399]"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              <button 
                onClick={() => setFilter("all")}
                className={`mx-2 my-1 px-4 py-2 rounded-lg ${filter === "all" ? "bg-gray-700 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
              >
                All Resources
              </button>
              <button 
                onClick={() => setFilter("neet")}
                className={`mx-2 my-1 px-4 py-2 rounded-lg ${filter === "neet" ? "bg-purple-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
              >
                NEET
              </button>
              <button 
                onClick={() => setFilter("jee")}
                className={`mx-2 my-1 px-4 py-2 rounded-lg ${filter === "jee" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
              >
                JEE
              </button>
              <button 
                onClick={() => setFilter("mht-cet")}
                className={`mx-2 my-1 px-4 py-2 rounded-lg ${filter === "mht-cet" ? "bg-green-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
              >
                MHT-CET
              </button>
              <button 
                onClick={() => setFilter("foundation-builder")}
                className={`mx-2 my-1 px-4 py-2 rounded-lg ${filter === "foundation-builder" ? "bg-yellow-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
              >
                Foundation Builder
              </button>
              <button 
                onClick={() => setFilter("other")}
                className={`mx-2 my-1 px-4 py-2 rounded-lg ${filter === "other" ? "bg-gray-700 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
              >
                Other
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section ref={addToRefs} className="py-8 px-4">
        <div className="container mx-auto">
          {filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-gray-700 mb-4">No resources found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredResources.map((resource) => (
                <div key={resource.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition duration-300">
                  <img 
                    src={resource.imageUrl} 
                    alt={resource.title} 
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x200?text=Resource+Image";
                    }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-[#663399]">{resource.title}</h3>
                    {resource.description && <p className="text-gray-600 mb-4">{resource.description}</p>}
                    {resource.driveLink ? (
                      <a 
                        href={resource.driveLink}
                        className="inline-block bg-[#663399] hover:bg-purple-800 text-white font-bold py-2 px-6 rounded-full transition duration-300 flex items-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Access Drive <FaExternalLinkAlt className="ml-2" />
                      </a>
                    ) : resource.url && (
                      <a 
                        href={resource.url}
                        className="inline-flex items-center text-red-600 font-semibold hover:text-red-800 transition duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Access Resource <FaExternalLinkAlt className="ml-2" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Resources */}
      <section ref={addToRefs} className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-[#663399]">Featured Downloads</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                <FaDownload />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#663399]">Course Catalog</h3>
              <p className="text-gray-700 mb-4">
                Complete catalog of all our courses with detailed syllabus and schedules.
              </p>
              <button className="bg-[#663399] hover:bg-purple-800 text-white font-bold py-2 px-6 rounded-full transition duration-300">
                Download PDF
              </button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-[#663399] rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                <FaDownload />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#663399]">Career Guide</h3>
              <p className="text-gray-700 mb-4">
                Comprehensive guide to career paths in technology and healthcare.
              </p>
              <button className="bg-[#663399] hover:bg-purple-800 text-white font-bold py-2 px-6 rounded-full transition duration-300">
                Download PDF
              </button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                <FaDownload />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#663399]">Scholarship Information</h3>
              <p className="text-gray-700 mb-4">
                Details about our scholarship programs, eligibility criteria, and application process.
              </p>
              <button className="bg-[#663399] hover:bg-purple-800 text-white font-bold py-2 px-6 rounded-full transition duration-300">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section ref={addToRefs} className="py-16 px-4">
        <div className="container mx-auto max-w-4xl bg-gradient-to-r from-[#663399] to-black text-white rounded-xl p-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-lg">
                Subscribe to our newsletter to receive the latest resources, course updates, and special offers directly to your inbox.
              </p>
            </div>
            <div className="md:w-1/3">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-l-full focus:outline-none text-white-800"
                />
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-r-full transition duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;