import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const ReviewsAverageChart = ({ data }) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const titles = data.map(item => item.title);
    const averages = data.map(item => item.average);

    if (chartInstance) {
      chartInstance.destroy();
    }

    const randomColors = Array.from({ length: averages.length }, () =>
      `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`
    );

    const newChartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: titles,
        datasets: [{
          data: averages,
          backgroundColor: randomColors,
          borderColor: randomColors.map(color => color.replace('0.2', '1')), // Darker border color
          borderWidth: 1,
        }]
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'bottom', // Display legend to the right of the chart
          },
        },
      },
    });

    setChartInstance(newChartInstance);

    return () => {
      if (newChartInstance) {
        newChartInstance.destroy();
      }
    };
  }, [data]);
  return (
    <div className="col-md-6">
        <div style={{ marginTop: '3rem', width:'80%' }}>
            <h3>Average Reviews Count of Movies</h3>
            <canvas ref={chartRef} />;
        </div>
    </div>
  )
};

export default ReviewsAverageChart;