import { motion } from "framer-motion";
import background from "../assets/cm-background.jpg";
import TopNavbar from "../components/TopNavbar";
import Navbar from "../components/Navbar";
import {
  ArrowUpRight,
  ChartBar,
} from "lucide-react";

const Dashboard = () => {

  return (
    <>
    <div
      className="bg-cover bg-center bg-no-repeat h-screen w-full"
      style={{ backgroundImage: `url(${background})` }}
    >
      <TopNavbar />
      <Navbar />
      <div className="absolute w-[35vw] top-[30%] left-20 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
        <h1 className="text-white text-5xl font-[Oxanium] font-bold">
          Dashboard
        </h1>
        <div className="flex gap-2 items-center text-white text-lg py-2">
          <ChartBar className="text-blue-700" />
          <p> Track and Calculate your budget with one finger tap</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-purple-600 cursor-pointer py-2 px-6 text-white flex items-center gap-2">
            Track Expense <ArrowUpRight />
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
