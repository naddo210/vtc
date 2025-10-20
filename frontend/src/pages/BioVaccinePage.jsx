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
// // 1
// 2

// 3

// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const BioVaccinePage = () => {
//   const sectionRefs = useRef([]);

//   const addToRefs = (el) => {
//     if (el && !sectionRefs.current.includes(el)) {
//       sectionRefs.current.push(el);
//     }
//   };

//   useEffect(() => {
//     sectionRefs.current.forEach((section) => {
//       gsap.fromTo(
//         section,
//         { y: 50, opacity: 0 },
//         {
//           y: 0,
//           opacity: 1,
//           duration: 0.8,
//           ease: "power2.out",
//           scrollTrigger: {
//             trigger: section,
//             start: "top 85%",
//             end: "bottom 20%",
//             toggleActions: "play none none reverse",
//           },
//         }
//       );
//     });

//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, []);

//   const topics = [
//     { title: "Cell Biology", icon: "🧬", description: "Cellular structure and function" },
//     { title: "Genetics", icon: "🧪", description: "Heredity and DNA mechanisms" },
//     { title: "Evolution", icon: "🦋", description: "Species adaptation and change" },
//     { title: "Ecology", icon: "🌿", description: "Ecosystems and environments" },
//     { title: "Physiology", icon: "❤️", description: "Body systems and functions" },
//     { title: "Biotechnology", icon: "🔬", description: "Modern biological applications" },
//   ];

//   const features = [
//     {
//       title: "Interactive Learning",
//       description: "Engage with 3D models, animations, and virtual labs",
//       icon: "🎮",
//       color: "bg-purple-500"
//     },
//     {
//       title: "Expert Guidance",
//       description: "Learn from experienced educators with proven track records",
//       icon: "👨‍🏫",
//       color: "bg-blue-500"
//     },
//     {
//       title: "Comprehensive Coverage",
//       description: "Complete syllabus with focus on board exam patterns",
//       icon: "📚",
//       color: "bg-green-500"
//     },
//     {
//       title: "Practice Tests",
//       description: "Regular assessments with detailed performance analysis",
//       icon: "📝",
//       color: "bg-orange-500"
//     },
//   ];

//   return (
//     <div className="pt-16 bg-gradient-to-b from-gray-50 to-white">
//       {/* Modern Hero Section */}
//       <section className="relative min-h-[85vh] flex items-center overflow-hidden">
//         {/* Animated Background Pattern */}
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute inset-0" style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//           }}></div>
//         </div>

//         <div className="container mx-auto px-4 relative z-10">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div>
//               <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-semibold mb-6">
//                 <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
//                 Now Enrolling for 2024
//               </div>
//               <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//                 Bio Vaccine
//                 <span className="block text-3xl md:text-4xl mt-2 text-red-600">
//                   Master Biology, Excel in Life
//                 </span>
//               </h1>
//               <p className="text-xl text-gray-600 mb-8 leading-relaxed">
//                 Transform your understanding of life sciences with our comprehensive 
//                 12th-grade biology program designed for academic excellence.
//               </p>
//               <div className="flex flex-wrap gap-4 mb-8">
//                 <button className="px-8 py-4 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transform hover:scale-105 transition-all shadow-lg">
//                   Start Learning Today
//                 </button>
//                 <button className="px-8 py-4 bg-white text-gray-800 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 transform hover:scale-105 transition-all">
//                   Download Syllabus
//                 </button>
//               </div>
//               <div className="flex items-center gap-6 text-sm text-gray-600">
//                 <span className="flex items-center gap-2">
//                   <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   </svg>
//                   500+ Students
//                 </span>
//                 <span className="flex items-center gap-2">
//                   <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                   4.9/5 Rating
//                 </span>
//               </div>
//             </div>
//             <div className="relative">
//               <div className="relative rounded-2xl overflow-hidden shadow-2xl">
//                 <img
//                   src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80"
//                   alt="Biology Lab"
//                   className="w-full h-auto"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
//               </div>
//               {/* Floating Elements */}
//               <div className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-xl">
//                 <div className="text-3xl font-bold text-red-600">95%</div>
//                 <div className="text-sm text-gray-600">Success Rate</div>
//               </div>
//               <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-xl">
//                 <div className="text-3xl font-bold text-green-600">12+</div>
//                 <div className="text-sm text-gray-600">Years Experience</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Topics Grid */}
//       <section ref={addToRefs} className="py-20 px-4">
//         <div className="container mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold mb-4 text-gray-800">
//               Comprehensive Curriculum
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Master every essential topic with our structured approach to 12th-grade biology
//             </p>
//           </div>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {topics.map((topic, index) => (
//               <div
//                 key={index}
//                 className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-xl transition-all duration-300"
//               >
//                 <div className="text-4xl mb-4">{topic.icon}</div>
//                 <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-red-600 transition-colors">
//                   {topic.title}
//                 </h3>
//                 <p className="text-gray-600">{topic.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section ref={addToRefs} className="py-20 px-4 bg-gradient-to-r from-red-50 to-orange-50">
//         <div className="container mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold mb-4 text-gray-800">
//               Why Choose Bio Vaccine?
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Experience a revolutionary approach to biology education
//             </p>
//           </div>
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
//               >
//                 <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center text-2xl mb-4`}>
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-bold mb-2 text-gray-800">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600">
//                   {feature.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Instructor Profile */}
//       <section ref={addToRefs} className="py-20 px-4">
//         <div className="container mx-auto">
//           <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
//             <div className="absolute top-0 right-0 w-96 h-96 bg-red-500 rounded-full blur-3xl opacity-10"></div>
//             <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
//               <div>
//                 <h2 className="text-4xl font-bold mb-6">
//                   Meet Your Instructor
//                 </h2>
//                 <h3 className="text-2xl font-semibold mb-4 text-red-400">
//                   Vaibhav Sir
//                 </h3>
//                 <p className="text-lg mb-6 text-gray-300 leading-relaxed">
//                   With over a decade of teaching experience and a passion for biology, 
//                   Vaibhav Sir has helped thousands of students achieve their academic goals. 
//                   His innovative teaching methods and deep subject knowledge make complex 
//                   concepts easy to understand.
//                 </p>
//                 <div className="grid grid-cols-2 gap-4 mb-6">
//                   <div className="bg-white/10 backdrop-blur p-4 rounded-xl">
//                     <div className="text-2xl font-bold text-red-400">1000+</div>
//                     <div className="text-sm text-gray-300">Students Taught</div>
//                   </div>
//                   <div className="bg-white/10 backdrop-blur p-4 rounded-xl">
//                     <div className="text-2xl font-bold text-red-400">98%</div>
//                     <div className="text-sm text-gray-300">Pass Rate</div>
//                   </div>
//                 </div>
//                 <div className="flex flex-wrap gap-3">
//                   <span className="px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm">
//                     M.Sc. Biology
//                   </span>
//                   <span className="px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm">
//                     B.Ed.
//                   </span>
//                   <span className="px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm">
//                     Research Published
//                   </span>
//                 </div>
//               </div>
//               <div className="relative">
//                 <div className="aspect-square rounded-2xl overflow-hidden">
//                   <img
//                     src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=600&q=80"
//                     alt="Vaibhav Sir"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section ref={addToRefs} className="py-20 px-4">
//         <div className="container mx-auto">
//           <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
//             <div className="absolute inset-0 bg-black/20"></div>
//             <div className="relative z-10">
//               <h2 className="text-4xl md:text-5xl font-bold mb-6">
//                 Transform Your Biology Journey
//               </h2>
//               <p className="text-xl mb-8 max-w-2xl mx-auto">
//                 Join Bio Vaccine today and unlock your potential in life sciences. 
//                 Limited seats available for the upcoming batch!
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <button className="px-8 py-4 bg-white text-red-600 font-bold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all shadow-xl">
//                   Enroll Now - ₹9,999
//                 </button>
//                 <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-red-600 transform hover:scale-105 transition-all">
//                   Schedule Free Demo
//                 </button>
//               </div>
//               <p className="mt-6 text-sm">
//                 🎁 Early bird discount: Save 20% if you enroll this week!
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default BioVaccinePage;