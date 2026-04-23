import React from 'react';

const About = () => {
  const stats = [
    { label: 'Founded', value: '2026' },
    { label: 'Core Focus', value: 'AI Development' },
    { label: 'Ecosystem', value: 'Open Source' },
  ];

  return (
<div className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 font-Poppins">
      {/* --- Header Section --- */}
      <div className="text-center mb-12 px-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
          What is{' '}
          <span className="bg-gradient-to-r from-[#a855f7] via-[#ec4899] to-[#6366f1] bg-clip-text text-transparent">
            ZyLo Learning?
          </span>
        </h1>
      </div>

      {/* --- Executive Vision (Moved Up & Reformatted) --- */}
      <div className="relative mb-20">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#a855f7] to-[#6366f1] rounded-3xl blur opacity-25"></div>
        <div className="relative bg-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-14 text-white shadow-2xl overflow-hidden">
          {/* Subtle Background Pattern - Responsive */}
          <div className="absolute top-0 right-0 p-2 sm:p-4 opacity-10 uppercase font-black text-2xl sm:text-4xl md:text-6xl tracking-tighter select-none">
            AI / DEV
          </div>
          
          <div className="relative z-10">
            <h3 className="text-pink-400 font-mono mb-4 sm:mb-6 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase">
               Executive Vision
            </h3>
            
            <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-tight mb-6 sm:mb-8">
              We are not just teaching skills, we are building the 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> Future of AI </span> 
              through community-driven innovation.
            </blockquote>

            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 border-t border-gray-800 pt-6 sm:pt-8">
              <div className="h-10 w-1 sm:h-12 sm:w-1 bg-gradient-to-b from-[#a855f7] to-[#ec4899] mb-4 sm:mb-0"></div>
              <div>
                <p className="font-bold text-xl sm:text-2xl uppercase tracking-widest bg-clip-text bg-gradient-to-r from-white to-gray-400 text-transparent">
                  Manahil Afzal
                </p>
                <p className="text-gray-400 font-medium tracking-wide text-sm sm:text-base">Founder & CEO, ZyLo Platform</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Stats Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="group p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-gray-100 bg-white hover:border-purple-200 hover:shadow-xl hover:shadow-purple-50 transition-all duration-300 touch-manipulation">
            <p className="text-xs sm:text-sm font-black text-gray-400 uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-2">{stat.label}</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* --- Core Mission --- */}
      <div className="max-w-3xl mx-auto text-center px-4 border-t border-gray-100 pt-6 sm:pt-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
          ZyLo Learning is a next-generation platform dedicated to the evolution of AI-driven education. 
          By integrating modern frameworks &amp; LLMs with advanced Artificial Intelligence, 
          we empower developers to build smarter, faster, and more secure applications.
        </p>
      </div>

<footer className="mt-8 sm:mt-12 py-8 text-center border-t border-gray-50">
        <p className="text-gray-400 text-xs sm:text-sm tracking-widest font-medium uppercase">
          Engineering the Intelligence of Tomorrow
        </p>
      </footer>
    </div>
  );
};

export default About;