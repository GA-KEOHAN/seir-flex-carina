import React, { useEffect } from "react";
import Chart from "chart.js";

const BarChart = () => {
  const prepareData = (data) => {
    const chartData = {
      labels: [],
      datasets: [
        {
          label: "Avg high temps",
          data: [],
        },
        {
          label: "Avg low temps",
          data: [],
        },
      ],
    };

    data.temperatures.forEach((temperature) => {
      chartData.labels.push(temperature.month);
      chartData.datasets[0].data.push(temperature.average_high_f);
      chartData.datasets[1].data.push(temperature.average_low_f);
    });
    return chartData;
  };

  const createChart = (data) => {
    const ctx = document.querySelector("#temperatures");
    const tempsChart = new Chart(ctx, {
      type: "bar",
      data: data,
    });
  };

  const getData = async () => {
    try {
      const response = await fetch("/locations/1");
      const response_json = await response.json();
      const jData = await prepareData(response_json);
      createChart(jData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1>Temperatures</h1>
      <canvas id="temperatures" width="300" height="100"></canvas>
    </>
  );
};

export default BarChart;
