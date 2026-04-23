import React from "react";
import Image from "next/image";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

type Props = {
  item: {
    avatar: string;
    name: string;
    profession?: string;
    location?: string;
    comment: string;
    rating?: number;
  };
};

const ReviewCard = ({ item }: Props) => {
  const rating = typeof item.rating === "number" ? Math.max(0, Math.min(5, item.rating)) : 5;
  const metaText = [item.profession, item.location].filter(Boolean).join(" || ");

  return (
    <div className="w-full h-max border border-[#ffffff1d] bg-slate-500 bg-opacity-5 rounded-2xl p-4 sm:p-5 hover:bg-opacity-10 transition-all shadow-sm">
      <div className="flex w-full flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="flex gap-3 sm:gap-4 min-w-0">
          <Image
            src={item.avatar}
            alt={item.name}
            width={50}
            height={50}
            className="rounded-full object-cover border-2 border-[#a855f7] shrink-0"
            unoptimized
          />
          <div className="flex flex-col min-w-0">
            <h5 className="text-[16px] sm:text-[18px] text-white font-medium truncate">
              {item.name}
            </h5>
            <p className="text-[#ffffffab] text-[12px] sm:text-[13px] font-Josefin tracking-wide wrap-break-word">
              {metaText}
            </p>
          </div>
        </div>

        <div className="flex items-center self-start sm:self-auto shrink-0">
          {[...Array(5)].map((_, index) =>
            index < rating ? (
              <AiFillStar key={index} color="#ffb800" size={16} />
            ) : (
              <AiOutlineStar key={index} color="#444" size={16} />
            )
          )}
        </div>
      </div>

      <p className="pt-3 sm:pt-4 text-[#ffffffd0] text-[14px] sm:text-[15px] italic font-light leading-relaxed">
        &quot;{item.comment}&quot;
      </p>
    </div>
  );
};

export default ReviewCard;