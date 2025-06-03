import React, { useState } from "react";
import doctorImg from "../assets/images/doctor-img02.png";
import starIcon from "../assets/images/Star.png";
import DoctorAbout from "./DoctorAbout";
import Feedback from './Feedback';
import SidePanel from "./SidePanel";
const Doctor = () => {
  const [tab, setTab] = useState("about");

  return (
    <section className="bg-[#fff9ea] py-10">
      <div className="container doc doctor">

        <div className="max-w-[1170px] mx-auto px-5">
          <div className="grid md:grid-cols-3 gap-[50px]">
            <div className="md:col-span-2">
              <div className="flex items-center gap-5">
                <figure className="max-w-[200px] max-h-[200px] overflow-hidden rounded-lg">
                  <img
                    src={doctorImg}
                    alt="Doctor"
                    className="w-full h-full object-cover"
                  />
                </figure>

                <div className="text-left">
                  <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 text-sm lg:text-base font-semibold rounded">
                    Surgeon
                  </span>

                  <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                    Jash Khunt
                  </h3>

                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-sm lg:text-base font-semibold text-headingColor">
                      <img src={starIcon} alt="rating" className="w-4 h-4" />{" "}
                      4.8
                    </span>
                    <span className="text-sm lg:text-base font-normal text-textColor">
                      (272)
                    </span>
                  </div>

                  <p className="text_para text-sm md:text-base mt-3 max-w-[390px] text-textColor">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dicta, alias!
                  </p>
                </div>
              </div>

              {/* Tab Buttons */}
              <div className="arrow border-b border-[#0066ff34] flex gap-10">
                <button
                  onClick={() => setTab("about")}
                  className={`py-2 px-5 text-[16px] leading-7 font-semibold transition ${
                    tab === "about"
                      ? "text-primaryColor border-b border-solid"
                      : "text-headingColor"
                  }`}
                >
                  About
                </button>

                <button
                  onClick={() => setTab("feedback")}
                  className={`py-2 px-5 text-[16px] leading-7 font-semibold transition ${
                    tab === "feedback"
                      ? "text-primaryColor border-b-2 border-primaryColor"
                      : "text-headingColor"
                  }`}
                >
                  Feedback
                </button>
              </div>

              {/* Tab Content (Optional) */}
              <div className="arrow">
                {tab === "about" && <DoctorAbout />}

                {tab === "feedback" && <Feedback />}
              </div>
            </div>

            <div>
              <SidePanel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Doctor;