import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import axios from "axios";
import TestimonialSlider from "../components/TestimonialSlider";
import { 
  FaPhone, 
  FaImages, 
  FaArrowRight, 
  FaStar, 
  FaPlay, 
  FaUsers, 
  FaTrophy, 
  FaGraduationCap,
  FaRocket,
  FaCode,
  FaChartBar,
  FaBrain,
  FaFlask,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaClock,
  FaAward,
  FaLightbulb,
  FaHandshake,
  FaQuoteLeft,
  FaCheck,
  FaChevronRight,
  FaBookOpen,
  FaVideo,
  FaCertificate,
  FaLaptopCode,
  FaCalculator,
  FaAtom
} from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const sectionRefs = useRef([]);
  const logoRef = useRef(null);
  const heroRef = useRef(null);
  const heroTextRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const statsRef = useRef(null);
  const coursesRef = useRef(null);
  const specialProgramsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const contactRef = useRef(null);
  const ctaRef = useRef(null);
  
  const [testimonials, setTestimonials] = useState([]);
  const [carouselAds, setCarouselAds] = useState([]);
  
  // Fetch testimonials from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const testimonialResponse = await axios.get('https://vtct.onrender.com/api/testimonials');
        setTestimonials(testimonialResponse.data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };
    
    fetchData();
  }, []);
  
  // Fetch carousel ads from API
  useEffect(() => {
    const fetchCarouselAds = async () => {
      try {
        const response = await axios.get('https://vtct.onrender.com/api/carousel');
        if (response.data && response.data.length > 0) {
          setCarouselAds(response.data);
        }
      } catch (error) {
        console.error('Error fetching carousel ads:', error);
      }
    };
    
    fetchCarouselAds();
  }, []);
  
  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
    // ScrollTrigger for About Section
    if (sectionRefs.current[0]) {
      const aboutSection = sectionRefs.current[0];
      
      // About text from left
      gsap.fromTo(
        aboutSection.querySelector('.about-content'),
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutSection,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // About image from right
      gsap.fromTo(
        aboutSection.querySelector('.about-image'),
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutSection,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // About cards from top and bottom
      gsap.fromTo(
        aboutSection.querySelectorAll('.about-card'),
        { y: -50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: aboutSection,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // ScrollTrigger for Stats Section with Enhanced Counter Animation
    if (statsRef.current) {
      // Stats title animation
      gsap.fromTo(
        statsRef.current.querySelector('.stats-title'),
        { y: -80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Stats cards with staggered animation
      const statCards = statsRef.current.querySelectorAll('.stat-card');
      gsap.fromTo(
        statCards,
        { 
          y: 100, 
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Enhanced counter animation
      const statElements = statsRef.current.querySelectorAll('.stat-counter');
      statElements.forEach((statElement, index) => {
        const targetValue = parseInt(statElement.getAttribute('data-target'));
        const suffix = statElement.getAttribute('data-suffix') || '';
        
        const counterObj = { value: 0 };
        
        gsap.to(counterObj, {
          value: targetValue,
          duration: 2.5,
          delay: 0.5 + (index * 0.2),
          ease: "power2.out",
          onUpdate: function() {
            const currentValue = Math.floor(counterObj.value);
            if (targetValue >= 1000) {
              if (currentValue >= 1000) {
                const kValue = (currentValue / 1000).toFixed(currentValue % 1000 === 0 ? 0 : 1);
                statElement.textContent = kValue + 'K' + suffix;
              } else {
                statElement.textContent = currentValue + suffix;
              }
            } else {
              statElement.textContent = currentValue + suffix;
            }
          },
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 75%",
            toggleActions: "play none none reset"
          }
        });
      });
    }

    // ScrollTrigger for Courses Section
    if (coursesRef.current) {
      // Courses title
      gsap.fromTo(
        coursesRef.current.querySelector('.courses-title'),
        { y: -60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: coursesRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Course cards with alternating animation
      const courseCards = coursesRef.current.querySelectorAll('.course-card');
      courseCards.forEach((card, index) => {
        const isEven = index % 2 === 0;
        gsap.fromTo(
          card,
          { 
            x: isEven ? -120 : 120, 
            opacity: 0,
            rotationY: isEven ? -15 : 15
          },
          {
            x: 0,
            opacity: 1,
            rotationY: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }

    // ScrollTrigger for Special Programs
    if (specialProgramsRef.current) {
      // Programs title
      gsap.fromTo(
        specialProgramsRef.current.querySelector('.programs-title'),
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: specialProgramsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Program cards from left and right
      const programCards = specialProgramsRef.current.querySelectorAll('.program-card');
      programCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { 
            x: index === 0 ? -150 : 150, 
            opacity: 0,
            scale: 0.9
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }



    // ScrollTrigger for Testimonials
    if (testimonialsRef.current) {
      gsap.fromTo(
        testimonialsRef.current.querySelector('.testimonials-title'),
        { scale: 0.5, opacity: 0, rotation: -10 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.3)",
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate testimonials container
      gsap.fromTo(
        testimonialsRef.current.querySelector('.testimonials-container'),
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // ScrollTrigger for Contact Section
    if (contactRef.current) {
      // Contact title
      gsap.fromTo(
        contactRef.current.querySelector('.contact-title'),
        { y: -60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Contact cards with staggered animation
      const contactCards = contactRef.current.querySelectorAll('.contact-card');
      contactCards.forEach((card, index) => {
        let fromX = 0;
        if (index === 0) fromX = -120; // from left
        else if (index === 1) fromX = 0; // from center (no movement)
        else if (index === 2) fromX = 120; // from right

        gsap.fromTo(
          card,
          { 
            x: fromX, 
            y: index === 1 ? -80 : 0, // middle card from top
            opacity: 0,
            scale: 0.8
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: index * 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Contact CTA buttons
      gsap.fromTo(
        contactRef.current.querySelector('.contact-cta'),
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "bounce.out",
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // ScrollTrigger for Final CTA Section
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current.querySelector('.final-cta-content'),
        { 
          scale: 0.8, 
          opacity: 0,
          y: 60
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.3)",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Enhanced course data
  const courses = [
    {
      icon: FaFlask,
      title: "NEET",
      subtitle: "Physics • Chemistry • Biology",
      description: "The First Step Towards Your Dream of Becoming a Doctor. Prepare for the National Eligibility cum Entrance Test with expert guidance.",
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "/courses/neet",
      color: "from-green-600 to-teal-600",
      duration: "2 Years",
      level: "Class 11-12",
      projects: "Regular Tests",
      price: "Contact for Details"
    },
    {
      icon: FaCalculator,
      title: "JEE",
      subtitle: "Physics • Chemistry • Mathematics",
      description: "Your Gateway to India's Top Engineering Colleges. Comprehensive preparation for JEE Main and Advanced examinations.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "/courses/jee",
      color: "from-blue-600 to-indigo-600",
      duration: "2 Years",
      level: "Class 11-12",
      projects: "Regular Tests",
      price: "Contact for Details"
    },
    {
      icon: FaAtom,
      title: "MHT-CET",
      subtitle: "Physics • Chemistry • Mathematics/Biology",
      description: "Your Ticket to Maharashtra's Top Colleges. Specialized preparation for Maharashtra Common Entrance Test.",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "/courses/mht-cet",
      color: "from-purple-600 to-pink-600",
      duration: "1-2 Years",
      level: "Class 11-12",
      projects: "Regular Tests",
      price: "Contact for Details"
    },
    {
      icon: FaGraduationCap,
      title: "Foundation Builder & Pre-Nurture",
      subtitle: "Mathematics • Science • Logic",
      description: "The First Step Towards Big Dreams. Early preparation for competitive exams while building strong fundamentals.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "/courses/foundation-builder",
      color: "from-amber-500 to-orange-600",
      duration: "1-4 Years",
      level: "Class 7-10",
      projects: "Regular Tests",
      price: "Contact for Details"
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
     <section className="relative h-screen overflow-hidden">
  <Swiper
    spaceBetween={0}
    centeredSlides={true}
    effect="fade"
    loop={true}
    autoplay={{
      delay: 6000,
      disableOnInteraction: false,
    }}
    pagination={{
      clickable: true,
      bulletActiveClass: 'swiper-pagination-bullet-active bg-white',
      bulletClass: 'swiper-pagination-bullet bg-white bg-opacity-50'
    }}
    navigation={false}
    modules={[Autoplay, Pagination, Navigation, EffectFade]}
    className="h-full hero-swiper"
  >
    {carouselAds && carouselAds.length > 0 ? (
      carouselAds.map((ad) => (
        <SwiperSlide key={ad._id}>
          <div 
            className="h-full relative flex items-center justify-center text-white overflow-hidden"
            style={{
              backgroundImage: `url("${ad.imageUrl}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              imageRendering: 'high-quality'
            }}
          >
            {/* ✅ Updated overlay with less color and better visibility */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-[#cb1517]/25 to-red-900/35"></div>
            
            <div ref={heroTextRef} className="text-center px-4 sm:px-6 lg:px-10 z-10 max-w-4xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-white via-red-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                {ad.title}
              </h1>
              {ad.description && (
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-red-100 font-light px-2">
                  {ad.description}
                </p>
              )}
              {ad.link && (
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                  <Link
                    to={ad.link}
                    className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl w-full sm:w-auto"
                  >
                    <span className="flex items-center justify-center">
                      <FaRocket className="mr-2" />
                      Learn More
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </SwiperSlide>
      ))
    ) : (
      <SwiperSlide>
        <div 
          className="h-full relative flex items-center justify-center text-white overflow-hidden"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* ✅ Updated overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/50"></div>

          <div ref={heroTextRef} className="text-center px-4 sm:px-6 lg:px-10 z-10 max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-white via-red-200 to-pink-200 bg-clip-text text-transparent leading-tight">
              Unlock Your True Potential
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-red-100 font-light px-2">
              Step into success with VTC SMART CLASS — join thousands who've accelerated their careers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <button className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl w-full sm:w-auto">
                <span className="flex items-center justify-center">
                  <FaRocket className="mr-2" />
                  Start Your Journey
                </span>
              </button>
            </div>
          </div>
        </div>
      </SwiperSlide>
    )}
  </Swiper>
</section>


      
  

      {/* About Section */}
      <section 
        ref={addToRefs} 
        className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="about-content order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-[#cb1517] to-red-600 bg-clip-text text-transparent leading-tight">
                About VTC SMART CLASS
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                For over a decade, VTC SMART CLASS has been at the
forefront of educational excellence, transforming
careers and shaping the future of technology through
innovative learning approaches.
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8">
                Our mission is to bridge the gap between academic
knowledge and industry requirements, ensuring our
students are not just job-ready, but future-ready leaders
in their fields.
              </p>
              <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="about-card text-center p-3 sm:p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <FaAward className="text-2xl sm:text-3xl text-[#cb1517] mx-auto mb-2" />
                  <h4 className="font-bold text-gray-800 text-sm sm:text-base">Industry Certified</h4>
                </div>
                <div className="about-card text-center p-3 sm:p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <FaLightbulb className="text-2xl sm:text-3xl text-red-600 mx-auto mb-2" />
                  <h4 className="font-bold text-gray-800 text-sm sm:text-base">Innovation Focused</h4>
                </div>
              </div>
              <Link 
                to="/about" 
                className="inline-flex items-center bg-gradient-to-r from-[#cb1517] to-red-600 text-white font-bold py-3 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 w-full sm:w-auto justify-center group"
              >
                Learn More <FaChevronRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="about-image order-1 lg:order-2">
              <img 
                src="/h5.jpg" 
                alt="Students learning" 
                className="w-full rounded-2xl sm:rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section ref={statsRef} className="py-16 sm:py-20 bg-gradient-to-br from-[#cb1517] via-red-700 to-red-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="stats-title text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black mb-4 sm:mb-6 text-white">
              Our Impact in Numbers
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-purple-200 max-w-3xl mx-auto px-2">
              Join a thriving community of successful learners and industry professionals
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center px-2 sm:px-4">
            {[
              { icon: FaUsers, number: 10000, suffix: "+", label: "Happy Students", color: "from-cyan-400 to-blue-500" },
              { icon: FaGraduationCap, number: 98, suffix: "%", label: "Success Rate", color: "from-green-400 to-emerald-500" },
              { icon: FaTrophy, number: 50, suffix: "+", label: "Industry Awards", color: "from-yellow-400 to-orange-500" },
              { icon: FaRocket, number: 500, suffix: "+", label: "Career Transitions", color: "from-pink-400 to-red-500" }
            ].map((stat, index) => (
              <div key={index} className="stat-card group">
                <div className="bg-white/10 backdrop-blur-lg p-4 sm:p-6 lg:p-8 rounded-3xl border border-white/20 transform transition-all duration-500 hover:scale-105 hover:bg-white/20">
                  <div className={`bg-gradient-to-r ${stat.color} p-3 sm:p-4 lg:p-6 rounded-2xl inline-flex mb-3 sm:mb-4 lg:mb-6 group-hover:scale-110 transition-all duration-300 shadow-2xl`}>
                    <stat.icon className="text-2xl sm:text-3xl lg:text-4xl text-white" />
                  </div>
                  
                  <div className="mb-3 sm:mb-4">
                    <div className="text-3xl sm:text-4xl lg:text-6xl font-black mb-1 sm:mb-2 text-white">
                      <span 
                        className="stat-counter" 
                        data-target={stat.number}
                        data-suffix={stat.suffix}
                      >
                        0{stat.suffix}
                      </span>
                    </div>
                    <p className="text-red-200 font-semibold text-base sm:text-lg">{stat.label}</p>
                  </div>
                  
                  <div className="w-full bg-white/20 rounded-full h-2 sm:h-3 overflow-hidden">
                    <div 
                      className={`bg-gradient-to-r ${stat.color} h-full rounded-full transform origin-left scale-x-0`}
                      style={{
                        animation: `progressBar 2s ease-out ${index * 0.3 + 1}s forwards`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section 
        ref={coursesRef}
        className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="container mx-auto">
          <div className="courses-title text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-[#cb1517] to-red-600 bg-clip-text text-transparent leading-tight">
              Featured Courses
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
              Transform your career with industry-leading programs designed by experts
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {courses.map((course, index) => (
              <div key={index} className="course-card group">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-700 hover:scale-[1.02] hover:shadow-3xl border border-gray-100 group-hover:border-purple-200">
                  <div className="relative h-64 sm:h-72 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                      style={{ backgroundImage: `url(${course.image})` }}
                    ></div>
                    
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                    
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200">
                      <span className="text-gray-800 font-bold text-lg">{course.price}</span>
                    </div>
                    
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 group-hover:scale-110 transition-all duration-300">
                      <course.icon className="text-3xl text-[#cb1517]" />
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                      <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">{course.title}</h3>
                      <p className="text-white/90 font-medium">{course.subtitle}</p>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">{course.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="flex items-center bg-gray-50 rounded-xl p-3 group-hover:bg-purple-50 transition-all duration-300">
                        <FaClock className="text-[#cb1517] mr-3" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Duration</p>
                          <p className="font-bold text-gray-800">{course.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center bg-gray-50 rounded-xl p-3 group-hover:bg-red-50 transition-all duration-300">
                        <FaGraduationCap className="text-red-600 mr-3" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Level</p>
                          <p className="font-bold text-gray-800">{course.level}</p>
                        </div>
                      </div>
                      <div className="flex items-center bg-gray-50 rounded-xl p-3 group-hover:bg-red-50 transition-all duration-300">
                        <FaLaptopCode className="text-emerald-600 mr-3" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Projects</p>
                          <p className="font-bold text-gray-800">{course.projects}</p>
                        </div>
                      </div>
                      <div className="flex items-center bg-gray-50 rounded-xl p-3 group-hover:bg-red-50 transition-all duration-300">
                        <FaCertificate className="text-yellow-600 mr-3" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Certificate</p>
                          <p className="font-bold text-gray-800">Included</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link 
                        to={course.link} 
                        className={`flex-1 bg-gradient-to-r ${course.color} text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-center inline-flex items-center justify-center group`}
                      >
                        Explore Course
                        <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                     
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Programs Section */}
      <section 
        ref={specialProgramsRef}
        className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="container mx-auto">
          <div className="programs-title text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-[#cb1517] to-red-600 bg-clip-text text-transparent leading-tight">
              Special Programs
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Exclusive programs designed for ambitious professionals and future leaders
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="program-card">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500 border border-gray-100">
                <div 
                  className="relative h-48 sm:h-56 overflow-hidden"
                  style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      ELITE PROGRAM
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">Super 7 Elite Batch</h3>
                    <p className="text-white/90">Limited Seats - Premium Experience</p>
                  </div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
                    Our flagship accelerated program combining multiple tech stacks with intensive mentorship, 
                    real-world projects, and guaranteed career placement support.
                  </p>
                  <ul className="space-y-3 mb-8 text-gray-700">
                    <li className="flex items-center text-sm sm:text-base">
                      <div className="bg-green-100 p-1 rounded-full mr-3">
                        <FaCheck className="text-green-600 text-xs" />
                      </div>
                      7 cutting-edge technologies in 7 months
                    </li>
                    <li className="flex items-center text-sm sm:text-base">
                      <div className="bg-green-100 p-1 rounded-full mr-3">
                        <FaCheck className="text-green-600 text-xs" />
                      </div>
                      1:1 industry mentor assignment
                    </li>
                    <li className="flex items-center text-sm sm:text-base">
                      <div className="bg-green-100 p-1 rounded-full mr-3">
                        <FaCheck className="text-green-600 text-xs" />
                      </div>
                      Guaranteed job placement support
                    </li>
                  </ul>
                  <Link 
                    to="/programs/super-7"
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 sm:py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base inline-flex items-center justify-center group"
                  >
                    Apply for Super 7 Batch
                    <FaChevronRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="program-card">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500 border border-gray-100">
                <div 
                  className="relative h-48 sm:h-56 overflow-hidden"
                  style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      BIOTECH PROGRAM
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">Bio Vaccine Program</h3>
                    <p className="text-white/90">Cutting-edge Biotechnology</p>
                  </div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
                    Pioneer program in biotechnology and vaccine development, featuring state-of-the-art lab 
                    facilities and collaboration with leading pharmaceutical companies.
                  </p>
                  <ul className="space-y-3 mb-8 text-gray-700">
                    <li className="flex items-center text-sm sm:text-base">
                      <div className="bg-green-100 p-1 rounded-full mr-3">
                        <FaCheck className="text-green-600 text-xs" />
                      </div>
                      Advanced biotech lab access
                    </li>
                    <li className="flex items-center text-sm sm:text-base">
                      <div className="bg-green-100 p-1 rounded-full mr-3">
                        <FaCheck className="text-green-600 text-xs" />
                      </div>
                      Industry research projects
                    </li>
                    <li className="flex items-center text-sm sm:text-base">
                      <div className="bg-green-100 p-1 rounded-full mr-3">
                        <FaCheck className="text-green-600 text-xs" />
                      </div>
                      Pharmaceutical partnerships
                    </li>
                  </ul>
                  <Link 
                    to="/programs/bio-vaccine"
                    className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-3 sm:py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base inline-flex items-center justify-center group"
                  >
                    Explore Bio Program
                    <FaChevronRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}


      {/* Testimonials */}
      <section 
        ref={testimonialsRef}
        className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="container mx-auto">
          <div className="testimonials-title text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent leading-tight">
              What Our Students Say
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Hear from our students about their transformative learning experiences
            </p>
          </div>
          
          {/* Image Testimonial Slider */}
          <div className="mb-12">
            <TestimonialSlider />
          </div>
          
          <div className="testimonials-container">
            {testimonials.length === 0 ? (
              <div className="text-center py-10">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="rounded-full bg-slate-200 h-16 w-16 mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                </div>
              </div>
            ) : (
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                  bulletActiveClass: 'swiper-pagination-bullet-active-purple',
                  bulletClass: 'swiper-pagination-bullet-gray'
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="testimonial-swiper pb-16"
                effect="coverflow"
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                breakpoints={{
                  320: { slidesPerView: 1, spaceBetween: 20 },
                  640: { slidesPerView: 1, spaceBetween: 20 },
                  768: { slidesPerView: 2, spaceBetween: 30 },
                  1024: { slidesPerView: 3, spaceBetween: 40 },
                }}
              >
                {testimonials.map((testimonial) => (
                  !testimonial.isImageOnly && (
                    <SwiperSlide key={testimonial._id}>
                      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100 h-full transform transition-all duration-500 hover:scale-105 hover:border-purple-200">
                        <div className="flex justify-center mb-6">
                          <div className="relative">
                            <img 
                              src={testimonial.image.startsWith('/uploads/') ? `/api${testimonial.image}` : testimonial.image} 
                              alt={testimonial.name}
                              className="w-20 h-20 rounded-full shadow-lg object-cover border-4 border-purple-100"
                            />
                            <div className="absolute -bottom-2 -right-2 bg-purple-600 rounded-full p-1">
                              <FaQuoteLeft className="text-white text-sm" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-center mb-4">
                          <h4 className="font-bold text-gray-800 text-lg">{testimonial.name}</h4>
                          <p className="text-gray-600 text-sm">{testimonial.role} at {testimonial.company}</p>
                          <div className="flex items-center justify-center mt-2">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <FaStar key={i} className="text-yellow-400 w-4 h-4 mx-0.5" />
                            ))}
                          </div>
                        </div>
                        
                        <p className="text-gray-700 text-center leading-relaxed italic bg-purple-50 p-4 rounded-xl">
                          "{testimonial.text}"
                        </p>
                      </div>
                    </SwiperSlide>
                  )
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        ref={contactRef}
        className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-gradient-to-r from-gray-900 to-black text-white"
      >
        <div className="container mx-auto">
          <div className="contact-title text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-white via-purple-200 to-red-200 bg-clip-text text-transparent leading-tight">
              Get In Touch
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto px-4">
              Ready to start your journey? Contact us today for personalized guidance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {[
              {
                icon: FaPhone,
                title: "Call Us",
                info: "+91 7077071737",
                subInfo: "Mon-Sat 9AM-7PM"
              },
              {
                icon: FaEnvelope,
                title: "Email Us",
                info: "vtcsmartclass@gmail.com",
                subInfo: "We reply within 24 hours"
              },
              {
                icon: FaMapMarkerAlt,
                title: "Visit Us",
                info: "Vile Parle (E), Mumbai - 400 057",
                subInfo: "Andheri (E), Mumbai"
              }
            ].map((contact, index) => (
              <div key={index} className="contact-card text-center">
                <div className="bg-gradient-to-br from-[#663399] to-purple-800 p-6 sm:p-8 rounded-2xl sm:rounded-3xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <contact.icon className="text-3xl sm:text-4xl text-purple-200 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{contact.title}</h3>
                  <p className="text-purple-100 text-base sm:text-lg">{contact.info}</p>
                  <p className="text-purple-300 text-sm">{contact.subInfo}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="contact-cta text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/contact" 
                className="inline-flex items-center bg-gradient-to-r from-[#663399] to-red-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl w-full sm:w-auto justify-center group"
              >
                <FaHandshake className="mr-2" />
                Get Free Consultation
                <FaChevronRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a 
                href="tel:+917077071737" 
                className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-black font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 w-full sm:w-auto justify-center"
              >
                <FaPhone className="mr-2" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section 
        ref={ctaRef}
        className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-gradient-to-r from-[#663399] via-purple-700 to-red-600 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full opacity-10"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full opacity-10"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full opacity-5"></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="final-cta-content max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 text-white leading-tight">
              Ready to Transform Your Future?
            </h2>
            <p className="text-base sm:text-lg lg:text-2xl mb-8 sm:mb-12 text-red-100 max-w-3xl mx-auto leading-relaxed px-4">
              Join thousands of successful students who have accelerated their careers with our cutting-edge programs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <Link 
                to="/courses" 
                className="group bg-white text-[#cb1517] font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-2xl w-full sm:w-auto"
              >
                <span className="flex items-center justify-center text-base sm:text-lg">
                  <FaRocket className="mr-3" />
                  Start Your Journey
                </span>
              </Link>
              <Link 
                to="/contact" 
                className="group border-2 border-white text-white hover:bg-white hover:text-[#663399] font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-full transition-all duration-300 transform hover:scale-110 w-full sm:w-auto"
              >
                <span className="flex items-center justify-center text-base sm:text-lg">
                  <FaPhone className="mr-3" />
                  Get Free Consultation
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-4 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-8 flex flex-col space-y-3 sm:space-y-4 z-40">
        <a 
          href="tel:+917710048831" 
          className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white p-3 sm:p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110"
        >
          <FaPhone size={20} className="sm:w-6 sm:h-6" />
        </a>
        <Link 
          to="/gallery" 
          className="group bg-gradient-to-r from-[#663399] to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-3 sm:p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110"
        >
          <FaImages size={20} className="sm:w-6 sm:h-6" />
        </Link>
      </div>

      {/* Custom Styles */}
      <style jsx="true">{`
        @keyframes progressBar {
          to {
            transform: scaleX(1);
          }
        }

        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          color: white;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 50%;
          width: 40px;
          height: 40px;
        }

        @media (min-width: 768px) {
          .hero-swiper .swiper-button-next,
          .hero-swiper .swiper-button-prev {
            width: 50px;
            height: 50px;
          }
        }
        
        .hero-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          margin: 0 4px;
        }

        @media (min-width: 640px) {
          .hero-swiper .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
            margin: 0 6px;
          }
        }
        
        .testimonial-swiper .swiper-pagination-bullet-gray {
          width: 8px;
          height: 8px;
          margin: 0 3px;
          background-color: #d1d5db;
        }
        
        .testimonial-swiper .swiper-pagination-bullet-active-purple {
          background-color: #9333ea;
        }

        @media (min-width: 640px) {
          .testimonial-swiper .swiper-pagination-bullet-gray {
            width: 10px;
            height: 10px;
            margin: 0 4px;
          }
        }
        
        .stat-counter {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        @media (max-width: 767px) {
          .hero-swiper .swiper-button-next,
          .hero-swiper .swiper-button-prev {
            display: none !important;
          }

          .testimonial-swiper {
            touch-action: pan-y;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
