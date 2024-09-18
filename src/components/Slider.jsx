import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { ArrowLeft, ArrowRight } from "lucide-react";
import TestimonialCard from "./home/testimonial/TestimonialCard";
import person1 from "@/assets/person-1.png";
import person2 from "@/assets/person-2.png";
import person3 from "@/assets/person-3.png";

const Slider = () => {
  return (
    <div className="relative">
      <Swiper
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
        }}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          type: "bullets",
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={40}
        slidesPerView={3}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <TestimonialCard
            description="“Ut ullamcorper hendrerit tempor. Aliquam in rutrum dui. Maecenas ac placerat metus, in faucibus est.”"
            image={person1}
            name="Robert Fox"
            title="UI/UX Designer"
          />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialCard
            description="“Mauris eget lorem odio. Mauris convallis justo molestie metus aliquam lacinia. Suspendisse ut dui vulputate augue condimentum ornare. Morbi vitae tristique ante”"
            image={person3}
            name="Bessie Cooper"
            title="Creative Director"
          />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialCard
            description="Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse et magna quis nibh accumsan venenatis sit amet id orci."
            image={person2}
            name="Jane Cooper"
            title="Photographer"
          />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialCard
            description="“Ut ullamcorper hendrerit tempor. Aliquam in rutrum dui. Maecenas ac placerat metus, in faucibus est.”"
            image={person1}
            name="John Doe"
            title="Product Designer"
          />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialCard
            description="“Mauris eget lorem odio. Mauris convallis justo molestie metus aliquam lacinia. Suspendisse ut dui vulputate augue condimentum ornare. Morbi vitae tristique ante”"
            image={person3}
            name="Dianne Russell"
            title="Software Engineer"
          />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialCard
            description="Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse et magna quis nibh accumsan venenatis sit amet id orci."
            image={person2}
            name="Simon Mcguire"
            title="Frontend Developer"
          />
        </SwiperSlide>
        <div className="swiper-pagination z-50"></div>
      </Swiper>
      {/* Prev Arrow */}
      <div
        className={`custom-prev hidden lg:flex absolute top-[35%] -left-20 z-60 w-12 h-12 rounded-md justify-center items-center duration-500 cursor-pointer bg-white text-primary hover:shadow-[0px_12px_48px_rgba(0,_44,_109,_0.1)] shadow-sm`}
      >
        <ArrowLeft className="w-6 h-6" />
      </div>
      {/* Next Arrow */}
      <div
        className={`custom-next hidden lg:flex absolute top-[35%] -right-20 z-60 w-12 h-12 rounded-md justify-center items-center duration-500 cursor-pointer bg-white text-primary hover:shadow-[0px_12px_48px_rgba(0,_44,_109,_0.1)] shadow-sm`}
      >
        <ArrowRight className="w-6 h-6" />
      </div>
    </div>
  );
};

export default Slider;
