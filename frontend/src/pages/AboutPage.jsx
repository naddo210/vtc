import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const [showFullCareer, setShowFullCareer] = useState(false);
  const sectionRefs = useRef([]);
  const timelineRef = useRef(null);
  
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

    // Animate timeline items
    if (timelineRef.current) {
      const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
      
      gsap.fromTo(
        timelineItems,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [showFullCareer]);

  return (
    <div className="pt-16 bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-gray-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About VTC SMART CLASS</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Shaping academic journeys and building strong foundations since 2009.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section ref={addToRefs} className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <img 
                src="https://images.unsplash.com/photo-1743341942781-14f3c65603c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D" 
                alt="VTC SMART CLASS Campus" 
                className="rounded-lg shadow-xl w-full"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-700">Our Story</h2>
              <p className="text-gray-700 mb-4">
                VTC SMART CLASS was founded in 2009 by Mr. Vaibhav Panchal with a simple vision: to provide students with a place where learning goes beyond textbooks and becomes an enjoyable, empowering experience. What started as a single classroom has today grown into one of the most trusted and premier educational institutes in Andheri (E) and Vile Parle (E), Mumbai, proudly shaping the academic journeys of thousands of students for more than 17 years.
              </p>
              <p className="text-gray-700 mb-4">
                Our name carries the identity and values of our founder, but more importantly, it represents our commitment to quality education, innovation, and trust. VTC SMART CLASS is also a certified Member of the Maharashtra CLASS Association, further reflecting our credibility and standing in the education sector.
              </p>
              <p className="text-gray-700">
                At the heart of our success lies our dedicated team of teachers. Each one is highly qualified, experienced, and passionate about education. They are not only subject experts but also mentors who simplify even the most complex concepts, ensuring students learn with clarity and confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section ref={addToRefs} className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-700">Our Approach to Education</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-gray-700">Modern Teaching Methods</h3>
              <p className="text-gray-700">
                We believe education is not just about scoring marks—it's about building a strong foundation for the future. That's why we've invested in modern teaching methods and advanced technology. Our state-of-the-art Audio-Visual rooms and SMART Interactive Classrooms bring lessons to life, making learning more engaging, practical, and result-oriented.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-gray-700">Our Promise</h3>
              <p className="text-gray-700">
                • To nurture discipline, determination, and dedication in every student.<br/>
                • To provide a learning environment where excellence is encouraged and celebrated.<br/>
                • To stand by our students every step of the way, guiding them towards their dreams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section ref={addToRefs} className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-700">Our Journey</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              From humble beginnings to becoming a trusted educational institution, here's how our journey unfolded.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-700"></div>

            {/* Timeline Content */}
            <div ref={timelineRef} className="relative z-10">
              {/* Always visible timeline items */}
              <div className="timeline-item mb-12 flex justify-between items-center">
                <div className="w-5/12 pr-8 text-right">
                  <h3 className="text-xl font-bold text-gray-700">2009</h3>
                  <p className="text-gray-700 mt-2">Founded by Mr. Vaibhav Panchal as a single classroom in Mumbai.</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-700 rounded-full"></div>
                <div className="w-5/12 pl-8"></div>
              </div>

              <div className="timeline-item mb-12 flex justify-between items-center">
                <div className="w-5/12 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-700 rounded-full"></div>
                <div className="w-5/12 pl-8">
                  <h3 className="text-xl font-bold text-gray-700">2015</h3>
                  <p className="text-gray-700 mt-2">Expanded to multiple locations in Andheri (E) and Vile Parle (E), Mumbai.</p>
                </div>
              </div>

              <div className="timeline-item mb-12 flex justify-between items-center">
                <div className="w-5/12 pr-8 text-right">
                  <h3 className="text-xl font-bold text-gray-700">2018</h3>
                  <p className="text-gray-700 mt-2">Became a certified Member of the Maharashtra CLASS Association.</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-700 rounded-full"></div>
                <div className="w-5/12 pl-8"></div>
              </div>

              {/* Conditional timeline items (shown only when "Read More" is clicked) */}
              {showFullCareer && (
                <>
                  <div className="timeline-item mb-12 flex justify-between items-center">
                    <div className="w-5/12 pr-8"></div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-700 rounded-full"></div>
                    <div className="w-5/12 pl-8">
                      <h3 className="text-xl font-bold text-gray-700">2020</h3>
                      <p className="text-gray-700 mt-2">Introduced state-of-the-art Audio-Visual rooms and SMART Interactive Classrooms.</p>
                    </div>
                  </div>

                  <div className="timeline-item mb-12 flex justify-between items-center">
                    <div className="w-5/12 pr-8 text-right">
                      <h3 className="text-xl font-bold text-gray-700">2022</h3>
                      <p className="text-gray-700 mt-2">Expanded course offerings to include specialized programs for competitive exams.</p>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-700 rounded-full"></div>
                    <div className="w-5/12 pl-8"></div>
                  </div>

                  <div className="timeline-item mb-12 flex justify-between items-center">
                    <div className="w-5/12 pr-8"></div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-700 rounded-full"></div>
                    <div className="w-5/12 pl-8">
                      <h3 className="text-xl font-bold text-gray-700">Present</h3>
                      <p className="text-gray-700 mt-2">Continuing to shape futures, build confidence, and inspire success stories across Mumbai.</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Read More Button */}
          <div className="text-center mt-8">
            <button
              onClick={() => setShowFullCareer(!showFullCareer)}
              className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-full transition duration-300"
            >
              {showFullCareer ? "Show Less" : "Read More"}
            </button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={addToRefs} className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#663399]">Some Moment</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
           some beautiful moments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <img src="../../public/36.jpg" alt="Team Member" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl text-center font-bold mb-1 text-[#663399]">2021</h3>
               
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <img src="../../public/35.jpg" alt="Team Member" className="w-full h-64 object-cover" />
            <div className="p-6">
                <h3 className="text-xl text-center font-bold mb-1 text-[#663399]">2022</h3>
               
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <img src="../../public/49.jpg" alt="Team Member" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl text-center font-bold mb-1 text-[#663399]">2023</h3>
               
              </div>
            </div>

            {/* Team Member 4 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <img src="../../public/34.jpg" alt="Team Member" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl text-center font-bold mb-1 text-[#663399]">2024</h3>
               
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;