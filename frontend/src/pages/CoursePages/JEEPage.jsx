import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCheckCircle, FaGraduationCap, FaCalendarAlt, FaUsers, FaChalkboardTeacher, FaCalculator, FaAtom } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const JEEPage = () => {
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
      <section className="bg-gradient-to-r from-black to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">JEE – Your Gateway to India's Top Engineering Colleges</h1>
          <p className="text-xl max-w-3xl">
            If you dream of becoming an engineer, innovator, or tech leader, then the Joint Entrance Examination (JEE) is your first big step.
          </p>
        </div>
      </section>

      {/* Course Overview */}
      <section ref={addToRefs} className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold mb-6 text-blue-700">Course Overview</h2>
              <p className="text-gray-700 mb-6">
                The JEE is held in two stages – JEE Main and JEE Advanced – and together, they decide your entry into India's IITs, NITs, IIITs, and other prestigious engineering institutes.
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-blue-700">What JEE Means for You:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-blue-500 mt-1 mr-2" />
                    <span>A chance to study in the world-famous IITs & NITs.</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-blue-500 mt-1 mr-2" />
                    <span>The foundation for a career filled with innovation, technology, and global opportunities.</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-blue-500 mt-1 mr-2" />
                    <span>A path that opens doors not just in India, but across the world.</span>
                  </li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-blue-700">JEE Structure:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-blue-500 mt-1 mr-2" />
                    <span><strong>JEE Main:</strong> Conducted by NTA, it's the first level. It helps you secure admission in NITs, IIITs, and also acts as the eligibility test for JEE Advanced.</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-blue-500 mt-1 mr-2" />
                    <span><strong>JEE Advanced:</strong> The next stage, conducted by IITs, for those who dream to study at India's most prestigious IITs.</span>
                  </li>
                </ul>
              </div>
              
              <p className="text-gray-700 mb-6">
                The subjects are the same – Physics, Chemistry, Mathematics – but the exam tests not just your knowledge, but also your problem-solving skills, patience, and determination.
              </p>
              
              <p className="text-gray-700 mb-6">
                At the end of the day, JEE is not just an exam – it's a journey of hard work, smart strategy, and never giving up. With the right focus and guidance, your IIT/NIT dream is absolutely possible.
              </p>
            </div>
            
            <div className="md:w-1/3">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <div className="bg-blue-700 text-white p-4">
                  <h3 className="text-xl font-bold">Course Details</h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FaCalendarAlt className="text-blue-700 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-bold">2 Years</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <FaUsers className="text-blue-700 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Batch Size</p>
                      <p className="font-bold">Limited to 30 Students</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <FaChalkboardTeacher className="text-blue-700 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Mode of Learning</p>
                      <p className="font-bold">Classroom & Online</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <FaGraduationCap className="text-blue-700 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Eligibility</p>
                      <p className="font-bold">Class 11-12 Students</p>
                    </div>
                  </div>
                  
                  <Link 
                    to="/contact"
                    className="block w-full bg-blue-700 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-800 transition duration-300"
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
          <h2 className="text-3xl font-bold mb-10 text-center text-blue-700">Curriculum</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <FaAtom className="text-2xl text-blue-700" />
                </div>
                <h3 className="text-xl font-bold text-blue-700">Physics</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Mechanics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Electrodynamics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Optics & Modern Physics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Thermodynamics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Waves & Sound</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <FaAtom className="text-2xl text-blue-700" />
                </div>
                <h3 className="text-xl font-bold text-blue-700">Chemistry</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Physical Chemistry</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Organic Chemistry</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Inorganic Chemistry</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Coordination Compounds</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Chemical Bonding</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <FaCalculator className="text-2xl text-blue-700" />
                </div>
                <h3 className="text-xl font-bold text-blue-700">Mathematics</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Algebra</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Calculus</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Coordinate Geometry</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Trigonometry</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Vectors & 3D Geometry</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section ref={addToRefs} className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-blue-700">Our Teaching Methodology</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaChalkboardTeacher className="text-2xl text-blue-700" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-700">Expert Faculty</h3>
              <p className="text-gray-700">
                Learn from IIT alumni and subject matter experts who understand the JEE exam pattern.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCalculator className="text-2xl text-blue-700" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-700">Problem-Solving Focus</h3>
              <p className="text-gray-700">
                Emphasis on conceptual clarity and advanced problem-solving techniques.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-2xl text-blue-700" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-700">Regular Tests</h3>
              <p className="text-gray-700">
                Weekly and monthly tests with JEE pattern questions to build exam temperament.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGraduationCap className="text-2xl text-blue-700" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-700">Personalized Attention</h3>
              <p className="text-gray-700">
                Small batch sizes ensure individual attention and doubt-clearing sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section ref={addToRefs} className="py-16 px-4 bg-gradient-to-r from-blue-700 to-black text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Begin Your Engineering Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our JEE preparation program and take the first step towards your dream of becoming an engineer.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white hover:bg-gray-100 text-blue-700 font-bold py-3 px-8 rounded-full transition duration-300">
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

export default JEEPage;