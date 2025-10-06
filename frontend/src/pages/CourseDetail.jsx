import React, { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCalendarAlt, FaUserGraduate, FaChalkboardTeacher, FaCertificate } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const CourseDetail = () => {
  const { courseId } = useParams();
  const sectionRefs = useRef([]);
  
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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Course data
  const coursesData = {
    "web-development": {
      title: "Web Development",
      description: "Master modern web development with HTML, CSS, JavaScript, React, Node.js, and more. This comprehensive course covers both frontend and backend technologies, preparing you for a career as a full-stack developer.",
      image: "https://via.placeholder.com/1200x600",
      duration: "6 months",
      level: "Beginner to Advanced",
      instructor: "John Doe",
      price: "$999",
      curriculum: [
        "HTML5, CSS3, and Responsive Design",
        "JavaScript Fundamentals and ES6+",
        "React.js and State Management",
        "Node.js and Express",
        "MongoDB and Database Design",
        "RESTful API Development",
        "Authentication and Security",
        "Deployment and DevOps Basics"
      ],
      images: [
        "https://via.placeholder.com/600x400",
        "https://via.placeholder.com/600x400",
        "https://via.placeholder.com/600x400",
        "https://via.placeholder.com/600x400"
      ]
    },
    "data-science": {
      title: "Data Science",
      description: "Learn data analysis, visualization, machine learning, and statistical modeling. This course equips you with the skills to extract insights from complex datasets and make data-driven decisions.",
      image: "https://via.placeholder.com/1200x600",
      duration: "8 months",
      level: "Intermediate",
      instructor: "Jane Smith",
      price: "$1299",
      curriculum: [
        "Python for Data Science",
        "Data Cleaning and Preprocessing",
        "Exploratory Data Analysis",
        "Statistical Analysis and Hypothesis Testing",
        "Machine Learning Algorithms",
        "Deep Learning Fundamentals",
        "Data Visualization with Matplotlib and Tableau",
        "Big Data Technologies"
      ],
      images: [
        "https://via.placeholder.com/600x400",
        "https://via.placeholder.com/600x400",
        "https://via.placeholder.com/600x400",
        "https://via.placeholder.com/600x400"
      ]
    },
    "ai-ml": {
      title: "AI & Machine Learning",
      description: "Dive deep into artificial intelligence, neural networks, and advanced machine learning algorithms. This course covers cutting-edge AI technologies and their practical applications.",
      image: "https://via.placeholder.com/1200x600",
      duration: "10 months",
      level: "Advanced",
      instructor: "Dr. Robert Chen",
      price: "$1599",
      curriculum: [
        "Machine Learning Foundations",
        "Neural Networks and Deep Learning",
        "Computer Vision",
        "Natural Language Processing",
        "Reinforcement Learning",
        "Generative Adversarial Networks",
        "AI Ethics and Responsible AI",
        "AI Project Development and Deployment"
      ],
      images: [
        "https://via.placeholder.com/600x400",
        "https://via.placeholder.com/600x400",
        "https://via.placeholder.com/600x400",
        "https://via.placeholder.com/600x400"
      ]
    },
    "bio-vaccine": {
      title: "Bio Vaccine",
      description: "Explore biotechnology and vaccine development with hands-on laboratory experience. This specialized course covers the science behind vaccines and the biotechnology industry.",
      image: "https://via.placeholder.com/1200x600",
      duration: "12 months",
      level: "Advanced",
      instructor: "Dr. Sarah Johnson",
      price: "$1899",
      curriculum: [
        "Molecular Biology Fundamentals",
        "Immunology and Immune Response",
        "Vaccine Development Process",
        "Clinical Trials and Regulatory Affairs",
        "Bioinformatics for Vaccine Research",
        "Manufacturing and Quality Control",
        "Emerging Technologies in Vaccine Development",
        "Biotechnology Industry Practices"
      ],
      images: [
        "https://via.placeholder.com/600x400",
        "https://via.placeholder.com/600x400",
        "https://via.placeholder.com/600x400",
        "https://via.placeholder.com/600x400"
      ]
    }
  };

  const course = coursesData[courseId];

  if (!course) {
    return (
      <div className="pt-24 pb-16 text-center">
        <h2 className="text-3xl font-bold text-[#663399]">Course not found</h2>
        <p className="mt-4">The course you're looking for doesn't exist.</p>
        <Link to="/courses" className="mt-6 inline-block bg-[#663399] text-white px-6 py-2 rounded-full">
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-16 bg-white">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-[#663399] opacity-80"></div>
        <div className="relative h-96 flex items-center justify-center">
          <img 
            src={course.image} 
            alt={course.title} 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4">{course.title}</h1>
            <p className="text-xl max-w-3xl mx-auto">{course.description.split('.')[0]}.</p>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section ref={addToRefs} className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 md:pr-8">
              <h2 className="text-3xl font-bold mb-6 text-[#663399]">Course Overview</h2>
              <p className="text-gray-700 mb-6">{course.description}</p>
              
              <h3 className="text-2xl font-bold mb-4 text-[#663399]">What You'll Learn</h3>
              <ul className="space-y-2 mb-8">
                {course.curriculum.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="md:w-1/3 bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4 text-[#663399]">Course Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-red-600 mr-3" />
                    <div>
                      <p className="font-semibold">Duration</p>
                      <p className="text-gray-600">{course.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaUserGraduate className="text-red-600 mr-3" />
                    <div>
                      <p className="font-semibold">Level</p>
                      <p className="text-gray-600">{course.level}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaChalkboardTeacher className="text-red-600 mr-3" />
                    <div>
                      <p className="font-semibold">Instructor</p>
                      <p className="text-gray-600">{course.instructor}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaCertificate className="text-red-600 mr-3" />
                    <div>
                      <p className="font-semibold">Certification</p>
                      <p className="text-gray-600">Industry-recognized certificate</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-3xl font-bold text-[#663399] mb-4">{course.price}</p>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 mb-3">
                  Enroll Now
                </button>
                <button className="w-full bg-[#663399] hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-full transition duration-300">
                  Download Syllabus
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Gallery */}
      <section ref={addToRefs} className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-[#663399]">Course Gallery</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {course.images.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-md">
                <img 
                  src={image} 
                  alt={`${course.title} - Image ${index + 1}`} 
                  className="w-full h-64 object-cover transform transition duration-500 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={addToRefs} className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-[#663399]">What Our Students Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#663399] rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  A
                </div>
                <div>
                  <h4 className="font-bold">Alex Johnson</h4>
                  <p className="text-gray-600 text-sm">Software Engineer at Google</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "This course completely transformed my career. The hands-on projects and personalized mentorship gave me the skills and confidence to land my dream job."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  M
                </div>
                <div>
                  <h4 className="font-bold">Maria Garcia</h4>
                  <p className="text-gray-600 text-sm">Data Scientist at Amazon</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The curriculum is incredibly well-designed and up-to-date with industry standards. The instructors are experts in their fields and truly care about student success."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section ref={addToRefs} className="py-16 px-4 bg-gradient-to-r from-[#663399] to-black text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of successful graduates who have launched their careers with our industry-leading courses.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition duration-300">
              Enroll Now
            </button>
            <Link to="/contact" className="bg-white hover:bg-gray-100 text-[#663399] font-bold py-3 px-8 rounded-full transition duration-300">
              Contact an Advisor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetail;