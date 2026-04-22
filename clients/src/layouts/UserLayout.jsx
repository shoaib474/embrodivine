import React from "react";

import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../user/components/Navbar";
import Footer from "../user/components/Footer";
import { useEffect } from "react";
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = { type: "tween", duration: 0.5 };

export default function MainLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="bg-[#FFF4E6] text-[#78866B] min-h-screen flex flex-col">
      <Navbar />
      <motion.main
        className="flex-1"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
}
