"use client";
import MainImgDisplay from "../media/main-img-display";
import TodaysProblems from "../content/todays-problems";
import React, { useState } from "react";

const InspireButton = () => {
  const [showProblems, setShowProblems] = useState(false);

  const handleButtonClick = () => {
    setShowProblems(true);
  };
  return (
    <div>
      {!showProblems && (
        <div>
          <div
            className="flex justify-center
        "
            data-aos="zoom-y-out"
            data-aos-delay="300"
          >
            <button
              // className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0 hover:cursor-pointer"
              className="btn text-white text-lg bg-gray-900 hover:scale-105 w-full mb-4 sm:w-auto sm:mb-0 hover:cursor-pointer transition-all duration-200 ease-in-out shadow-lg"
              onClick={() => handleButtonClick()}
            >
              Inspire me
            </button>
          </div>
          <MainImgDisplay />
        </div>
      )}
      {showProblems && (
        <div className="mb-10" data-aos="zoom-y-out" data-aos-delay="400">
          <TodaysProblems />
        </div>
      )}
    </div>
  );
};

export default InspireButton;
