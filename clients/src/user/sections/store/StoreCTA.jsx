import React from "react";

const StoreCTA = () => {
  return (
    <section className="py-32 px-4 flex flex-col items-center text-center bg-[#ffffff]">
      <div className="mb-6">
        <span className="text-sm tracking-widest font-light text-[#007BFF] uppercase">
          JOIN THE EXCLUSIVE CIRCLE
        </span>
      </div>

      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-[#222222]">
        Experience Luxury Embroidery
        <br />
        <span className="text-[#007BFF]">Tailored Just For You</span>
      </h2>

      <p className="text-lg md:text-xl mb-12 max-w-2xl font-light text-[#333333]">
        Subscribe to our newsletter and be the first to discover exclusive
        collections and bespoke designs.
      </p>

      <div className="flex flex-col px-4 sm:flex-row gap-4 w-full md:max-w-xl mx-auto">
        <input
          type="email"
          placeholder="Your Email Address"
          className="px-6 py-4 w-full sm:flex-1 focus:outline-none border border-gray-200 rounded-lg font-light bg-[#F5F7FA] text-[#222222] placeholder:text-gray-400"
        />

        <button className="px-8 py-4 font-semibold tracking-widest text-sm transform hover:scale-105 transition-all rounded-lg border border-[#007BFF] hover:bg-[#0066CC] bg-[#007BFF] text-white">
          GET EXCLUSIVE ACCESS
        </button>
      </div>
    </section>
  );
};

export default StoreCTA;
