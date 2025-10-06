import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCheckCircle, FaGraduationCap, FaCalendarAlt, FaUsers, FaChalkboardTeacher } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const PreNurtureFoundation = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Pre - Nurture Foundation Builder</h1>
          <p className="text-xl max-w-3xl">
            Building strong academic foundations for young learners in grades 5-8, preparing them for future academic excellence.
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
                The Pre-Nurture Foundation Builder program is designed for students in grades 5-8 who want to build a strong academic foundation. This program focuses on developing critical thinking, problem-solving skills, and fundamental concepts in Mathematics and Science that will prepare students for competitive exams in the future.
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-[#663399]">Key Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                    <span>Comprehensive curriculum covering Mathematics, Science, and Mental Ability</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                    <span>Interactive learning with practical demonstrations and experiments</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                    <span>Regular assessments and personalized feedback</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                    <span>Preparation for various scholarship exams and Olympiads</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                    <span>Development of analytical thinking and logical reasoning</span>
                  </li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-[#663399]">Learning Outcomes</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                    <span>Strong foundation in Mathematics and Science concepts</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                    <span>Enhanced problem-solving and critical thinking abilities</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                    <span>Improved time management and exam-taking strategies</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                    <span>Preparation for future competitive exams</span>
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
                      <p className="font-medium">Grades 5-8</p>
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
                      <p className="font-medium">Limited to 25 students</p>
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
              <h3 className="text-xl font-bold mb-4 text-[#663399]">Mathematics</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Number Systems and Operations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Algebra and Patterns</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Geometry and Measurements</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Data Handling and Statistics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Logical Reasoning and Puzzles</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#663399]">Science</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Physical Sciences</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Life Sciences</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Earth and Space Sciences</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Scientific Method and Experiments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Environmental Science</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section ref={addToRefs} className="py-16 px-4 bg-gradient-to-r from-[#663399] to-black text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Start Your Child's Academic Journey Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Give your child the advantage of a strong foundation in academics with our Pre-Nurture Foundation Builder program.
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

export default PreNurtureFoundation;