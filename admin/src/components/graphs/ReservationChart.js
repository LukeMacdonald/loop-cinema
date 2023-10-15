import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const ReservationChart = ({ data }) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
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
          borderDash: [5, 5], // Dashed line style

          borderWidth: 3,
          
        }],
       
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: '', // Display legend to the right of the chart
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
    <div style={{width:'90%', marginTop:'3rem', marginLeft:'2rem'}}> 
      <h3>Total Reservations Booked For Past Week</h3>  
      <canvas ref={chartRef} />;
    </div>
    )
};

export default ReservationChart;
