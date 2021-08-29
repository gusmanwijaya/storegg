/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import AOS from "aos";

import Navbar from "../components/organisms/Navbar";
import MainBanner from "../components/organisms/MainBanner";
import TransactionStep from "../components/organisms/TransactionStep";
import FeaturedGame from "../components/organisms/FeaturedGame";
import Reached from "../components/organisms/Reached";
import Story from "../components/organisms/Story";
import Footer from "../components/organisms/Footer";

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <MainBanner />

      {/* 3 Column - Feature */}
      <TransactionStep />

      {/* 5 Column - Featured Game */}
      <FeaturedGame />

      {/* Reached */}
      <Reached />

      {/* Story */}
      <Story />

      {/* Footer */}
      <Footer />
    </>
  );
}
