import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowRight } from "react-icons/fa";
import Super7 from "./Super7";

gsap.registerPlugin(ScrollTrigger);

const CoursesPage = () => {
  const sectionRefs = useRef([]);
  const [visibleCourses, setVisibleCourses] = useState([]);
  
  // Add to refs array
  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
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

    // Initial page load animation
    const tl = gsap.timeline();
    tl.from(".hero-section", { 
      opacity: 0, 
      y: -50, 
      duration: 0.8, 
      ease: "power3.out" 
    });

    // Staggered animation for course cards
    setTimeout(() => {
      const courseIds = courses.map(course => course.id);
      const interval = setInterval(() => {
        setVisibleCourses(prev => {
          if (prev.length < courseIds.length) {
            return [...prev, courseIds[prev.length]];
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 300);
    }, 500);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Course data
  const courses = [
    {
      id: "NEET",
      title: "NEET",
      description: "Master the NEET exam with our comprehensive course covering all topics.",
      image: "https://via.placeholder.com/600x400",
      features: ["Physics", "Chemistry", "Biology"],
      duration: "6 months",
      level: "Beginner to Advanced"
    },
    {
      id: "JEE",
      title: "JEE",
      description: "Master the JEE exam with our comprehensive course covering all topics.",
      image: "https://via.placeholder.com/600x400",
      features: ["Physics", "Chemistry", "Biology"],
      duration: "8 months",
      level: "Intermediate"
    },
    {
      id: "MHT-CET",
      title: "MHT-CET",
      description: "Master the MH-CET exam with our comprehensive course covering all topics.",
      image: "https://via.placeholder.com/600x400",
      features: ["Physics", "Chemistry", "Biology"],
      duration: "10 months",
      level: "Advanced"
    },
    {
      id: "foundation-builder",
      title: "School-Section",
      description: "Master the School-Section exam with our comprehensive course covering all topics.",
      image: "https://via.placeholder.com/600x400",
      features: ["Physics", "Chemistry", "Biology"],
      duration: "12 months",
      level: "Advanced"
    }
  ];

  return (
    <div className="pt-16 bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-[#FF0000] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Courses</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Comprehensive, industry-relevant courses designed to prepare you for a successful career in technology.
          </p>
        </div>
      </section>

      {/* Courses Overview */}
      <section ref={addToRefs} className="py-16 px-4 hero-section">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course) => (
              <div 
                key={course.id}
                className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 border border-gray-200 ${
                  visibleCourses.includes(course.id) 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-20"
                }`}
              >
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-[#663399]">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{course.duration}</span>
                    <Link 
                      to={`/courses/${course.id}`}
                      className="inline-flex items-center text-purple-600 hover:text-yellow-500 font-semibold"
                    >
                      Details <FaArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Super 7 Batch */}
     <Super7/>

      {/* Course Selection Guide */}
      <section ref={addToRefs} className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-[#663399]">How to Choose the Right Course</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-red-600">
              <h3 className="text-xl font-bold mb-4 text-[#663399]">Assess Your Goals</h3>
              <p className="text-gray-700">
                Consider your career objectives, interests, and the skills you want to develop. Our career counselors can help you align your goals with the right course.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#663399]">
              <h3 className="text-xl font-bold mb-4 text-[#663399]">Evaluate Your Background</h3>
              <p className="text-gray-700">
                Some courses require prior knowledge or experience. We offer preparatory modules to help you build the necessary foundation for advanced courses.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-red-600">
              <h3 className="text-xl font-bold mb-4 text-[#663399]">Consider Time Commitment</h3>
              <p className="text-gray-700">
                Our courses vary in duration and intensity. We offer flexible schedules, including weekend and evening classes, to accommodate working professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section ref={addToRefs} className="py-16 px-4 bg-gradient-to-r from-[#970b0b] to-black text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Schedule a free consultation with our academic advisors to find the perfect course for your career goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition duration-300">
              Book Consultation
            </button>
            <button className="bg-white hover:bg-gray-100 text-[#663399] font-bold py-3 px-8 rounded-full transition duration-300">
              Download Brochure
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoursesPage;