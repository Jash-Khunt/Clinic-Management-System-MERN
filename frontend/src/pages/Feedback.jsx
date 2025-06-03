import React, { useState } from "react";
import avatar from "../assets/images/avatar-icon.png";
import { formateDate } from "../utils/formatDate.js";
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./FeedbackForm.jsx";

const Feedback = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  return (
    <div>
      <div className="sli">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor sli">
          All reviews (272)
        </h4>

        <div className="flex justify-between gap-10 sli">
          <div className="flex gap-3">
            <figure className="w-10 h-10 rounded-full">
              <img className="w-full" src={avatar} alt="" />
            </figure>

            <div>
              <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                Umang Khemkha
              </h5>
              <p className="text-[14px] leading-6 text-textColor">
                {formateDate("02-14-2023")}
              </p>
              <p className="text_para photo font-medium text-[15px]">
                Good services, highly recommended
              </p>
            </div>
          </div>

          <div className="flex gap-1">
            {[...Array(5).keys()].map((_, index) => (
              <AiFillStar key={index} color="#0067FF" />
            ))}
          </div>
        </div>
      </div>
      {!showFeedback && (
        <div className="text-center">
          <button className="btn" onClick={() => setShowFeedback(true)}>
            Give Feedback
          </button>
        </div>
      )}

      {showFeedback && <FeedbackForm />}
    </div>
  );
};

export default Feedback;
