import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { 
  getAllMoviesViews,
  getGroupedReservations, 
  getMoviesWithRating, 
  getMoviesWithTotalReviews } from "../database/repository";
import MovieViewsChart from "../components/graphs/MovieViewsChart";
import ReservationChart from "../components/graphs/ReservationChart";
import MovieReviewsChart from "../components/graphs/MovieReviewsChart";
import MovieRatingsChart from "../components/graphs/MovieRatingsChart";


function Dashboard() {
  const [movie_views,setMovieViews] = useState([])
  const [reservations_total,setReservations] = useState([])
  const [movie_reviews, setMovieReviews] = useState([])
  const [movie_ratings, setRatings] = useState([])


  useEffect(() => {
    async function fetchData() {
      try {
        // Call the API function to get data
        const views = await getAllMoviesViews();
        const reservations = await getGroupedReservations();
        const movies = await getMoviesWithTotalReviews();
        const ratings = await getMoviesWithRating();
        console.log(ratings)
       
       
        // Update the state with the fetched data
        setMovieViews(views);
        setReservations(reservations)
        setMovieReviews(movies)
        setRatings(ratings)
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
          </div>
          <div style={{width:'70%', marginTop:'3rem', marginLeft:'2rem'}}>
          <h3>Total Reservations Booked For Past Week</h3>  
            <ReservationChart data={reservations_total} />
          </div>   
          <div style={{width:'70%', marginTop:'3rem', marginLeft:'2rem'}}>
            <h3>Total Reviews Per Movie</h3>  
            <MovieReviewsChart data={movie_reviews}/>
          </div>
          <div style={{width:'70%', marginTop:'3rem', marginLeft:'2rem'}}>
            <h3>Total Reservations Booked For Past Week</h3>  
            <MovieRatingsChart data={movie_ratings} />
          </div>        
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
