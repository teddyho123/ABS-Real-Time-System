import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/simulate")
      .then((res) => res.json())
      .then((data) => {
        setChartData({
          labels: data.time,
          datasets: [
            {
              label: "Car Speed (m/s)",
              data: data.car_speeds,
              borderColor: "blue",
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Wheel Speed (m/s)",
              data: data.wheel_speeds,
              borderColor: "green",
              borderWidth: 2,
              fill: false,
            },
          ],
        });
      });
  }, []);

  return (
    <div style={{ width: "90%", margin: "40px auto" }}>
      <h2>ABS Real-Time System Simulation</h2>
      {chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Car vs. Wheel Speed Over Time",
              },
              legend: {
                position: "top",
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Time (s)",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Speed (m/s)",
                },
              },
            },
          }}
        />
      ) : (
        <p>Loading simulation data...</p>
      )}
    </div>
  );
}

export default App;
