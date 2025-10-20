import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCheckCircle, FaGraduationCap, FaCalendarAlt, FaUsers, FaChalkboardTeacher, FaBook, FaLightbulb, FaTrophy, FaBrain } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const FoundationBuilderPage = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Foundation Builder & Pre-Nurture – The First Step Towards Big Dreams</h1>
          <p className="text-xl max-w-3xl">
            Every great journey starts with the right foundation. For students of Classes 7th, 8th, 9th, and 10th, our Foundation Builder & Pre-Nurture programs are designed to make learning stronger, smarter, and more exciting.
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
                These programs are not just about school exams – they are about preparing students early for competitive exams like NEET, JEE, MHT-CET, Olympiads, and NTSE, while also building confidence in every subject.
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-black-700">Why Foundation & Pre-Nurture?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                    <span>Builds strong basics in Maths, Science & Logic</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                    <span>Develops the right exam temperament & problem-solving skills</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                    <span>Prepares students for school boards + competitive exams</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                    <span>Creates discipline, curiosity, and a habit of smart learning</span>
                  </li>
                </ul>
              </div>
              
              <p className="text-gray-700 mb-6">
                It's not just about marks – it's about nurturing a mindset of curiosity, focus, and determination from a young age. With the right foundation, students don't just pass exams, they stand out as future achievers.
              </p>
            </div>
            
            <div className="md:w-1/3">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <div className="bg-red-700 text-white p-4">
                  <h3 className="text-xl font-bold">Program Details</h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FaCalendarAlt className="text-green-700 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-bold">1-4 Years (Class-dependent)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <FaUsers className="text-green-700 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Batch Size</p>
                      <p className="font-bold">Limited to 25 Students</p>
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
                      <p className="font-bold">Class 7-10 Students</p>
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

      {/* Program Features */}
      <section ref={addToRefs} className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-black-700">Program Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <FaBook className="text-2xl text-green-700" />
                </div>
                <h3 className="text-xl font-bold text-green-700">Comprehensive Curriculum</h3>
              </div>
              <p className="text-gray-700">
                Our curriculum covers all school subjects with special focus on Mathematics and Science, designed to build a strong foundation for future competitive exams.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <FaBrain className="text-2xl text-green-700" />
                </div>
                <h3 className="text-xl font-bold text-green-700">Conceptual Learning</h3>
              </div>
              <p className="text-gray-700">
                We focus on building strong concepts rather than rote learning, helping students understand the 'why' behind every 'what' they learn.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <FaLightbulb className="text-2xl text-green-700" />
                </div>
                <h3 className="text-xl font-bold text-green-700">Critical Thinking</h3>
              </div>
              <p className="text-gray-700">
                Our program develops analytical and problem-solving skills through specially designed exercises and activities that challenge young minds.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <FaTrophy className="text-2xl text-green-700" />
                </div>
                <h3 className="text-xl font-bold text-green-700">Olympiad Preparation</h3>
              </div>
              <p className="text-gray-700">
                Special modules to prepare students for various national and international Olympiads, enhancing their competitive edge.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <FaUsers className="text-2xl text-green-700" />
                </div>
                <h3 className="text-xl font-bold text-green-700">Personalized Attention</h3>
              </div>
              <p className="text-gray-700">
                Small batch sizes ensure that each student receives individual attention, with regular feedback and progress tracking.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <FaChalkboardTeacher className="text-2xl text-green-700" />
                </div>
                <h3 className="text-xl font-bold text-green-700">Expert Faculty</h3>
              </div>
              <p className="text-gray-700">
                Our teachers are specialists in nurturing young minds, with experience in both school education and competitive exam preparation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Class-wise Programs */}
      <section ref={addToRefs} className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-black-700">Class-wise Programs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
              <h3 className="text-xl font-bold mb-4 text-green-700">Class 7-8: Foundation Builder</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Focus on building strong basics in Mathematics and Science</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Introduction to logical reasoning and analytical thinking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Special modules for Mental Ability and Vedic Mathematics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Preparation for school exams and junior Olympiads</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
              <h3 className="text-xl font-bold mb-4 text-green-700">Class 9-10: Pre-Nurture Program</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Advanced concepts in Physics, Chemistry, Biology, and Mathematics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Early preparation for competitive exams like JEE, NEET, and MHT-CET</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Focus on board exam excellence alongside competitive exam readiness</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Career guidance and stream selection counseling</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section ref={addToRefs} className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-black-700">Success Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-16 flex items-center justify-center mb-4">
                <img src="/images/student-placeholder.jpg" alt="Student" className="w-16 h-16 rounded-full object-cover" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center text-green-700">Rahul Sharma</h3>
              <p className="text-gray-500 text-center mb-4">Class 10 Student</p>
              <p className="text-gray-700 text-center">
                "The Foundation program helped me secure 98% in my board exams and qualify for NTSE. The early preparation gave me a huge advantage."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-16 flex items-center justify-center mb-4">
                <img src="/images/student-placeholder.jpg" alt="Student" className="w-16 h-16 rounded-full object-cover" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center text-green-700">Priya Patel</h3>
              <p className="text-gray-500 text-center mb-4">Class 8 Student</p>
              <p className="text-gray-700 text-center">
                "I used to struggle with Mathematics, but after joining the Foundation program, I not only improved my grades but also won a medal in the Math Olympiad."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-16 flex items-center justify-center mb-4">
                <img src="/images/student-placeholder.jpg" alt="Student" className="w-16 h-16 rounded-full object-cover" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center text-green-700">Arjun Desai</h3>
              <p className="text-gray-500 text-center mb-4">Class 9 Student</p>
              <p className="text-gray-700 text-center">
                "The Pre-Nurture program has given me clarity about which stream to choose. The conceptual learning approach has made Science so much more interesting."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section ref={addToRefs} className="py-16 px-4 bg-gradient-to-r from-red-700 to-black text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Build a Strong Foundation for Your Child's Future</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Give your child the advantage of early preparation and conceptual learning with our Foundation Builder & Pre-Nurture programs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white hover:bg-gray-100 text-green-700 font-bold py-3 px-8 rounded-full transition duration-300">
              Enroll Now
            </Link>
            <Link to="/contact" className="bg-transparent hover:bg-white/10 text-white border-2 border-white font-bold py-3 px-8 rounded-full transition duration-300">
              Schedule a Counseling Session
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FoundationBuilderPage;