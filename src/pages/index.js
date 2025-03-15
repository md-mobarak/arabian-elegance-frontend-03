
import localFont from "next/font/local";

import Navbar from "@/components/Navbar";
import Homes from "@/components/Homes";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  // Move useEffect inside the functional component
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with your desired configuration
  }, []);

  return (
    <div>
      <Navbar />
  <div className="">
    {/* <CartDrawer></CartDrawer> */}
  <Homes />
  </div>
      <Footer/>
    </div>
  );
}
