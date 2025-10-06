import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Super7BatchPage = () => {
  const sectionRefs = useRef([]);
  
  // Add to refs array
  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Initialize animations
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

  return (
    <div className="pt-16 bg-white">
      {/* Hero Section with Video Background */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
            Super 7 Batch
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Elite Program for Exceptional Results
          </p>
        </div>
      </section>

      {/* Program Overview */}
      <section ref={addToRefs} className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
              Accelerate Your Academic Journey
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              The Super 7 Batch is our premium program designed for students aiming for top ranks in competitive exams. 
              This exclusive batch is limited to only 7 students per group, ensuring personalized attention and 
              maximum interaction with our expert faculty.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              With a proven track record of producing top rankers, the Super 7 Batch offers an intensive curriculum, 
              advanced problem-solving techniques, and regular performance assessments to keep you on track for success.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section ref={addToRefs} className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">
            Program Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
                Small Batch Size
              </h3>
              <p className="text-gray-600 text-center">
                Limited to 7 students per batch for personalized attention and focused learning
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
                Advanced Curriculum
              </h3>
              <p className="text-gray-600 text-center">
                Comprehensive study material with advanced concepts and problem-solving techniques
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
                Regular Assessments
              </h3>
              <p className="text-gray-600 text-center">
                Weekly tests and detailed performance analysis to track progress
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
                Doubt Sessions
              </h3>
              <p className="text-gray-600 text-center">
                Dedicated doubt clearing sessions with faculty members
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section ref={addToRefs} className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80" 
                    alt="Student" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Priya Sharma</h3>
                <p className="text-red-600 font-semibold mb-4">AIR 45 - NEET 2023</p>
                <p className="text-gray-600 text-center italic">
                  "The Super 7 Batch was instrumental in my success. The personalized attention and rigorous practice helped me secure a top rank."
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80" 
                    alt="Student" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Rahul Patel</h3>
                <p className="text-red-600 font-semibold mb-4">AIR 78 - JEE Advanced 2023</p>
                <p className="text-gray-600 text-center italic">
                  "The advanced problem-solving techniques and regular assessments in the Super 7 Batch gave me an edge over others."
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80" 
                    alt="Student" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Neha Gupta</h3>
                <p className="text-red-600 font-semibold mb-4">State Rank 3 - MHT-CET 2023</p>
                <p className="text-gray-600 text-center italic">
                  "The faculty's dedication and the small batch size made all the difference. I could clarify all my doubts instantly."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section ref={addToRefs} className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">
            Admission Process
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-6">
                <div className="flex flex-col space-y-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                        1
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-800">Entrance Test</h3>
                      <p className="text-gray-600">
                        Take our screening test to assess your current knowledge level and aptitude
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                        2
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-800">Interview</h3>
                      <p className="text-gray-600">
                        Personal interview with our academic team to understand your goals and motivation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 p-6">
                <div className="flex flex-col space-y-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                        3
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-800">Selection</h3>
                      <p className="text-gray-600">
                        Based on test performance and interview, top 7 students are selected for each batch
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                        4
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-800">Enrollment</h3>
                      <p className="text-gray-600">
                        Complete the admission process and join the elite Super 7 Batch
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section ref={addToRefs} className="py-20 px-4 bg-red-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">
            Secure Your Spot in the Super 7 Batch
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-10">
            Limited seats available. Apply now for the entrance test and take the first step towards academic excellence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/contact" 
              className="inline-block px-8 py-4 bg-white text-red-600 font-bold rounded-full hover:bg-gray-100 transition-colors duration-300"
            >
              Apply Now
            </a>
            <a 
              href="/contact" 
              className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-red-600 transition-colors duration-300"
            >
              Schedule a Counseling Session
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Super7BatchPage;