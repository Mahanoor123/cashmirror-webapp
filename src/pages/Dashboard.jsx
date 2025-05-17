import { motion } from "framer-motion";
import background from "../assets/cm-background.jpg";
import TopNavbar from "../components/TopNavbar";
import Navbar from "../components/Navbar";
import { ArrowUpRight, ChartBar, CoinsIcon } from "lucide-react";
import ParallexWrapper from "../components/ParallexWrapper";

const Dashboard = () => {
  return (
    <>
      <ParallexWrapper>
        <div
          className="bg-cover bg-center bg-no-repeat fixed top-0 left-0 right-0"
          style={{ backgroundImage: `url(${background})` }}
        >
          <TopNavbar />
          <Navbar />

          <section className="flex flex-col gap-16 mx-12 my-8">
            <div className="flex justify-between">
              <div className="flex flex-col gap-9">
                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
                  <h1 className="text-white text-5xl font-[Oxanium] font-bold">
                    Current Balance
                  </h1>
                  <div className="flex gap-2 items-center text-white text-lg py-2">
                    <CoinsIcon className="text-blue-700" />
                    <p> 0.00</p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
                  <h1 className="text-white text-5xl font-[Oxanium] font-bold">
                    Expense Amount
                  </h1>
                  <div className="flex gap-2 items-center text-white text-lg py-2">
                    <CoinsIcon className="text-blue-700" />
                    <p> 0.00</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
                  <h1 className="text-white text-5xl font-[Oxanium] font-bold">
                    Analytics Chart
                  </h1>
                  <div className="flex gap-2 items-center text-white text-lg py-2">
                    <CoinsIcon className="text-blue-700" />
                    <p> 0.00</p>
                  </div>
                </div>
            </div>

            <div>
              <h1 className="text-4xl mb-3 text-white font-bold">
                Expenses History
              </h1>
              <div className=" p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
                <table className="w-full text-left text-sm text-white">
                  <thead>
                    <tr className="uppercase text-white/60 text-xs border-b border-white/10">
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Description</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-white/10 transition">
                      <td className="py-3 px-4">Groceries</td>
                      <td className="py-3 px-4">
                        Monthly supermarket shopping
                      </td>
                      <td className="py-3 px-4">$120.00</td>
                      <td className="py-3 px-4 flex gap-2">
                        <button className="px-3 py-1 rounded-md bg-purple-500 text-white text-xs hover:bg-purple-600 transition">
                          Edit
                        </button>
                        <button className="px-3 py-1 rounded-md bg-red-500 text-white text-xs hover:bg-red-600 transition">
                          Delete
                        </button>
                      </td>
                    </tr>
                    {/* Repeat <tr> for more rows */}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </ParallexWrapper>
    </>
  );
};

export default Dashboard;
