import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaBriefcase, FaGraduationCap, FaUsers, FaArrowRight } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const CareersPage = () => {
  const sectionRefs = useRef([]);
  const [visibleJobs, setVisibleJobs] = useState([]);
  
  // Add to refs array
  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Career opportunities data
  const jobs = [
    {
      id: "instructor",
      title: "Course Instructor",
      department: "Education",
      location: "Multiple Locations",
      type: "Full-time",
      description: "Join our team of expert instructors to deliver high-quality education in web development, data science, or AI & ML.",
      requirements: [
        "Master's degree or higher in relevant field",
        "Minimum 3 years of industry experience",
        "Previous teaching experience preferred",
        "Excellent communication skills"
      ]
    },
    {
      id: "researcher",
      title: "Research Associate",
      department: "Bio Vaccine Research",
      location: "Main Campus",
      type: "Full-time",
      description: "Contribute to groundbreaking research in biotechnology and vaccine development.",
      requirements: [
        "PhD in Biotechnology, Microbiology, or related field",
        "Experience with laboratory techniques",
        "Publication record in peer-reviewed journals",
        "Grant writing experience a plus"
      ]
    },
    {
      id: "counselor",
      title: "Career Counselor",
      department: "Student Services",
      location: "All Campuses",
      type: "Full-time/Part-time",
      description: "Guide students in their career development journey and help them achieve their professional goals.",
      requirements: [
        "Degree in Psychology, Education, or related field",
        "Experience in career counseling or coaching",
        "Knowledge of tech industry job market",
        "Strong interpersonal skills"
      ]
    },
    {
      id: "marketing",
      title: "Digital Marketing Specialist",
      department: "Marketing",
      location: "Head Office",
      type: "Full-time",
      description: "Develop and implement digital marketing strategies to promote our courses and programs.",
      requirements: [
        "Bachelor's degree in Marketing or related field",
        "2+ years of experience in digital marketing",
        "Proficiency in SEO, SEM, and social media marketing",
        "Analytics and data-driven approach"
      ]
    }
  ];

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

    // Staggered animation for job listings
    setTimeout(() => {
      const jobIds = jobs.map(job => job.id);
      const interval = setInterval(() => {
        setVisibleJobs(prev => {
          if (prev.length < jobIds.length) {
            return [...prev, jobIds[prev.length]];
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

  return (
    <div className="pt-16 bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-[#663399] text-white py-20 hero-section">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Careers at VTC Classes</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Join our team of passionate educators and professionals dedicated to transforming lives through quality education.
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section ref={addToRefs} className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-[#663399]">Why Join VTC Classes?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-[#663399] rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                <FaGraduationCap />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#663399]">Continuous Learning</h3>
              <p className="text-gray-700">
                We invest in our team's growth with regular training, workshops, and opportunities to learn cutting-edge technologies.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                <FaUsers />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#663399]">Collaborative Culture</h3>
              <p className="text-gray-700">
                Work in a supportive environment where teamwork, innovation, and open communication are valued.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-[#663399] rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                <FaBriefcase />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#663399]">Career Growth</h3>
              <p className="text-gray-700">
                Clear career progression paths with opportunities to take on new challenges and leadership roles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section ref={addToRefs} className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-[#663399]">Current Openings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {jobs.map((job) => (
              <div 
                key={job.id}
                className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 border-l-4 border-[#663399] ${
                  visibleJobs.includes(job.id) 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-20"
                }`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-[#663399]">{job.title}</h3>
                    <span className="bg-purple-100 text-[#663399] text-sm font-semibold px-3 py-1 rounded-full">
                      {job.type}
                    </span>
                  </div>
                  <div className="mb-4">
                    <p className="text-gray-600">{job.department} | {job.location}</p>
                  </div>
                  <p className="text-gray-700 mb-4">{job.description}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Requirements:</h4>
                    <ul className="space-y-1">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-purple-600 mr-2">•</span>
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button className="mt-2 inline-flex items-center text-purple-600 hover:text-yellow-500 font-semibold">
                    Apply Now <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section ref={addToRefs} className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-[#663399]">Our Application Process</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-[#663399]"></div>
              
              {/* Step 1 */}
              <div className="relative flex flex-col md:flex-row items-center mb-12">
                <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-[#663399]">Application Submission</h3>
                  <p className="text-gray-700 mt-2">
                    Submit your resume and cover letter through our online portal.
                  </p>
                </div>
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <div className="md:w-1/2 md:pl-8"></div>
              </div>
              
              {/* Step 2 */}
              <div className="relative flex flex-col md:flex-row items-center mb-12">
                <div className="md:w-1/2 md:pr-8 md:text-right order-1 md:order-none"></div>
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                <div className="md:w-1/2 md:pl-8 mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-[#663399]">Initial Screening</h3>
                  <p className="text-gray-700 mt-2">
                    Our HR team reviews applications and conducts initial phone interviews.
                  </p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative flex flex-col md:flex-row items-center mb-12">
                <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-[#663399]">Technical Assessment</h3>
                  <p className="text-gray-700 mt-2">
                    Depending on the role, you may be asked to complete a technical assessment or teaching demonstration.
                  </p>
                </div>
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                <div className="md:w-1/2 md:pl-8"></div>
              </div>
              
              {/* Step 4 */}
              <div className="relative flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-8 md:text-right order-1 md:order-none"></div>
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
                <div className="md:w-1/2 md:pl-8 mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-[#663399]">Final Interview & Offer</h3>
                  <p className="text-gray-700 mt-2">
                    Meet with department heads and team members, followed by an offer if selected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section ref={addToRefs} className="py-16 px-4 bg-gradient-to-r from-[#663399] to-black text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Don't See a Suitable Position?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals to join our team. Send us your resume for future opportunities.
          </p>
          <button className="bg-white hover:bg-gray-100 text-[#663399] font-bold py-3 px-8 rounded-full transition duration-300">
            Submit Your Resume
          </button>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;