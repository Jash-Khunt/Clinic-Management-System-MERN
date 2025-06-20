import React from "react";
import { services } from "../assets/data/services.js";
import ServiceCard from "./ServiceCard.jsx";

const ServiceList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] arrow lg:mt-[55px]">
      {services.map((item, index) => (
        <ServiceCard item={item} index={index} key={index} />
      ))}
    </div>
  );
};

export default ServiceList;
