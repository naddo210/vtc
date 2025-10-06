import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCalendarAlt, FaMapMarkerAlt, FaFilter, FaTimes } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const EventsPage = () => {
  const sectionRefs = useRef([]);
  const videoRefs = useRef({});
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredEvents, setFilteredEvents] = useState([]);
  
  // Add to refs array
  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Add video ref
  const addVideoRef = (id, el) => {
    if (el) {
      videoRefs.current[id] = el;
    }
  };

  // Handle video hover
  const handleVideoHover = (id, isHovering) => {
    const video = videoRefs.current[id];
    if (video) {
      if (isHovering) {
        video.play();
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  };

  // Filter events based on active category
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => event.category === activeCategory));
    }
  }, [activeCategory]);

  useEffect(() => {
    // Initialize with all events
    setFilteredEvents(events);
    
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

  // Event data
  const events = [
    {
      id: 1,
      title: "Annual Cricket Tournament",
      date: "January 15-20, 2024",
      location: "VTC Sports Complex",
      description: "Our annual cricket tournament featuring teams from all departments. Join us for exciting matches, awards ceremony, and refreshments.",
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: "sports"
    },
    {
      id: 2,
      title: "Basketball Championship",
      date: "February 5-10, 2024",
      location: "VTC Indoor Stadium",
      description: "Inter-class basketball championship with separate tournaments for boys and girls. Come support your class team and enjoy the competitive spirit!",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: "sports"
    },
    {
      id: 3,
      title: "Diwali Celebration",
      date: "November 12, 2023",
      location: "VTC Main Campus",
      description: "Join us for a vibrant Diwali celebration featuring rangoli competition, lamp lighting ceremony, cultural performances, and delicious festive treats.",
      image: "https://images.unsplash.com/photo-1605021154928-da0f1b51a087?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: "festival"
    },
    {
      id: 4,
      title: "Ganesh Chaturthi Festival",
      date: "September 7, 2024",
      location: "VTC Campus & Local Beach",
      description: "Participate in the installation of Lord Ganesha idol, daily aarti ceremonies, cultural programs, and the immersion procession (Visarjan) on the final day.",
      image: "https://images.unsplash.com/photo-1631788012442-633d4f91ad86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: "festival"
    },
    {
      id: 5,
      title: "Botanical Gardens Picnic",
      date: "February 10, 2024",
      location: "Botanical Gardens",
      description: "A fun-filled day outdoors combining learning and recreation. Explore nature, participate in team-building activities, and enjoy a refreshing break from routine.",
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: "picnic"
    },
    {
      id: 6,
      title: "Beach Day Out",
      date: "March 20, 2024",
      location: "Juhu Beach, Mumbai",
      description: "Enjoy a relaxing day at the beach with classmates and teachers. Activities include beach volleyball, sandcastle building competition, and group games.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: "picnic"
    },
    {
      id: 7,
      title: "Historical Trip to Ajanta & Ellora",
      date: "March 5-7, 2024",
      location: "Aurangabad, Maharashtra",
      description: "Explore the ancient cave monuments of Ajanta and Ellora, UNESCO World Heritage sites. Learn about India's rich cultural and architectural history with expert guides.",
      image: "https://images.unsplash.com/photo-1590080552494-dcda538e9c19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: "historic"
    },
    {
      id: 8,
      title: "Fort Heritage Tour",
      date: "April 15, 2024",
      location: "Various Historical Forts",
      description: "A guided tour of Maharashtra's famous forts including Raigad, Sindhudurg, and Pratapgad. Learn about Maratha history and the architectural marvels of these structures.",
      image: "https://images.unsplash.com/photo-1599912027611-484b9fc447af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: "historic"
    }
  ];

  return (
    <div className="pt-16 bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-[#663399] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Events & Workshops</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Join us for exciting events, workshops, and conferences to enhance your skills and network with industry professionals.
          </p>
        </div>
      </section>

      {/* Featured Videos Section */}
      <section ref={addToRefs} className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-[#663399]">Featured Event Highlights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Video 1 */}
            <div 
              className="relative overflow-hidden rounded-lg shadow-lg"
              onMouseEnter={() => handleVideoHover('featured1', true)}
              onMouseLeave={() => handleVideoHover('featured1', false)}
            >
              <video 
                ref={(el) => addVideoRef('featured1', el)}
                src="https://videocdn.cdnpk.net/videos/5a2119d2-bdfd-4a09-98f8-5c43342ad4fa/horizontal/previews/clear/large.mp4?token=exp=1759512248~hmac=25490a65418285257cef8c3cf4327629b54c66d0ef8ba8abd3f6324187107fd3"
                className="w-full h-64 object-cover"
                muted
                loop
                playsInline
                poster="https://images.unsplash.com/photo-1643651473765-b63541b31ae1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNob3J0JTIwdmlkZW98ZW58MHx8MHx8fDA%3D"
              ></video>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <h3 className="text-white text-lg font-bold">Ganesh Chaturthi Festival</h3>
              </div>
            </div>
            
            {/* Video 2 */}
            <div 
              className="relative overflow-hidden rounded-lg shadow-lg"
              onMouseEnter={() => handleVideoHover('featured2', true)}
              onMouseLeave={() => handleVideoHover('featured2', false)}
            >
              <video 
                ref={(el) => addVideoRef('featured2', el)}
                src="https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-308-large.mp4"
                className="w-full h-64 object-cover"
                muted
                loop
                playsInline
                poster="https://via.placeholder.com/400x250"
              ></video>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <h3 className="text-white text-lg font-bold">Data Science Summit</h3>
              </div>
            </div>
            
            {/* Video 3 */}
            <div 
              className="relative overflow-hidden rounded-lg shadow-lg"
              onMouseEnter={() => handleVideoHover('featured3', true)}
              onMouseLeave={() => handleVideoHover('featured3', false)}
            >
              <video 
                ref={(el) => addVideoRef('featured3', el)}
                src="https://assets.mixkit.co/videos/preview/mixkit-woman-typing-on-a-laptop-keyboard-4809-large.mp4"
                className="w-full h-64 object-cover"
                muted
                loop
                playsInline
                poster="https://via.placeholder.com/400x250"
              ></video>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <h3 className="text-white text-lg font-bold">AI & ML Conference</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section ref={addToRefs} className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button 
              onClick={() => setActiveCategory("all")}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === "all" 
                  ? "bg-[#663399] text-white" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All Events
            </button>
            <button 
              onClick={() => setActiveCategory("sports")}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === "sports" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Sports Events
            </button>
            <button 
              onClick={() => setActiveCategory("festival")}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === "festival" 
                  ? "bg-red-600 text-white" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Festival Events
            </button>
            <button 
              onClick={() => setActiveCategory("picnic")}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === "picnic" 
                  ? "bg-green-600 text-white" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Picnic
            </button>
            <button 
              onClick={() => setActiveCategory("historic")}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === "historic" 
                  ? "bg-amber-600 text-white" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Historic Events
            </button>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section ref={addToRefs} className="py-8 px-4 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-[#663399]">Upcoming Events</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <div 
                key={event.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
                onMouseEnter={() => handleVideoHover(`event${event.id}`, true)}
                onMouseLeave={() => handleVideoHover(`event${event.id}`, false)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                  <video 
                    ref={(el) => addVideoRef(`event${event.id}`, el)}
                    src={event.video}
                    className="absolute inset-0 w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                  ></video>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-[#663399]">{event.title}</h3>
                  <div className="flex items-center mb-2 text-gray-600">
                    <FaCalendarAlt className="mr-2" />
                    <span className="mr-4">{event.date}</span>
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{event.description}</p>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white ${
                    event.category === "sports" ? "bg-blue-600" :
                    event.category === "festival" ? "bg-red-600" :
                    event.category === "picnic" ? "bg-green-600" :
                    event.category === "historic" ? "bg-amber-600" : "bg-[#663399]"
                  }`}>
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section ref={addToRefs} className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-center text-[#663399]">Event Gallery</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
            Explore photos from our past events and activities
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="overflow-hidden rounded-lg">
              <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" alt="Event" className="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-110" />
            </div>
            <div className="overflow-hidden rounded-lg">
              <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" alt="Event" className="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-110" />
            </div>
            <div className="overflow-hidden rounded-lg">
              <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" alt="Event" className="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-110" />
            </div>
            <div className="overflow-hidden rounded-lg">
              <img src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" alt="Event" className="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-110" />
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

// Export the EventsPage component for use in other parts of the application
export default EventsPage;