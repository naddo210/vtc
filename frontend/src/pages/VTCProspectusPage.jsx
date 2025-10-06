import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  FaGraduationCap, 
  FaUsers, 
  FaTrophy, 
  FaStar,
  FaBookOpen,
  FaChalkboardTeacher,
  FaLaptopCode,
  FaMicroscope,
  FaCalculator,
  FaFlask,
  FaHistory,
  FaGlobe,
  FaLanguage,
  FaAward,
  FaCertificate,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaChevronRight,
  FaCheck,
  FaPlay,
  FaDownload,
  FaCalendarAlt,
  FaClock,
  FaHandshake,
  FaLightbulb,
  FaUserTie,
  FaChartLine,
  FaDesktop,
  FaRupeeSign // This is the correct icon name
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const VTCProspectusPage = () => {
  const sectionRefs = useRef([]);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const coursesRef = useRef(null);
  const achievementsRef = useRef(null);
  const feeStructureRef = useRef(null);
  const contactRef = useRef(null);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
    // ScrollTrigger animations for each section
    sectionRefs.current.forEach((section, index) => {
      const elements = section.querySelectorAll('.animate-section');
      
      gsap.fromTo(elements, {
        y: 80,
        opacity: 0,
        scale: 0.9
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // Hero animation
    if (heroRef.current) {
      gsap.fromTo(heroRef.current.querySelector('.hero-content'), {
        scale: 0.8,
        opacity: 0,
        y: 100
      }, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.3)"
      });
    }

    // Stats counter animation
    if (statsRef.current) {
      const counters = statsRef.current.querySelectorAll('.counter');
      counters.forEach((counter, index) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const obj = { value: 0 };
        
        gsap.to(obj, {
          value: target,
          duration: 2,
          delay: index * 0.2,
          ease: "power2.out",
          onUpdate: () => {
            counter.textContent = Math.floor(obj.value);
          },
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            toggleActions: "play none none reset"
          }
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const features = [
    {
      icon: FaDesktop,
      title: "Smart Interactive Classrooms",
      description: "Advanced AV rooms with 3D animations and smart touch screen technology making learning fun and easy.",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: FaChalkboardTeacher,
      title: "Expert Faculty",
      description: "Learn from Engineers, Doctors & Teachers from best schools with years of experience.",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: FaUserTie,
      title: "Personalized Coaching",
      description: "Leading & lagging group system with one-to-one coaching for different learning abilities.",
      color: "from-red-500 to-pink-600"
    },
    {
      icon: FaLightbulb,
      title: "Doubt Solving Sessions",
      description: "Regular doubt clearing sessions to address and solve student queries effectively.",
      color: "from-yellow-500 to-orange-600"
    }
  ];

  const courses = [
    {
      title: "SSC (X) - English Medium",
      subjects: ["Mathematics", "Science & Technology", "Social Sciences", "English", "Hindi/Marathi"],
      regularFee: "₹30,000/-",
      specialFee: "₹40,000/-",
      icon: FaGraduationCap,
      color: "from-blue-600 to-purple-600"
    },
    {
      title: "SSC (X) - Marathi Medium", 
      subjects: ["गणित", "विज्ञान आणि तंत्रज्ञान", "सामाजिक शास्त्र", "मराठी", "हिंदी/इंग्रजी"],
      regularFee: "₹15,000/-",
      specialFee: "₹25,000/-",
      icon: FaLanguage,
      color: "from-green-600 to-teal-600"
    },
    {
      title: "Class IX",
      subjects: ["All Core Subjects", "Foundation Building", "Board Preparation"],
      regularFee: "₹25,000/-",
      specialFee: "₹12,500/-",
      icon: FaBookOpen,
      color: "from-orange-600 to-red-600"
    },
    {
      title: "Junior College Science",
      subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
      regularFee: "₹45,750/-",
      specialFee: "₹55,750/-",
      icon: FaMicroscope,
      color: "from-purple-600 to-pink-600"
    }
  ];

  const achievements = [
    {
      student: "Vaishnavil Senekar",
      school: "St. Xavier's High School",
      rank: "1st Rank (97.85%)",
      subjects: ["Mathematics: 100%", "Science: 100%"]
    },
    {
      student: "Sujal Sugadare", 
      school: "Little Flower High School",
      rank: "1st Rank (98%)",
      subjects: ["Mathematics: 100%", "Science: 100%"]
    },
    {
      student: "Vaishnavil Kitwadkar",
      school: "N.D. Bhuta High School", 
      rank: "1st Rank (96.66%)",
      subjects: ["Mathematics: 98.55%", "Science: 100%"]
    }
  ];

  return (
    <div className="overflow-x-hidden bg-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a365d] via-[#2d3748] to-[#1a202c] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="hero-content text-center max-w-5xl mx-auto">
            {/* VTC Logo Section */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-white rounded-full shadow-2xl mb-6">
                <div className="text-4xl font-black text-[#1a365d]">VTC</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                  VAIBHAV TUITION CLASSES
                </h1>
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-4">
                  "We Never Compromise With Quality"
                </div>
                <p className="text-xl sm:text-2xl text-blue-200 mb-8">
                  Premier Educational Center | 9 Years of Consistent Growth
                </p>
              </div>
            </div>

            {/* Motivational Quote */}
            <div className="bg-gradient-to-r from-red-600/90 to-red-700/90 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-red-400/30">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                "IF YOU CAN CHANGE YOUR MIND, YOU CAN CHANGE YOUR LIFE..."
              </h2>
              <div className="flex justify-center items-center space-x-4 text-sm sm:text-base">
                <span className="bg-white/20 px-3 py-1 rounded-full">I CAN'T DO IT</span>
                <FaChevronRight />
                <span className="bg-white/20 px-3 py-1 rounded-full">I'LL TRY</span>
                <FaChevronRight />
                <span className="bg-white/20 px-3 py-1 rounded-full">I CAN DO IT</span>
                <FaChevronRight />
                <span className="bg-green-500/80 px-3 py-1 rounded-full font-bold">YES, I DID IT!</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <span className="flex items-center">
                  <FaPlay className="mr-2" />
                  Start Your Journey
                </span>
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-[#1a365d] font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                <span className="flex items-center">
                  <FaDownload className="mr-2" />
                  Download Prospectus
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Director Profile Section */}
      <section ref={addToRefs} className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="animate-section grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gradient-to-r from-[#1a365d] to-blue-600 text-white p-8 rounded-3xl shadow-2xl">
                <h2 className="text-3xl sm:text-4xl font-black mb-6">Director Profile</h2>
                <div className="space-y-4 text-lg">
                  <p><strong>Founded:</strong> 2009 by Mr. Vaibhav Panchal</p>
                  <p><strong>Certification:</strong> Member of Maharashtra Classes Association</p>
                  <p><strong>Branches:</strong> Several branches in Andheri (E)</p>
                  <p><strong>Reputation:</strong> Best educational institutes in Andheri</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Mission</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                VAIBHAV TUITION CLASSES is the Premier Educational Center, founded with the vision of providing 
                quality education that transforms lives. Our excellent results have been possible only with 
                co-operation of our highly qualified, talented, experienced and dedicated team of Teachers.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                We believe in scoring marks and boosting the performance of students by using Advanced technology 
                in our Dynamic AV Rooms & Smart Interactive Classrooms.
              </p>
              <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
                <div className="flex items-center text-green-800 font-bold text-xl">
                  <FaTrophy className="mr-3 text-2xl" />
                  100% Results Guaranteed for 8 Years
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 sm:py-20 bg-gradient-to-r from-[#1a365d] to-blue-800 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="animate-section text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black mb-4">Our Achievements</h2>
            <p className="text-xl text-blue-200">Numbers that speak for our excellence</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: 500, suffix: "+", label: "Students Enrolled", icon: FaUsers },
              { number: 100, suffix: "%", label: "Pass Rate", icon: FaTrophy },
              { number: 8, suffix: "+", label: "Years Experience", icon: FaGraduationCap },
              { number: 29, suffix: "", label: "Students got 100% in Maths", icon: FaCalculator }
            ].map((stat, index) => (
              <div key={index} className="animate-section text-center">
                <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20 hover:scale-105 transition-all duration-300">
                  <stat.icon className="text-4xl mx-auto mb-4 text-yellow-400" />
                  <div className="text-4xl font-black mb-2">
                    <span className="counter" data-target={stat.number}>0</span>
                    <span>{stat.suffix}</span>
                  </div>
                  <p className="text-blue-200 font-semibold">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto">
          <div className="animate-section text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-6 bg-gradient-to-r from-[#1a365d] to-blue-600 bg-clip-text text-transparent">
              VTC Salient Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Exclusive facilities designed to provide the best learning experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="animate-section">
                <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-100 overflow-hidden">
                  <div className={`bg-gradient-to-r ${feature.color} p-6`}>
                    <feature.icon className="text-4xl text-white mx-auto" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Education Technology */}
      <section ref={addToRefs} className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-[#1a365d] to-blue-800 text-white">
        <div className="container mx-auto">
          <div className="animate-section text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-6 text-white">
              VTC Smart Education
            </h2>
            <p className="text-xl text-blue-200">
              Next Generation Teaching with Advanced Technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-section">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6 text-yellow-400">Dynamic AV Room Features</h3>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-center">
                    <FaCheck className="text-green-400 mr-3" />
                    Smart Touch Screen Interactive Board Technology
                  </li>
                  <li className="flex items-center">
                    <FaCheck className="text-green-400 mr-3" />
                    3D Animations on Big Screen
                  </li>
                  <li className="flex items-center">
                    <FaCheck className="text-green-400 mr-3" />
                    Advanced AV Room Technology at Lowest Fees
                  </li>
                  <li className="flex items-center">
                    <FaCheck className="text-green-400 mr-3" />
                    Tab Education System Available
                  </li>
                  <li className="flex items-center">
                    <FaCheck className="text-green-400 mr-3" />
                    Learning Management System
                  </li>
                </ul>
              </div>
            </div>
            <div className="animate-section">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold mb-6 text-yellow-400">Teaching Methodology</h3>
                <div className="space-y-4 text-lg">
                  <p>• Science experiments with animations</p>
                  <p>• History events visualization</p>
                  <p>• Geography maps interactive learning</p>
                  <p>• Mathematics graphs and constructions</p>
                  <p>• Language cartoon animations</p>
                  <p>• Audio-video memory techniques</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Structure */}
      <section ref={coursesRef} className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="animate-section text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-6 bg-gradient-to-r from-[#1a365d] to-blue-600 bg-clip-text text-transparent">
              Course Structure & Fees
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive programs for different academic levels
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <div key={index} className="animate-section">
                <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-100 overflow-hidden">
                  <div className={`bg-gradient-to-r ${course.color} p-6 text-white`}>
                    <div className="flex items-center">
                      <course.icon className="text-3xl mr-4" />
                      <h3 className="text-2xl font-bold">{course.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-6">
                      <h4 className="font-bold text-gray-800 mb-3">Subjects Covered:</h4>
                      <div className="flex flex-wrap gap-2">
                        {course.subjects.map((subject, idx) => (
                          <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-xl">
                        <p className="text-sm text-gray-600">Regular Batch</p>
                        <p className="text-xl font-bold text-blue-600">{course.regularFee}</p>
                      </div>
                      <div className="text-center p-4 bg-red-50 rounded-xl">
                        <p className="text-sm text-gray-600">Special Batch</p>
                        <p className="text-xl font-bold text-red-600">{course.specialFee}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Additional Fees */}
          <div className="animate-section mt-12 bg-yellow-50 p-8 rounded-3xl border border-yellow-200">
            <h3 className="text-2xl font-bold text-center text-yellow-800 mb-6">Additional Fees</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-white p-4 rounded-xl shadow">
                <p className="text-gray-600">Admission Fees</p>
                <p className="text-2xl font-bold text-yellow-600">₹1,000/-</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow">
                <p className="text-gray-600">Admission Form</p>
                <p className="text-2xl font-bold text-yellow-600">₹100/-</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow">
                <p className="text-gray-600">I-Card</p>
                <p className="text-2xl font-bold text-yellow-600">₹150/-</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Achievements */}
      <section ref={achievementsRef} className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
        <div className="container mx-auto">
          <div className="animate-section text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-6 text-white">
              Our School Toppers
            </h2>
            <p className="text-xl text-green-200">
              Students who achieved 1st rank in their respective schools
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="animate-section">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaTrophy className="text-2xl text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{achievement.student}</h3>
                    <p className="text-green-200">{achievement.school}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-yellow-400 mb-4">{achievement.rank}</div>
                    <div className="space-y-2">
                      {achievement.subjects.map((subject, idx) => (
                        <div key={idx} className="bg-white/20 px-3 py-1 rounded-full text-sm">
                          {subject}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Overall Stats */}
          <div className="animate-section mt-16 text-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-yellow-400 mb-6">Overall SSC Performance</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-white">256</div>
                  <p className="text-green-200">Students Appeared</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-white">256</div>
                  <p className="text-green-200">Students Passed</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-white">42</div>
                  <p className="text-green-200">Above 80%</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-white">8+</div>
                  <p className="text-green-200">Above 90%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SSC Special Features */}
      <section ref={addToRefs} className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto">
          <div className="animate-section text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-6 bg-gradient-to-r from-[#1a365d] to-blue-600 bg-clip-text text-transparent">
              SSC Special Batch Features
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive preparation for board examinations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "6 Sets of Prelim Exams",
                description: "Complete with hints & solutions for each exam",
                icon: FaBookOpen,
                color: "from-blue-500 to-purple-600"
              },
              {
                title: "5 Types of Test Series",
                description: "CTS, STS, RTS, MTS - Comprehensive evaluation",
                icon: FaChartLine,
                color: "from-green-500 to-emerald-600"
              },
              {
                title: "Board Pattern Papers",
                description: "Question papers & answer booklets as per board",
                icon: FaCertificate,
                color: "from-red-500 to-pink-600"
              },
              {
                title: "Hall Tickets Issued",
                description: "Complete SSC examination simulation",
                icon: FaAward,
                color: "from-yellow-500 to-orange-600"
              },
              {
                title: "Daily Study Schedule",
                description: "30 hours supervised study per week",
                icon: FaClock,
                color: "from-purple-500 to-indigo-600"
              },
              {
                title: "Till Last Day Teaching",
                description: "Unique feature - teaching until final exam",
                icon: FaGraduationCap,
                color: "from-teal-500 to-cyan-600"
              }
            ].map((feature, index) => (
              <div key={index} className="animate-section">
                <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-100 overflow-hidden">
                  <div className={`bg-gradient-to-r ${feature.color} p-6`}>
                    <feature.icon className="text-3xl text-white mx-auto" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section ref={addToRefs} className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
        <div className="container mx-auto">
          <div className="animate-section text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-6 text-white">
              Awards & Recognition
            </h2>
            <p className="text-xl text-yellow-100">
              We believe in recognizing and rewarding excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Board Exam Prizes */}
            <div className="animate-section">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-yellow-200 mb-6">HSC/SSC Board Prizes</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white/20 rounded-xl">
                    <span>1st Rank in Maharashtra</span>
                    <span className="font-bold">₹1,00,000/-</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/20 rounded-xl">
                    <span>2nd to 5th Rank Maharashtra</span>
                    <span className="font-bold">₹50,000/-</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/20 rounded-xl">
                    <span>School Topper (90%+ aggregate)</span>
                    <span className="font-bold">LAPTOP</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/20 rounded-xl">
                    <span>2nd & 3rd (85%+ aggregate)</span>
                    <span className="font-bold">MOBILE</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Subject-wise Prizes */}
            <div className="animate-section">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-yellow-200 mb-6">Subject-wise Prizes</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white/20 rounded-xl">
                    <span>100% in Maths or Science</span>
                    <span className="font-bold">₹5,000/-</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/20 rounded-xl">
                    <span>100% in Accounts & Maths</span>
                    <span className="font-bold">₹5,000/-</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/20 rounded-xl">
                    <span>95%+ in PCMB/PCM/PC</span>
                    <span className="font-bold">₹25,000/-</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/20 rounded-xl">
                    <span>JEE/NEET AIR 1st Rank</span>
                    <span className="font-bold">₹2,00,000/-</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section ref={contactRef} className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-r from-[#1a365d] to-blue-800 text-white">
        <div className="container mx-auto">
          <div className="animate-section text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-6 text-white">
              Contact Information
            </h2>
            <p className="text-xl text-blue-200">
              Ready to join VTC Classes? Get in touch with us today!
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div className="animate-section">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-yellow-400 mb-6">Head Branch</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-2xl text-red-400 mr-4 mt-1" />
                    <div>
                      <p className="text-lg font-semibold">Address:</p>
                      <p className="text-blue-200">Shop No 2 & 3, Ground Floor, Om Siddhivinayak Society, Azad Road, Gundavali Hill, Near Bhuta High School, Andheri (E), Mumbai - 400069</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaPhoneAlt className="text-2xl text-green-400 mr-4" />
                    <div>
                      <p className="text-lg font-semibold">Phone:</p>
                      <p className="text-blue-200">8652113289 / 9137556939</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="text-2xl text-purple-400 mr-4" />
                    <div>
                      <p className="text-lg font-semibold">Email:</p>
                      <p className="text-blue-200">vaibhavtuitionclasses@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* How to Apply */}
            <div className="animate-section">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-yellow-400 mb-6">How to Apply</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">1</span>
                    <p className="text-blue-200">Fill up the Admission form with desired course</p>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">2</span>
                    <p className="text-blue-200">Attach 2 recent photographs & marksheet xerox</p>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">3</span>
                    <p className="text-blue-200">Form signed by both student and parent</p>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">4</span>
                    <p className="text-blue-200">Submit form with fees payment</p>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">5</span>
                    <p className="text-blue-200">Submit cheques and collect receipt</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="animate-section text-center mt-16">
            <div className="bg-gradient-to-r from-red-600/90 to-red-700/90 backdrop-blur-sm rounded-3xl p-8 border border-red-400/30">
              <h3 className="text-3xl font-bold mb-6">Ready to Transform Your Future?</h3>
              <p className="text-xl text-red-100 mb-8">
                Join VTC Classes today and experience the difference quality education makes!
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="bg-white text-red-600 font-bold py-4 px-8 rounded-full hover:bg-red-50 transition-all duration-300 transform hover:scale-105">
                  <span className="flex items-center justify-center">
                    <FaPhoneAlt className="mr-2" />
                    Call Now: 8652113289
                  </span>
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-red-600 font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                  <span className="flex items-center justify-center">
                    <FaHandshake className="mr-2" />
                    Visit Our Center
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <div className="text-3xl font-black text-white mb-4">VTC CLASSES</div>
            <p className="text-gray-400">"We Never Compromise With Quality"</p>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400">
              © 2018 Vaibhav Tuition Classes. All rights reserved. | 
              <span className="text-yellow-400"> Prospectus 2018</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx="true">{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .floating-card {
          animation: float 3s ease-in-out infinite;
        }
        
        .hero-content {
          opacity: 0;
          transform: scale(0.8) translateY(100px);
        }
        
        @media (max-width: 768px) {
          .hero-content {
            transform: scale(0.9) translateY(50px);
          }
        }
      `}</style>
    </div>
  );
};

export default VTCProspectusPage;
