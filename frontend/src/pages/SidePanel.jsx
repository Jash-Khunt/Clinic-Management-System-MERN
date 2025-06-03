import React from "react";

const SidePanel = () => {
  return (
    <div className="bg-white shadow-panelShadow form lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text_para mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          500 Rs/-
        </span>
      </div>
      <div className="percent">
        <p className="text_para mt-0 font-semibold text-headingColor">
          Available Time Slots:
        </p>

        <ul className="copy">
          <li className="flex items-center justify-between mb-2">
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              Sunday
            </p>
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              9:00 AM – 12:30 AM
            </p>
          </li>
          <li className="flex items-center justify-between mb-2">
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              Monday
            </p>
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              9:00 AM – 9:30 PM
            </p>
          </li>
          <li className="flex items-center justify-between mb-2">
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              Tuesday
            </p>
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              9:00 AM – 9:30 PM
            </p>
          </li>
          <li className="flex items-center justify-between mb-2">
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              Wednesday
            </p>
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              9:00 AM – 9:30 PM
            </p>
          </li>
          <li className="flex items-center justify-between mb-2">
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              Thursday
            </p>
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              9:00 AM – 9:30 PM
            </p>
          </li>
          <li className="flex items-center justify-between mb-2">
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              Friday
            </p>
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              9:00 AM – 9:30 PM
            </p>
          </li>
          <li className="flex items-center justify-between mb-2">
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              Saturday
            </p>
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              9:00 AM – 9:30 PM
            </p>
          </li>
        </ul>
      </div>
      <button className="btn w-full rounded-md">Book An Appointment</button>
    </div>
  );
};

export default SidePanel;
