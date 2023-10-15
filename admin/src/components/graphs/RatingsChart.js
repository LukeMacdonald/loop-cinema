import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const RatingsChart = ({ data }) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    if (data.length === 0) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.font = '20px Arial';
      ctx.fillText('No data available', 10, 50);
      return;
    }
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
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'right', // Display legend to the right of the chart
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
    <div style={{width:'70%', marginTop:'3rem', marginLeft:'2rem'}}>
      <h5 style={{ marginBottom: '1rem' }}>Average Movie Ratings</h5>
      <canvas ref={chartRef} />;
    </div>
    )
};

export default RatingsChart;


