import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCheckCircle, FaGraduationCap, FaCalendarAlt, FaUsers, FaChalkboardTeacher, FaFlask, FaBookMedical } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const NEETPage = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">NEET – The First Step Towards Your Dream of Becoming a Doctor</h1>
          <p className="text-xl max-w-3xl">
            If you've ever imagined yourself wearing a white coat, helping people, and making your family proud, then NEET is your gateway.
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
                The National Eligibility cum Entrance Test (NEET) is the exam that decides your admission into MBBS, BDS, and other medical courses in India. Every year, lakhs of students appear for it – but only those with the right preparation, mindset, and support make it to the top medical colleges.
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-black-700">What NEET means for you:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                    <span>A chance to turn your dream of becoming a doctor into reality.</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                    <span>An opportunity to study in prestigious government colleges.</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                    <span>The beginning of a life of respect, purpose, and service to society.</span>
                  </li>
                </ul>
              </div>
              
              <p className="text-gray-700 mb-6">
                The exam itself is straightforward – Physics, Chemistry, Biology from Class 11 & 12, in the form of multiple-choice questions. But what really matters is your consistency, focus, and guidance.
              </p>
              
              <p className="text-gray-700 mb-6">
                At the end of the day, NEET is not just an exam – it's a journey that tests your patience, courage, and determination. And with the right guidance, you can definitely conquer it.
              </p>
            </div>
            
            <div className="md:w-1/3">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <div className="bg-red-700 text-white p-4">
                  <h3 className="text-xl font-bold">Course Details</h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FaCalendarAlt className="text-green-700 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-bold">2 Years</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <FaUsers className="text-green-700 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Batch Size</p>
                      <p className="font-bold">Limited to 30 Students</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <FaChalkboardTeacher className="text-green-700 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Mode of Learning</p>
                      <p className="font-bold">Classroom & Online</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <FaGraduationCap className="text-green-700 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Eligibility</p>
                      <p className="font-bold">Class 11-12 Students</p>
                    </div>
                  </div>
                  
                  <Link 
                    to="/contact"
                    className="block w-full bg-red-700 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-800 transition duration-300"
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
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <FaFlask className="text-2xl text-green-700" />
                </div>
                <h3 className="text-xl font-bold text-green-700">Physics</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Mechanics & Properties of Matter</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Thermodynamics & Kinetic Theory</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Electrodynamics & Magnetism</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Optics & Modern Physics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Waves & Oscillations</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <FaFlask className="text-2xl text-green-700" />
                </div>
                <h3 className="text-xl font-bold text-green-700">Chemistry</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Physical Chemistry</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Organic Chemistry</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Inorganic Chemistry</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Analytical Chemistry</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Environmental Chemistry</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <FaBookMedical className="text-2xl text-green-700" />
                </div>
                <h3 className="text-xl font-bold text-green-700">Biology</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Diversity in Living World</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Structural Organization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Cell Structure & Function</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Human Physiology</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Genetics & Evolution</span>
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
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaChalkboardTeacher className="text-2xl text-green-700" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-green-700">Expert Faculty</h3>
              <p className="text-gray-700">
                Learn from experienced doctors and subject matter experts who understand the NEET exam pattern.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBookMedical className="text-2xl text-green-700" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-green-700">Comprehensive Study Material</h3>
              <p className="text-gray-700">
                Access to well-structured study materials, practice papers, and previous years' question banks.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-2xl text-green-700" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-green-700">Regular Tests</h3>
              <p className="text-gray-700">
                Weekly and monthly tests to assess progress and identify areas for improvement.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGraduationCap className="text-2xl text-green-700" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-green-700">Personalized Attention</h3>
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
          <h2 className="text-3xl font-bold mb-6">Ready to Begin Your Medical Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our NEET preparation program and take the first step towards your dream of becoming a doctor.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white hover:bg-gray-100 text-green-700 font-bold py-3 px-8 rounded-full transition duration-300">
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

export default NEETPage;