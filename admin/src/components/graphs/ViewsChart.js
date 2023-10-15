import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const ViewsChart = ({ data }) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const titles = data.map(item => item.title);
    const views = data.map(item => item.views);

    if (chartInstance) {
      chartInstance.destroy();
    }

    const randomColors = Array.from({ length: views.length }, () =>
      `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`
    );

    const newChartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: titles,
        datasets: [{
          data: views,
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
            <h3>Total View Count of Movies</h3>
            <canvas ref={chartRef} />;
        </div>
    </div>
  )
};

export default ViewsChart;



