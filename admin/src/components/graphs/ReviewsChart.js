import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const ReviewsChart = ({ data }) => {
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
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'top', // Display legend to the right of the chart
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
    <div style={{ marginTop: '3rem', marginLeft:'2rem'}}>
      <h5>Total Reviews Per Movie</h5>  
      <canvas ref={chartRef} />;
    </div>
    </div>
    )
};

export default ReviewsChart;
