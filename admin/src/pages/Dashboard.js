import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { getAllMoviesViews, getGroupedReservations, getMoviesWithTotalReviews } from "../database/repository";
import MovieViewsChart from "../components/MovieViewsChart";
import ReservationChart from "../components/ReservationChart";
import MovieReviewsChart from "../components/MovieReviewsChart";


function Dashboard() {
  const [movie_views,setMovieViews] = useState([])
  const [reservations_total,setReservations] = useState([])
  const [movie_reviews, setMovieReviews] = useState([])


  useEffect(() => {
    async function fetchData() {
      try {
        // Call the API function to get data
        const views = await getAllMoviesViews();
        const reservations = await getGroupedReservations()
        const movies = await getMoviesWithTotalReviews()
        console.log(views)
        console.log(reservations)
        console.log(movies)
       
       
        // Update the state with the fetched data
        setMovieViews(views);
        setReservations(reservations)
        setMovieReviews(movies)
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
          <div className="row">
            <div className="col-md-4">
            <h3>Total View Count of Movies</h3>  
            <MovieViewsChart data={movie_views} />
            </div>
            <div className="col-md-8"> 
            <h3>Total Reservations Booked For Past Week</h3>  
            <ReservationChart data={reservations_total} />
            </div>

          </div>
          <div style={{width:'80%', marginTop:'3rem', marginLeft:'2rem'}}>
          <h3>Total Reviews Per Movie</h3>  
          <MovieReviewsChart data={movie_reviews}/>
          </div>
          
        
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
