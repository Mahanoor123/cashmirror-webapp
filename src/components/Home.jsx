import { motion } from "framer-motion";
import background from "../assets/cm-background.jpg";
import cubic from "../assets/cube.png";
import TopNavbar from "../components/TopNavbar";
import Navbar from "../components/Navbar";
import { ArrowUpRight, ChartBar } from "lucide-react";
import ParallexWrapper from "./ParallexWrapper";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const { userData } = useAuth();

  return (
    <ParallexWrapper>
      <div
        className="relative bg-cover bg-center bg-no-repeat min-h-screen w-full"
        style={{ backgroundImage: `url(${background})` }}
      >
        <TopNavbar />
        <Navbar />

        <motion.img
          src={cubic}
          alt="Digital Cube"
          className="block mx-auto w-[40vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] drop-shadow-[0_0_10px_#0ff] rounded-full mt-8"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.05, 1],
            opacity: [0.9, 1, 0.9],
            filter: ["hue-rotate(0deg)", "hue-rotate(360deg)"],
          }}
          transition={{
            duration: 15,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
        />

        <div className="absolute [60%] left-0 sm:top-[55%] md:top-[40%] lg:top-[30%] px-4 sm:px-8 md:px-12 ">
          <div className="mx-auto w-full max-w-[95%] sm:max-w-[90%] md:max-w-[70%] lg:max-w-[40vw] p-6  rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
            <h1 className="text-white text-2xl sm:text-2xl md:text-4xl lg:text-5xl font-[Oxanium] font-bold">
              Hii{" "}
              <span className="text-purple-600">
                {userData?.name || "User"}
              </span>
              , Welcome to CashMirror
            </h1>

            <div className="flex gap-2 items-center text-white text-sm sm:text-base md:text-lg py-4 flex-wrap">
              <ChartBar className="text-blue-700" />
              <p>Track and calculate your budget with one finger tap</p>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <NavLink to="/dashboard">
                <button className="bg-purple-600 py-2 px-4 sm:px-6 text-sm sm:text-base text-white flex items-center gap-2 rounded-md hover:bg-purple-700 transition-all">
                  Track Expense
                  <ArrowUpRight className="hover:rotate-[45deg] transition-transform duration-300" />
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </ParallexWrapper>
  );
};

export default Home;
