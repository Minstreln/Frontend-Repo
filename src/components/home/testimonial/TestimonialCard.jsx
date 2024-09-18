/* eslint-disable react/prop-types */

import star from "@/assets/star.svg";
import quote from "@/assets/quote.svg";
import { useMemo } from "react";

const Star = () => {
  return (
    <img
      className="h-7 w-7 relative overflow-hidden shrink-0 min-h-[28px]"
      loading="lazy"
      alt=""
      src={star}
    />
  );
};

const TestimonialCard = ({
  propGap,
  description,
  propHeight,
  propDisplay,
  image,
  name,
  title,
}) => {
  const testimonialCardStyle = useMemo(() => {
    return {
      gap: propGap,
    };
  }, [propGap]);

  const maurisEgetLoremStyle = useMemo(() => {
    return {
      height: propHeight,
      display: propDisplay,
    };
  }, [propHeight, propDisplay]);

  return (
    <div
      className={`flex-1 shadow-[0px_12px_80px_rgba(0,_44,_109,_0.05)] rounded-xl flex flex-col items-start justify-start pt-6 px-6 pb-6 gap-20 min-w-[318px] max-w-full text-left text-base text-gray-700 font-medium md:gap-10 bg-white`}
      style={testimonialCardStyle}
    >
      <div className="self-stretch flex flex-col items-start justify-start gap-4">
        <div className="flex flex-row items-start justify-start gap-0.5">
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
        </div>
        <blockquote
          className="m-0 self-stretch h-[72px] relative leading-[24px] inline-block text-gray-600 text-left"
          style={maurisEgetLoremStyle}
        >
          {description}
        </blockquote>
      </div>
      <div className="self-stretch flex flex-row items-center justify-between gap-5 text-center text-gray-900">
        <div className="flex flex-row items-center justify-start gap-3">
          <img
            className="h-12 w-12 relative rounded-full object-cover min-h-[48px]"
            loading="lazy"
            alt=""
            src={image}
            width={50}
            height={50}
          />
          <div className="flex flex-col items-start justify-start gap-1">
            <div className="relative leading-[24px] font-medium text-gray-900">
              {name}
            </div>
            <div className="relative text-sm leading-[20px] text-gray-600 text-left whitespace-nowrap">
              {title}
            </div>
          </div>
        </div>
        <img
          className="h-12 w-12 relative overflow-hidden shrink-0 min-h-[48px]"
          loading="lazy"
          alt=""
          src={quote}
        />
      </div>
    </div>
  );
};

export default TestimonialCard;
