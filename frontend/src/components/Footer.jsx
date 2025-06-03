import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { RiLinkedinFill } from "react-icons/ri";
import { AiFillYoutube, AiFillGithub } from "react-icons/ai";
import { FaCode } from "react-icons/fa";

const socialLinks = [
  {
    path: "https://youtu.be/dQw4w9WgXcQ?si=qMefZq80wGpJPOID",
    icon: <AiFillYoutube className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://github.com/Jash-Khunt",
    icon: <AiFillGithub className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://leetcode.com/u/jashkhunt11/",
    icon: <FaCode className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://linkedin.com/in/jash-khunt-ba5970283",
    icon: <RiLinkedinFill className="group-hover:text-white w-4 h-5" />,
  },
];
const quickLinks01 = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/",
    display: "About Us",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/",
    display: "Blog",
  },
];
const quickLinks02 = [
  {
    path: "/find-a-doctor",
    display: "Find a doctor",
  },
  {
    path: "/",
    display: "Request An Appointment",
  },
  {
    path: "/",
    display: "Find a Location",
  },
  {
    path: "/",
    display: "Get an Opinion",
  },
];
const quickLinks03 = [
  {
    path: "/",
    display: "Donate",
  },
  {
    path: "/contact",
    display: "Contact Us",
  },
];
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="foot">
      <div className="container">
        <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px] ">
          <div>
            <img src={logo} alt="footImg" />
            <p className="text-[16px] leading-7 font-[400] text-textColor copy">
              Copyright © {year} developed by JK all rights reserved.
            </p>
            <div className="flex items-center gap-3 copy">
              {socialLinks.map((link, index) => (
                <Link
                  to={link.path}
                  key={index}
                  className="w-9 h-9 border border-solid border-[#181a1e] rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] sli text-headingColor">
              Quick Links
            </h2>

            <ul>
              {quickLinks01.map((item, index) => (
                <li key={index} className="sli">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font-[400] text-textColor"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] sli text-headingColor">
              I want to:
            </h2>

            <ul>
              {quickLinks02.map((item, index) => (
                <li key={index} className="sli">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font-[400] text-textColor"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] sli text-headingColor">
              Support
            </h2>

            <ul>
              {quickLinks03.map((item, index) => (
                <li key={index} className="sli">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font-[400] text-textColor"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
