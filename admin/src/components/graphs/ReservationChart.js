import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const ReservationChart = ({ data }) => {
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

    const dates = data.map(item => item.createdAt);
    const totalReservations = data.map(item => item.totalReservations);

    if (chartInstance) {
      chartInstance.destroy();
    }

    const newChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Total Reservations',
          data: totalReservations,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderDash: [5, 5],
          borderWidth: 3,
        }],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: '',
          },
        },
      }
    });

    setChartInstance(newChartInstance);

    return () => {
      if (newChartInstance) {
        newChartInstance.destroy();
      }
    };
  }, [data]);

  return (
    <div style={{ width: '90%', marginTop: '2rem', marginLeft: '2rem' }}>
      <h5>Total Reservations Booked For Past Day</h5>
      <canvas ref={chartRef} width={400} height={200} />
    </div>
  );
};

export default ReservationChart;

