"use client";

import { styles } from "@/app/styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { useMemo, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";

type FaqItem = {
  _id?: string;
  question?: string;
  answer?: string;
  Question?: string;
  Answer?: string;
};

const FAQ = () => {
  const { data, isLoading, isError } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });

  const faqs = useMemo<FaqItem[]>(() => {
    return Array.isArray(data?.layout?.faq) ? data.layout.faq : [];
  }, [data]);

  const [activeQuestion, setActiveQuestion] = useState<number | null>(0);

  const toggleQuestion = (index: number) => {
    setActiveQuestion((prev) => (prev === index ? null : index));
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14">
      <h2 className={`${styles.title} text-2xl sm:text-3xl md:text-[30px] lg:text-[42px] font-bold leading-tight text-center mb-8 sm:mb-12`}>
        Frequently Asked Questions
      </h2>

      {isLoading ? (
        <p className="mt-8 text-center text-gray-500 dark:text-gray-400">Loading FAQs...</p>
      ) : isError ? (
        <p className="mt-8 text-center text-red-500">Unable to load FAQs right now.</p>
      ) : faqs.length === 0 ? (
        <p className="mt-8 text-center text-gray-500 dark:text-gray-400">No FAQs available yet.</p>
      ) : (
        <div className="mt-8">
          {faqs.map((item, index) => {
            const question = item.question || item.Question || "";
            const answer = item.answer || item.Answer || "";
            const isOpen = activeQuestion === index;

            return (
              <article
                key={item._id || `${question}-${index}`}
                className="border-b border-gray-200/50 dark:border-gray-700/50 px-3 sm:px-4 md:px-5 py-3 sm:py-4 last:border-b-0 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between gap-3 sm:gap-4 text-left cursor-pointer py-1 touch-manipulation"
                  onClick={() => toggleQuestion(index)}
                >
                  <span className="text-sm sm:text-base md:text-[16px] lg:text-[18px] font-Poppins font-medium text-gray-900 dark:text-white line-clamp-2">
                    {question}
                  </span>
                  <span className={`shrink-0 cursor-pointer transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                    {isOpen ? <HiMinus size={18} className="sm:size-5" /> : <HiPlus size={18} className="sm:size-5" />}
                  </span>
                </button>

                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-[14px] lg:text-[16px] leading-relaxed text-gray-700 dark:text-gray-300 px-1 sm:px-0">
                    {answer}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default FAQ;