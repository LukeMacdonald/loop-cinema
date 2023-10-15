import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const ViewsChartPie = ({ data }) => {
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
      const totalViews = data.reduce((acc, item) => acc + item.views, 0);
      const percentages = data.map(item => ((item.views / totalViews) * 100).toFixed(2));
  
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
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  return `${data.labels[tooltipItem.index]}: ${data.datasets[0].data[tooltipItem.index]}%`;
                }
              }
            }
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
    <div className="col-md-4" style={{ marginLeft:'1rem'}}>
        <div style={{ marginTop: '1rem', width:'100%' }}>
          <h5 style={{ marginBottom: '1rem' }}>Distribution of Visits Across Site (%)</h5>
          <canvas ref={chartRef} />;
        </div>
    </div>
  )
};

export default ViewsChartPie;
