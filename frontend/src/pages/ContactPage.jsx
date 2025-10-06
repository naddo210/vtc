import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '1234567890abcdef1234567890abcdef', // Replace with your actual Web3Forms access key
          ...formData,
          subject: `New message from ${formData.name}: ${formData.subject}`,
          from_name: 'VTC Smart Class Website'
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setFormSubmitted(true);
        // Reset form after submission
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: ""
          });
          setFormSubmitted(false);
        }, 5000);
      } else {
        console.error('Form submission error:', data);
        alert('There was an error submitting the form. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  };

  return (
    <div className="pt-16 bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-[#663399] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Have questions about our courses or need more information? We're here to help!
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section ref={addToRefs} className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-gray-700 hover:transform hover:scale-105 transition duration-300">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                <FaPhone />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-700">Phone</h3>
              <p className="text-gray-700">7077071737</p>
              <p className="text-gray-700">7710048831</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-gray-700 hover:transform hover:scale-105 transition duration-300">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                <FaEnvelope />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-700">Email</h3>
              <p className="text-gray-700">vtcsmartclass@gmail.com</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-gray-700 hover:transform hover:scale-105 transition duration-300">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                <FaMapMarkerAlt />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-700">Location</h3>
              <p className="text-gray-700">Vile Parle (E), Mumbai - 400 057</p>
              <p className="text-gray-700">Andheri (E), Mumbai</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-gray-700 hover:transform hover:scale-105 transition duration-300">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                <FaClock />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-700">Hours</h3>
              <p className="text-gray-700">Monday - Saturday: 9AM - 8PM</p>
              <p className="text-gray-700">Sunday: 10AM - 4PM</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Office Locations */}
      <section ref={addToRefs} className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-700">Our Locations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-gray-700">
              <h3 className="text-xl font-bold mb-3 text-gray-700">Head Office & Classroom No. 1</h3>
              <p className="text-gray-700 mb-1">2nd Floor, Kamdar Shopping Centre, Shop No. 29</p>
              <p className="text-gray-700 mb-1">Opp. Railway ticket counter, Vile Parle (E)</p>
              <p className="text-gray-700 mb-4">Mumbai - 400 057</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-gray-700">
              <h3 className="text-xl font-bold mb-3 text-gray-700">Ground Floor</h3>
              <p className="text-gray-700 mb-1">Naminath Apt, Shop No. 10, Tejpal Road</p>
              <p className="text-gray-700 mb-1">Opp. Vile Parle Station Bus Stop</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-gray-700">
              <h3 className="text-xl font-bold mb-3 text-gray-700">Lecture Hall Classroom No. 2</h3>
              <p className="text-gray-700 mb-1">1st Floor, Kamdar Shopping Centre, Shop No. 3D</p>
              <p className="text-gray-700 mb-1">Opp. Railway ticket counter, Vile Parle (E)</p>
              <p className="text-gray-700 mb-4">Mumbai - 400 057</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-gray-700">
              <h3 className="text-xl font-bold mb-3 text-gray-700">Conference Room & Classroom No. 3 & 4, VTC LIBRARY</h3>
              <p className="text-gray-700 mb-1">1st Floor, Kamdar Shopping Centre, Shop No. 3D</p>
              <p className="text-gray-700 mb-1">Opp. Railway ticket counter, Vile Parle (E)</p>
              <p className="text-gray-700 mb-4">Mumbai - 400 057</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section ref={addToRefs} className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
              <h2 className="text-3xl font-bold mb-6 text-[#663399]">Send Us a Message</h2>
              
              {formSubmitted ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  <p>Thank you for your message! We'll get back to you shortly.</p>
                </div>
              ) : null}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#663399]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#663399]"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#663399]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#663399]"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#663399]"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="bg-[#663399] hover:bg-purple-800 text-white font-bold py-3 px-8 rounded-full transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
            
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-[#663399]">Find Us</h2>
              <div className="bg-white p-2 rounded-lg shadow-lg">
                {/* Replace with actual map or iframe */}
              <div className="w-full h-96 bg-gray-300 rounded-lg overflow-hidden">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.1160980073!2d72.7410999182885!3d19.082197839544206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63d2c6b0b3b%3A0x3a6d6b35d7d1cf0!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1696412530684!5m2!1sen!2sin"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section ref={addToRefs} className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-[#663399]">Connect With Us</h2>
          
          <div className="flex justify-center space-x-8">
            <a href="#" className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl hover:bg-blue-700 transition duration-300">
              <FaFacebook />
            </a>
            <a href="#" className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center text-white text-2xl hover:bg-blue-500 transition duration-300">
              <FaTwitter />
            </a>
            <a href="#" className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center text-white text-2xl hover:bg-pink-700 transition duration-300">
              <FaInstagram />
            </a>
            <a href="#" className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center text-white text-2xl hover:bg-blue-900 transition duration-300">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={addToRefs} className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-[#663399]">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2 text-[#663399]">How do I enroll in a course?</h3>
              <p className="text-gray-700">
                You can enroll in a course by visiting the course page and clicking the "Enroll Now" button. You'll be guided through the registration and payment process.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2 text-[#663399]">Are there any prerequisites for the courses?</h3>
              <p className="text-gray-700">
                Prerequisites vary by course. Basic courses typically don't require prior knowledge, while advanced courses may require foundational understanding. Check the specific course page for details.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2 text-[#663399]">Do you offer financial assistance or payment plans?</h3>
              <p className="text-gray-700">
                Yes, we offer flexible payment plans and scholarship opportunities for eligible students. Contact our financial aid office for more information.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2 text-[#663399]">What is your refund policy?</h3>
              <p className="text-gray-700">
                We offer a 7-day money-back guarantee for most courses. If you're not satisfied with the course content, you can request a refund within the first week of enrollment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;