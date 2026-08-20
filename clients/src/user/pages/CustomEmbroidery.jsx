import React from "react";

import CustomHero from "../sections/customEmbroidery/CustomHero";
import CustomServices from "../sections/customEmbroidery/CustomServices";
import CustomPortfolio from "../sections/customEmbroidery/CustomPortfolio";
import CustomProcess from "../sections/customEmbroidery/CustomProcess";
import CustomCTA from "../sections/customEmbroidery/CustomCTA";
import CustomGuarantee from "../sections/customEmbroidery/CustomGuarantee";

const CustomEmbroidery = () => {
  return (
    <main className="bg-[#F8FBFF]">

      <CustomHero />

      <CustomServices />

      <CustomPortfolio />

      <CustomProcess />

      <CustomCTA />

      <CustomGuarantee />

    </main>
  );
};

export default CustomEmbroidery;