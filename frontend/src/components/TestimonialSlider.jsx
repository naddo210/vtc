import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const TestimonialSlider = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Fetch image testimonials from the backend
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('/api/testimonials/slider');
        // Ensure response.data is an array before setting state
        if (Array.isArray(response.data) && response.data.length > 0) {
          setTestimonials(response.data);
        } else {
          console.error('Expected an array of testimonials but got:', response.data);
          setTestimonials([]); // Set to empty array as fallback
        }
      } catch (error) {
        console.error('Error fetching testimonial images:', error);
        setTestimonials([]); // Set to empty array on error
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    // Auto-slide functionality
    if (testimonials.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000); // 3 seconds per slide
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [testimonials.length]);

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '400px' }}>
      {testimonials.map((testimonial, index) => (
        <div
          key={testimonial._id}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <img
            src={testimonial.image}
            alt="Testimonial"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain'
            }}
          />
        </div>
      ))}
      
      <div style={{ position: 'absolute', bottom: '10px', width: '100%', display: 'flex', justifyContent: 'center' }}>
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: index === currentIndex ? '#333' : '#ccc',
              margin: '0 5px',
              padding: 0,
              border: 'none',
              cursor: 'pointer'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;