import { useState, useEffect } from "react";
import "@/app/globals.css";
import Filters from "../components/Filters";
import { Bar } from "react-chartjs-2";
import { BarChart2Icon } from "lucide-react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DataItem {
  end_year: string;
  intensity: number;
  likelihood: number;
  relevance: number;
  topic: string;
  region: string;
  country: string;
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [filters, setFilters] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams(filters as any).toString();
      const response = await fetch(`/api/data?${queryParams}`, {
        cache: "no-store",
      });
      const result = await response.json();

      if (result.success) {
        setData(result.data);
      } else {
        console.error("Failed to fetch data:", result.error);
      }
    };

    fetchData();
  }, [filters]);

  const chartData = {
    labels: data.map((item) => item.topic),
    datasets: [
      {
        label: "Intensity",
        data: data.map((item) => item.intensity),
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
      {
        label: "Likelihood",
        data: data.map((item) => item.likelihood),
        backgroundColor: "rgba(255,99,132,0.4)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
      },
      {
        label: "Relevance",
        data: data.map((item) => item.relevance),
        backgroundColor: "rgba(153,102,255,0.4)",
        borderColor: "rgba(153,102,255,1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto bg-white bg-opacity-90 rounded-3xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          My Dashboard
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Filters onFilterChange={setFilters} />
          <div className="lg:col-span-2 bg-gradient-to-br from-green-400 to-cyan-500 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-white flex items-center">
              <BarChart2Icon className="mr-2" />
              Sales Chart
            </h2>
            <div className="bg-white bg-opacity-90 rounded-xl p-4">
            <Bar
              key={JSON.stringify(filters)} 
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  tooltip: {
                    callbacks: {
                      label: (context) =>
                        `${context.dataset.label}: ${context.raw}`,
                    },
                  },
                },
              }}
              style={{ width: "100%", height: "600px" }} 
            />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
