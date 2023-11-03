import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Box } from "@mui/material";

const ReportPage: React.FC<any> = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [1000, 2000, 1444, 2424, 1243, 1234, 1234],
        backgroundColor: "rgba(255, 99, 132)",
      },
      {
        label: "Dataset 2",
        data: [2000, 1800, 3544, 2424, 1643, 3234, 1234],
        backgroundColor: "rgba(53, 162, 235)",
      },
    ],
  };

  return (
    <Box sx={{ width: "80%", bgcolor: "white", p: 2 }}>
      <Bar options={options} data={data} />
    </Box>
  );
};

export default ReportPage;
