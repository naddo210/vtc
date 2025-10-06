import React, { useRef } from 'react'

const Super7 = () => {
      const sectionRefs = useRef([]);
      const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };
  return (
 
         <section ref={addToRefs} className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold mb-6 text-[#663399]">Super 7 Batch</h2>
              <p className="text-gray-700 mb-4">
                Our exclusive accelerated learning program designed for highly motivated students who want to fast-track their career in technology.
              </p>
              <p className="text-gray-700 mb-6">
                The Super 7 Batch offers intensive training, personalized mentorship, guaranteed internship placements, and a direct path to high-paying jobs in the tech industry.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  <span>Intensive 7-month program covering multiple technologies</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  <span>One-on-one mentorship with industry experts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  <span>Guaranteed internship placements</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  <span>Job assistance with 95% placement rate</span>
                </li>
              </ul>
              <button className="bg-[#663399] hover:bg-purple-800 text-white font-bold py-2 px-6 rounded-full transition duration-300">
                Apply Now
              </button>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://via.placeholder.com/600x400" 
                alt="Super 7 Batch" 
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>
      
   
  )
}

export default Super7
