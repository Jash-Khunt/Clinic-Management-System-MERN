import React from "react";
import aboutImg from "../assets/images/about.png";
import aboutCardImg from "../assets/images/about-card.png";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <section>
      <div className="container">
        <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
          <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
            <img src={aboutImg} alt="about" />
            <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]">
              <img src={aboutCardImg} alt="about-card" />
            </div>
          </div>

          <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
            <h2 className="heading">Proud to be one of the nation's best</h2>
            <p className="text_para">
              For years, our clinic has been a trusted part of the neighborhood
              — offering personalized care with dedication and compassion. We’re
              proud to be a one-doctor clinic focused on what truly matters:
              your health and comfort.
            </p>

            <p className="text_para arrow">
              Every patient matters here. Whether you're visiting for a check-up
              or need ongoing support, we're here to help — not as a large
              institution, but as a small, reliable partner in your well-being.
            </p>
            <Link to="/">
              <button className="btn">Learn More</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
