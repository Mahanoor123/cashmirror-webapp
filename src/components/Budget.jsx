import ParallexWrapper from "./ParallexWrapper";
import background from "../assets/expense-bg2.jpg";
import TopNavbar from "../components/TopNavbar";
import Navbar from "../components/Navbar";

const Budget = () => {
  return (
    <>
      <ParallexWrapper>
        <div className="bg-cover bg-center bg-no-repeat h-screen w-screen fixed top-0 left-0"
              style={{ backgroundImage: `url(${background})` }}>
                <TopNavbar />
                <Navbar />

          <div className="flex justify-between gap-6">
            <div className="ml-20 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg ">
                <h1 className="text-white text-xl">Add Transaction</h1>
                <textarea className="border-[1px] border-slate-100 p-2 rounded" name="transacrtion" id="expense" placeholder="Enter description">

                </textarea>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg ">

            </div>
          </div>

        </div>
      </ParallexWrapper>
    </>
  );
};

export default Budget;
