import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const MovieRatingsChart = ({ data }) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const titles = data.map(item => item.title);
    const ratings = data.map(item => item.rating);
    
    if (chartInstance) {
      chartInstance.destroy();
    }
    const newChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: titles,
        datasets: [{
          label: 'Average Rating',
          data: ratings,
          backgroundColor: 'rgba(17, 149, 98, 0.8)',
          borderColor: 'rgba(17, 149, 98, 0.8)',
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

  return <canvas ref={chartRef} />;
};

export default MovieRatingsChart;


