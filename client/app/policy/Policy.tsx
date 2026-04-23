import React, { useState } from 'react';

const Policy = () => {
  type SectionKey = 'privacy' | 'terms' | 'refund';

  const sections: Record<SectionKey, { title: string; content: React.ReactElement }> = {
    privacy: {
      title: "Privacy Policy",
      content: (
        <>
          <p>At ZyLo Learning, we prioritize your data security. As a platform focused on <strong>AI Development</strong>, we collect information to enhance your learning experience.</p>
          <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-400">
            <li><strong>Data Collection:</strong> We collect account details and learning progress to provide personalized AI-driven roadmaps.</li>
            <li><strong>AI Training:</strong> We do not use your private project code to train global models without explicit consent.</li>
            <li><strong>Security:</strong> All data is encrypted via industry-standard protocols and stored securely in our cloud infrastructure.</li>
          </ul>
        </>
      )
    },
    terms: {
      title: "Terms of Service",
      content: (
        <>
          <p>By using the ZyLo Platform, you agree to adhere to our community standards and technical guidelines.</p>
          <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-400">
            <li><strong>Usage Limits:</strong> AI generation tools are subject to fair use policies to ensure stability for all users.</li>
            <li><strong>Content Ownership:</strong> You retain 100% ownership of the code and projects you build on the platform.</li>
            <li><strong>Accuracy:</strong> While our AI provides high-level guidance, users are responsible for verifying the security of generated code.</li>
          </ul>
        </>
      )
    },
    refund: {
      title: "Refund Policy",
      content: (
        <>
          <p>We strive for excellence, but we understand that plans change. Our refund policy is designed to be fair to both learners and creators.</p>
          <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-400">
            <li><strong>7-Day Window:</strong> Full refunds are available within 7 days of purchase if less than 20% of the course is consumed.</li>
            <li><strong>Digital Products:</strong> Subscription fees for AI-compute credits are non-refundable once utilized.</li>
            <li><strong>Processing:</strong> Approved refunds are credited back to the original payment method within 10 business days.</li>
          </ul>
        </>
      )
    }
  };

  const [activeTab, setActiveTab] = useState<SectionKey>('privacy');

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 min-h-screen font-Poppins">
      {/* Header */}
      <div className="mb-8 sm:mb-12 border-b border-gray-100 pb-6 sm:pb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">Legal Center</h1>
        <p className="text-sm sm:text-base text-gray-500">Updated April 2026 • Ensuring transparency in AI-driven education.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-1/4 space-y-2">
          {(['privacy', 'terms', 'refund'] as const).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as SectionKey)}
              className={`w-full text-left px-4 py-3 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all text-sm sm:text-base touch-manipulation ${
                activeTab === key 
                ? 'bg-gradient-to-r from-[#a855f7] to-[#6366f1] text-white shadow-lg' 
                : 'text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 hover:border-purple-200'
              }`}
            >
              {sections[key].title}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="w-full lg:w-3/4 bg-white/80 backdrop-blur-sm border border-gray-100/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 leading-tight">
            {sections[activeTab].title}
          </h2>
          <ul className="text-gray-600 leading-relaxed space-y-3 sm:space-y-4 [&_ul]:pl-4 sm:[&_ul]:pl-5 [&_ul]:space-y-2">
            {sections[activeTab].content}
          </ul>
          
          <div className="mt-8 sm:mt-12 p-5 sm:p-6 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl sm:rounded-2xl border border-dashed border-gray-200">
            <p className="text-xs sm:text-sm text-gray-500 italic leading-relaxed">
              Questions about our {sections[activeTab].title.toLowerCase()}? 
              Reach out to our legal team at <span className="text-[#a855f7] font-bold hover:underline transition-all">legal@zylo.learn</span>
            </p>
          </div>
        </div>
      </div>

      <footer className="mt-16 sm:mt-20 text-center pt-8">
         <p className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.4em] font-bold uppercase text-gray-400">
           ZyLo Platform • Engineering the Intelligence of Tomorrow
         </p>
      </footer>
    </div>
  );
};

export default Policy;
