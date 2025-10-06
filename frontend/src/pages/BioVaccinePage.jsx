import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BioVaccinePage = () => {
  const sectionRefs = useRef([]);

  // Add sections to refs array
  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Scroll animation for sections
  useEffect(() => {
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
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="pt-16 bg-white">
      {/* Hero Section with Background Video */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* ✅ Working Background Video */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src="https://videos.pexels.com/video-files/3680665/3680665-uhd_3840_2160_30fps.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
            Bio Vaccine Program
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            By Vaibhav Sir
          </p>
        </div>
      </section>

      {/* Program Overview */}
      <section ref={addToRefs} className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
              Dive into the Fascinating World of Biology
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our comprehensive 12th-grade course covers essential topics from
              cellular biology to ecosystems, providing a deep understanding of
              life sciences crucial for academic success and beyond. Designed
              specifically for 12th-grade students preparing for their board
              exams or aspiring to pursue higher education in life sciences.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              This program is ideal for students passionate about biology or
              those seeking to strengthen their foundation in the subject.
            </p>
          </div>
        </div>
      </section>

      {/* Program Benefits */}
      <section ref={addToRefs} className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">
            Program Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
                Master Fundamental Concepts
              </h3>
              <p className="text-gray-600 text-center">
                Learn core biological concepts like genetics, evolution, and
                anatomy with clarity and depth.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
                Develop Critical Thinking
              </h3>
              <p className="text-gray-600 text-center">
                Build analytical and research-based problem-solving skills
                through practical examples.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
                Exam-Ready Proficiency
              </h3>
              <p className="text-gray-600 text-center">
                Prepare confidently for board exams with structured lessons and
                in-depth revision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Section */}
      <section ref={addToRefs} className="py-20 px-4 bg-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3">
            <div className="w-64 h-64 rounded-full overflow-hidden mx-auto">
              <img
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=600&q=80"
                alt="Vaibhav Sir"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Led by Expert Instructor
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Guided by experienced educator <strong>Vaibhav Sir</strong>, known
              for his passion and clarity in teaching biology. He brings years
              of experience to help students truly understand the subject.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="flex items-center gap-2 text-gray-700">
                ⭐ 10+ Years Experience
              </span>
              <span className="flex items-center gap-2 text-gray-700">
                🎓 M.Sc. in Biology
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section ref={addToRefs} className="py-20 px-4 bg-red-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Excel in Biology?
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-10">
            Join our Bio Vaccine program and transform your understanding of
            biology. Limited seats available!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-red-600 font-bold rounded-full hover:bg-gray-100 transition"
            >
              Enroll Now
            </a>
            <a
              href="/contact"
              className="inline-block px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-red-600 transition"
            >
              Request Information
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BioVaccinePage;
