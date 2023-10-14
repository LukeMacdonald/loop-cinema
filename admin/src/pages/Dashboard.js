import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { getAllMoviesViews, getGroupedReservations } from "../database/repository";
import MovieViewsChart from "../components/MovieViewsChart";
import ReservationChart from "../components/ReservationChart";


function Dashboard() {
  const [movie_views,setMovieViews] = useState([])
  const [reservations_total,setReservations] = useState([])


  useEffect(() => {
    async function fetchData() {
      try {
        // Call the API function to get data
        const views = await getAllMoviesViews();
        const reservations = await getGroupedReservations()
     
        
        // Update the state with the fetched data
        setMovieViews(views);
        setReservations(reservations)
      } catch (error) {
        // Handle errors if any
        console.error("Error fetching data:", error);
      }
    }

    // Invoke the fetch function when the component mounts
    fetchData();
  }, []); // Empty dependency array ensures the effect runs once after initial render



  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <div className="col-md-9 col-sm-8" style={{ margin: '2rem 0' }}>
          <h3>Total View Count of Movies</h3>  
          <div style={{width:'80%'}}>
            <MovieViewsChart data={movie_views} />
          </div>
          <h3>Total Reservations Booked For Past Week</h3>  
          <div style={{width:'80%'}}>
            <ReservationChart data={reservations_total} />
          </div>
        
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
