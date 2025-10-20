import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCheckCircle, FaGraduationCap, FaCalendarAlt, FaUsers, FaChalkboardTeacher, FaAtom, FaCalculator } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const MHTCETPage = () => {
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
      <section className="bg-gradient-to-r from-black to-gray-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">MHT-CET – Your Ticket to Maharashtra's Top Colleges</h1>
          <p className="text-xl max-w-3xl">
            If you dream of becoming an engineer, doctor, pharmacist, or building a career in science, the Maharashtra Common Entrance Test (MHT-CET) is the exam that opens those doors.
          </p>
        </div>
      </section>

      {/* Course Overview */}
      <section ref={addToRefs} className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold mb-6 text-black-700">Course Overview</h2>
              <p className="text-gray-700 mb-6">
                Every year, thousands of students across Maharashtra appear for CET to secure admission into the state's best Engineering, Pharmacy, and Agricultural colleges. For medical aspirants, it also works as the eligibility test for further studies in allied health fields.
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-black-700">What MHT-CET Means for You:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-purple-500 mt-1 mr-2" />
                    <span>A chance to study in top government & private colleges in Maharashtra.</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-purple-500 mt-1 mr-2" />
                    <span>An opportunity to shape your career in Engineering, Pharmacy, or Agriculture.</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-purple-500 mt-1 mr-2" />
                    <span>A stepping stone towards a secure and respected future.</span>
                  </li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-black-700">Exam Structure:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-purple-500 mt-1 mr-2" />
                    <span><strong>Subjects:</strong> Physics, Chemistry, Mathematics (for Engineering) or Biology (for Pharmacy/Allied health)</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-purple-500 mt-1 mr-2" />
                    <span><strong>Format:</strong> Multiple-choice questions, testing your concept clarity & speed</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-purple-500 mt-1 mr-2" />
                    <span><strong>Level:</strong> State-level exam conducted by the Maharashtra Government</span>
                  </li>
                </ul>
              </div>
              
              <p className="text-gray-700 mb-6">
                More than just an exam, MHT-CET is your launchpad – it rewards hard work, discipline, and determination. With the right preparation and guidance, you can turn your CET score into a bright career in science and technology.
              </p>
            </div>
            
            <div className="md:w-1/3">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <div className="bg-red-700 text-white p-4">
                  <h3 className="text-xl font-bold">Course Details</h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FaCalendarAlt className="text-purple-700 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-bold">1-2 Years</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <FaUsers className="text-purple-700 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Batch Size</p>
                      <p className="font-bold">Limited to 30 Students</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <FaChalkboardTeacher className="text-purple-700 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Mode of Learning</p>
                      <p className="font-bold">Classroom & Online</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <FaGraduationCap className="text-purple-700 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Eligibility</p>
                      <p className="font-bold">Class 11-12 Students</p>
                    </div>
                  </div>
                  
                  <Link 
                    to="/contact"
                    className="block w-full bg-red-700 text-white text-center py-3 rounded-lg font-semibold hover:bg-purple-800 transition duration-300"
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
          <h2 className="text-3xl font-bold mb-10 text-center text-black-700">Curriculum</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <FaAtom className="text-2xl text-purple-700" />
                </div>
                <h3 className="text-xl font-bold text-purple-700">Physics</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Mechanics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Electricity & Magnetism</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Optics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Modern Physics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Thermal Physics</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <FaAtom className="text-2xl text-purple-700" />
                </div>
                <h3 className="text-xl font-bold text-purple-700">Chemistry</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Physical Chemistry</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Organic Chemistry</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Inorganic Chemistry</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Analytical Chemistry</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Environmental Chemistry</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <FaCalculator className="text-2xl text-purple-700" />
                </div>
                <h3 className="text-xl font-bold text-purple-700">Mathematics/Biology</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Algebra & Calculus (Math)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Coordinate Geometry (Math)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Botany & Zoology (Biology)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Human Physiology (Biology)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Genetics & Evolution (Biology)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section ref={addToRefs} className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-black-700">Our Teaching Methodology</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaChalkboardTeacher className="text-2xl text-purple-700" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-purple-700">Expert Faculty</h3>
              <p className="text-gray-700">
                Learn from experienced educators who understand the MHT-CET exam pattern and requirements.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCalculator className="text-2xl text-purple-700" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-purple-700">Maharashtra Board Focus</h3>
              <p className="text-gray-700">
                Special emphasis on Maharashtra State Board syllabus and previous years' question patterns.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-2xl text-purple-700" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-purple-700">Regular Tests</h3>
              <p className="text-gray-700">
                Weekly and monthly tests with MHT-CET pattern questions to build exam temperament.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGraduationCap className="text-2xl text-purple-700" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-purple-700">Personalized Attention</h3>
              <p className="text-gray-700">
                Small batch sizes ensure individual attention and doubt-clearing sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section ref={addToRefs} className="py-16 px-4 bg-gradient-to-r from-red-700 to-black text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Secure Your Future in Maharashtra's Top Colleges?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our MHT-CET preparation program and take the first step towards your dream career.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white hover:bg-gray-100 text-purple-700 font-bold py-3 px-8 rounded-full transition duration-300">
              Enroll Now
            </Link>
            <Link to="/contact" className="bg-transparent hover:bg-white/10 text-white border-2 border-white font-bold py-3 px-8 rounded-full transition duration-300">
              Request Information
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MHTCETPage;