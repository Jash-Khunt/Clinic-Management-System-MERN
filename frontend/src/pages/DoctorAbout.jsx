import React from "react";
import { formateDate } from "../utils/formatDate.js";
const DoctorAbout = () => {
  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          About of
          <span className="text-irisBlueColor font-bold text-[24px] leading-9">
            Jash Khunt
          </span>
        </h3>

        <p className="text_para">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis eius
          assumenda corrupti at fugiat ipsum odio laudantium quisquam veritatis
          consequatur velit illo ullam animi necessitatibus vero voluptatum fuga
          consequuntur, aspernatur perspiciatis adipisci. Necessitatibus et non
          sapiente sit distinctio, repellat illo totam perspiciatis, inventore
          ex assumenda odit natus cumque saepe nostrum?
        </p>
      </div>

      <div className="arrow">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Education
        </h3>

        <ul className="hero md:p-5">
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 sec">
            <div>
              <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                {formateDate("07-04-2013")} - {formateDate("07-04-2015")}
              </span>
              <p className="text-[16px] leading-6 font-medium text-textColor">
                PHD in Surgeon
              </p>
            </div>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              Civil Hospital, Surat.
            </p>
          </li>

          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
            <div>
              <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                {formateDate("12-04-2010")} - {formateDate("07-04-2013")}
              </span>
              <p className="text-[16px] leading-6 font-medium text-textColor">
                PHD in Surgeon
              </p>
            </div>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              Civil Hospital, Surat.
            </p>
          </li>
        </ul>

        <div className="arrow">
          <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
            Experience
          </h3>

          <ul className="grid sm:grid-cols-2 gap-[30px] hero md:p-5">
            <li className="form rounded bg-[#cce8cd]">
              <span className="text-purpleColor text-[15px] leading-6 font-semibold">
                {formateDate("12-04-2019")} - {formateDate("07-04-2021")}
              </span>

              <p className="text-[16px] leading-6 font-medium text-textColor">
                Sr. Surgeon
              </p>

              <p className="text-[14px] leading-5 font-medium text-textColor">
                Civil Hospital, Surat.
              </p>
            </li>

            <li className="form rounded bg-[#cce8cd]">
              <span className="text-purpleColor text-[15px] leading-6 font-semibold">
                {formateDate("12-04-2016")} - {formateDate("07-04-2019")}
              </span>

              <p className="text-[16px] leading-6 font-medium text-textColor">
                Sr. Surgeon
              </p>

              <p className="text-[14px] leading-5 font-medium text-textColor">
                Civil Hospital, Surat.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DoctorAbout;
