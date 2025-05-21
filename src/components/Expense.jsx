import ParallexWrapper from "./ParallexWrapper";
import background from "../assets/cm-background.jpg";
import TopNavbar from "../components/TopNavbar";
import Navbar from "../components/Navbar";

const Expense = () => {
  return (
    <ParallexWrapper>
      <div
        className="bg-cover bg-center bg-no-repeat w-full min-h-screen"
        style={{ backgroundImage: `url(${background})` }}
      >
        <TopNavbar />
        <Navbar />
        <section className="py-16">
          <form className="backdrop-blur-md bg-white/10 border border-white/30 rounded-2xl p-8 w-[35vw] mx-auto shadow-xl text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Add New Expense
            </h2>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="title"
                placeholder="Expense Title"
                required
                className="bg-white/20 px-4 py-2 rounded-md placeholder-white focus:outline-none"
              />

              <input
                type="number"
                name="amount"
                placeholder="Amount (Rs)"
                required
                className="bg-white/20 px-4 py-2 rounded-md placeholder-white focus:outline-none"
              />

              <select
                name="category"
                required
                className="bg-white/20 px-4 py-2 rounded-md text-white focus:outline-none"
              >
                <option value="">Select Category</option>
                <option value="Food">🍔 Food</option>
                <option value="Travel">✈️ Travel</option>
                <option value="Shopping">🛍️ Shopping</option>
                <option value="Bills">📩 Bills</option>
                <option value="Others">📦 Others</option>
              </select>

              <input
                type="date"
                name="date"
                required
                className="bg-white/20 px-4 py-2 rounded-md focus:outline-none text-white"
              />

              <textarea
                name="note"
                placeholder="Optional Note"
                rows={3}
                className="bg-white/20 px-4 py-2 rounded-md placeholder-white focus:outline-none resize-none"
              />

              <button
                type="submit"
                className="bg-purple-600 text-white font-semibold px-6 py-2 mt-4 rounded-md hover:bg-purple-700 transition-all"
              >
                Submit Expense
              </button>
            </div>
          </form>
        </section>
      </div>
    </ParallexWrapper>
  );
};

export default Expense;
