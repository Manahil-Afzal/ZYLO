import { styles } from "@/app/styles/style";
import Image from "next/image";
import React from "react";
import reviewImage from "../../../public/assests/review.png";
import reviewImageOne from "../../../public/assests/review1.png";
import reviewImageTwo from "../../../public/assests/review2.png";
import ReviewCard from "../Review/ReviewCard";

export const reviews = [

  {
    name: "Olivia Thompson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    profession: "Software Architect",
    location: "London",
    rating: 5,
    comment: "As an architect, I needed a deeper understanding of the trade-offs in cloud infrastructure. The 'AWS Solutions Architect' course provided the perfect blend of theory and hands-on labs.",
  },
  {
    name: "Sarah Chen",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    profession: "AI Product Manager",
    location: "Singapore",
    rating: 5,
    comment: "I wasn't sure how much depth a course could provide on prompting, but 'Generative AI & Prompt Engineering' blew me away.",
  },
  {
    name: "Kenji Tanaka",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    profession: "Data Engineer",
    location: "Tokyo",
    rating: 4,
    comment: "Excellent course quality on AWS. The explanation of VPCs and Route53 was the clearest I've found. A solid 9/10 experience.",
  },
  {
    name: "David Okafor",
    avatar: "https://robohash.org/DavidOkafor.png?set=set4&bgset=bg2&size=150x150",
    profession: "Backend Developer",
    location: "Lagos",
    rating: 5,
    comment: "Learned so much about logic flow. It completely changed how I think about integrating LLMs into our services.",
  },
];

const Reviews = () => {
  const featuredReviews = Array.isArray(reviews) ? reviews.slice(0, 4) : [];

  return (
    <div className="w-[92%] 800px:w-[85%] mx-auto py-8 md:py-10">
      <div className="w-full grid grid-cols-1 800px:grid-cols-2 items-center gap-8 800px:gap-12">
        
        {/* Left Side: Image */}
        <div className="order-1 800px:order-2 w-full flex justify-center 800px:justify-end">
          <div className="w-full max-w-[360px] md:max-w-[560px] grid grid-cols-3 gap-3">
            <Image
              src={reviewImage}
              alt="Software engineer working"
              width={700}
              height={700}
              className="w-full h-[110px] sm:h-[130px] md:h-[150px] object-cover rounded-lg"
            />

            <Image
              src={reviewImageOne}
              alt="Student review visual 1"
              width={320}
              height={220}
              className="w-full h-[110px] sm:h-[130px] md:h-[150px] object-cover rounded-lg"
            />
            <Image
              src={reviewImageTwo}
              alt="Student review visual 2"
              width={320}
              height={220}
              className="w-full h-[110px] sm:h-[130px] md:h-[150px] object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Right Side: Text */}
        <div className="order-2 800px:order-1 w-full text-center 800px:text-left">
          <h1 className={`${styles.title} text-[30px] sm:text-[38px] 800px:text-[50px] leading-snug`}>
            Our Students Are{" "}
            <span className="bg-linear-to-r from-[#a855f7] via-[#ec4899] to-[#6366f1] bg-clip-text text-transparent">
              Our Strength
            </span>
            <br /> See What They Say About Us
          </h1>
          
          <div className="mt-3 800px:mt-4">
            <p className={`${styles.label} text-[15px] sm:text-[16px] 800px:text-[18px] leading-relaxed`}>
             The standard 9 to 5 isn&apos;t enough anymore. See how our alumni went beyond basic coding and transformed their late-night 
             study sessions into senior roles, cloud architecture positions, and AI engineering careers at top tech companies.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {featuredReviews.map((item, index) => (
          <ReviewCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;