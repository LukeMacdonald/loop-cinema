import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const ViewsChart = ({ data }) => {
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
    const views = data.map(item => item.views);

    if (chartInstance) {
      chartInstance.destroy();
    }

    const randomColors = Array.from({ length: views.length }, () =>
      `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`
    );

    const newChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: titles,
        datasets: [{
          data: views,
          backgroundColor: randomColors,
          borderColor: randomColors.map(color => color.replace('0.2', '1')), // Darker border color
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

  return (
    <div className="col-md-6" style={{ marginLeft:'1rem'}}>
        <div style={{ marginTop: '1rem', width:'100%' }}>
          <h5 style={{ marginBottom: '1rem' }}>Total View Count of Movies</h5>
          <canvas ref={chartRef} />
        </div>
    </div>
  )
};

export default ViewsChart;



