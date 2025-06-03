import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import patientAvatar from "../assets/images/patient-avatar.png";
import { HiStar } from "react-icons/hi";

const testimonials = [
  {
    name: "Muhibur Rahman",
    avatar: patientAvatar,
    review: "Great service and friendly staff!",
  },
  {
    name: "Fatima Noor",
    avatar: patientAvatar,
    review: "Very professional doctor and clean clinic.",
  },
  {
    name: "Ahmed Khan",
    avatar: patientAvatar,
    review: "Quick and smooth token process by receptionist.",
  },
  {
    name: "Sneha Patel",
    avatar: patientAvatar,
    review: "The doctor was kind and explained everything clearly.",
  },
  {
    name: "Rakesh Mehta",
    avatar: patientAvatar,
    review: "Efficient service. Didn't have to wait long.",
  },
  {
    name: "Ayesha Khan",
    avatar: patientAvatar,
    review: "Receptionist was helpful and process was easy.",
  },
  {
    name: "Imran Sheikh",
    avatar: patientAvatar,
    review: "Simple and smooth experience. Highly recommend this clinic.",
  },
];

const Testimonial = () => {
  return (
    <div className="arrow lg:mt-[55px] relative">
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 0 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <div className="py-[30px] px-5 rounded-3 shadow-lg bg-white">
              <div className="flex items-center gap-[13px] sli">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                    {t.name}
                  </h4>
                  <div className="flex items-center gap-[2px]">
                    <HiStar className="text-yellowColor w-[18px] h-5" />
                    <HiStar className="text-yellowColor w-[18px] h-5" />
                    <HiStar className="text-yellowColor w-[18px] h-5" />
                    <HiStar className="text-yellowColor w-[18px] h-5" />
                    <HiStar className="text-yellowColor w-[18px] h-5" />
                  </div>
                </div>
              </div>
              <p className="text-[16px] leading-7 mt-4 font-[400] text-textColor swip">
                {t.review}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
