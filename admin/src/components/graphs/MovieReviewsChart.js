import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const MovieReviewsChart = ({ data }) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const titles = data.map(item => item.title);
    const reviews = data.map(item => item.count);

    if (chartInstance) {
      chartInstance.destroy();
    }

    const newChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: titles,
        datasets: [{
          label: 'Total Reviews',
          data: reviews,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 0.2)',
          borderWidth: 1,
        }]
      },
    });

    setChartInstance(newChartInstance);

    return () => {
      if (newChartInstance) {
        newChartInstance.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef}/>;
};

export default MovieReviewsChart;
