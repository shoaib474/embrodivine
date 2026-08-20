import React from "react";

import VectorConversionHero from "../sections/vectorConversion/VectorConversionHero";
import VectorInfo from "../sections/vectorConversion/VectorInfo";
import VectorBenefits from "../sections/vectorConversion/VectorBenefits";
import VectorProcess from "../sections/vectorConversion/VectorProcess";
import VectorWhyChooseUs from "../sections/vectorConversion/VectorWhyChooseUs";
import BeforeAfterGallery from "../sections/vectorConversion/BeforeAfterGallery";
import VectorFormats from "../sections/vectorConversion/VectorFormats";
import VectorCTA from "../sections/vectorConversion/VectorCTA";

const VectorConversion = () => {
  return (
    <main className="bg-[#F8FBFF]">
      <VectorConversionHero />

      <VectorInfo />

      <VectorBenefits />

      <VectorWhyChooseUs />

      <VectorProcess />

      <BeforeAfterGallery />

      <VectorFormats />

      <VectorCTA />
    </main>
  );
};

export default VectorConversion;
