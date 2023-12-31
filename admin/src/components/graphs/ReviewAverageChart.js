import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const ReviewsAverageChart = ({ data }) => {
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
    const percentages = data.map(item => (item.average * 100).toFixed(2)); // Convert to percentages with 2 decimal places

    if (chartInstance) {
      chartInstance.destroy();
    }

    const randomColors = Array.from({ length: percentages.length }, () =>
      `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`
    );

    const newChartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: titles,
        datasets: [{
          data: percentages,
          backgroundColor: randomColors,
          borderColor: randomColors.map(color => color.replace('0.2', '1')), 
          borderWidth: 1,
        }]
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return `${data.labels[tooltipItem.index]}: ${data.datasets[0].data[tooltipItem.index]}%`;
            }
          }
        }
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
    <div className="col-md-5" style={{ marginLeft: '3rem' }}>
      <div style={{ marginTop: '3rem', width: '80%' }}>
        <h5 style={{ marginBottom: '3rem' }}>Distribution of Reviews (%)</h5>
        <canvas ref={chartRef} width={400} height={200} />
      </div>
    </div>
  )
};

export default ReviewsAverageChart;

