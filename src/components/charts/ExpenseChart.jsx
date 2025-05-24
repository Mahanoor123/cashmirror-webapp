import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ expenses }) => {
  const categories = {};
  expenses.forEach((expense) => {
    if (categories[expense.category]) {
      categories[expense.category] += expense.amount;
    } else {
      categories[expense.category] = expense.amount;
    }
  });

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(categories),
        backgroundColor: [
          "#a855f7", "#10b981", "#f59e0b", "#3b82f6", "#ef4444",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#fff" },
      },
    },
  };

 return (
  <div className="p-4 rounded-xl w-full h-[24rem]">
    <h2 className="text-white text-center font-bold text-lg mb-3">
      Expense Breakdown
    </h2>
    <div className="relative w-full h-full">
      <Pie data={data} options={options} />
    </div>
  </div>
);

};

export default ExpenseChart;
