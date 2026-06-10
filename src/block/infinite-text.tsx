"use client";

import React from "react";
import { motion } from "framer-motion";

const countries = [
  "TRAVEL JOURNAL", "•", "BEAUTIFUL PLACES", "•", "MEANINGFUL STAYS", "•", "STORIES WORTH REMEMBERING", "•",
  
];

const InfiniteLogoScroll = () => {
  return (
    <div className="container mx-auto p-5" style={{ backgroundColor: 'var(--color-bg, #F5F2EB)' }}>
    
      {/* Masking container */}
      <div className="flex relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          animate={{ x: "-50%" }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex flex-none gap-6 pr-16 items-center"
        >
          {/* Duplicate the array to create the seamless loop */}
          {[...countries, ...countries].map((country, index) => (
            <div key={index} className="flex items-center gap-6">
              <span className="font-['Bodoni_Moda'] text-[1.35rem] md:text-[1.2rem] font-medium text-black whitespace-nowrap">
                {country.toUpperCase()}
              </span>
              <span className="text-black/20">·</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default InfiniteLogoScroll;