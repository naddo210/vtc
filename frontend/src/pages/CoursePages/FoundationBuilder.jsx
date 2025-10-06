import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCheckCircle, FaGraduationCap, FaCalendarAlt, FaUsers, FaChalkboardTeacher } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const FoundationBuilder = () => {
  const sectionRefs = useRef([]);
  
  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
    sectionRefs.current.forEach((section) => {
      gsap.fromTo(
        section,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
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

  return (
    <div className="pt-16 bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-[#663399] text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Foundation Builder</h1>
          <p className="text-xl max-w-3xl">
            Comprehensive foundation program for grades 9-10 to build strong academic fundamentals for future competitive exams.
          </p>
        </div>
      </section>

      {/* Course Overview */}
      <section ref={addToRefs} className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold mb-6 text-[#663399]">Course Overview</h2>
              <p className="text-gray-700 mb-6">
                The Foundation Builder program is designed for students in grades 9-10 who are preparing for board exams and laying the groundwork for future competitive examinations. This program focuses on building strong conceptual understanding in Physics, Chemistry, Mathematics, and Biology while developing analytical thinking and problem-solving skills.
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-[#663399]">Key Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                    <span>Comprehensive coverage of board syllabus with advanced concepts</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                    <span>Focus on building strong conceptual foundations in all subjects</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                    <span>Regular tests and assessments with detailed performance analysis</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                    <span>Introduction to competitive exam patterns and question types</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                    <span>Development of time management and exam strategies</span>
                  </li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-[#663399]">Learning Outcomes</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                    <span>Strong conceptual understanding of all subjects</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                    <span>Enhanced analytical thinking and problem-solving abilities</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                    <span>Improved performance in board examinations</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                    <span>Readiness for future competitive examinations</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="md:w-1/3">
              <div className="bg-gray-50 rounded-lg p-6 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-[#663399]">Course Details</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaGraduationCap className="text-[#663399] mr-3 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500">Grade Level</p>
                      <p className="font-medium">Grades 9-10</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-[#663399] mr-3 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">Academic Year Program</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FaUsers className="text-[#663399] mr-3 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500">Class Size</p>
                      <p className="font-medium">Limited to 30 students</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FaChalkboardTeacher className="text-[#663399] mr-3 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500">Teaching Mode</p>
                      <p className="font-medium">Classroom & Online</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link 
                    to="/contact"
                    className="block w-full bg-[#663399] text-white text-center py-3 rounded-lg font-semibold hover:bg-purple-800 transition duration-300"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section ref={addToRefs} className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-[#663399]">Curriculum</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#663399]">Physics & Chemistry</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Mechanics and Motion</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Heat and Thermodynamics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Atomic Structure</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Chemical Bonding</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Periodic Table and Elements</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#663399]">Mathematics & Biology</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Algebra and Functions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Geometry and Trigonometry</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Cell Structure and Function</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Human Physiology</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Genetics and Evolution</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section ref={addToRefs} className="py-16 px-4 bg-gradient-to-r from-[#663399] to-black text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Build a Strong Foundation for Future Success</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Prepare for board exams while laying the groundwork for future competitive examinations with our Foundation Builder program.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/contact"
              className="bg-white text-[#663399] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Contact Us
            </Link>
            <Link 
              to="/offers"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#663399] transition duration-300"
            >
              View Offers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FoundationBuilder;