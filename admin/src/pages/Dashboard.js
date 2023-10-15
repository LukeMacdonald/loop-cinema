import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { 
  getAllMoviesViews,
  getGroupedReservations, 
  getMoviesWithAverageReviews, 
  getMoviesWithRating, 
  getMoviesWithTotalReviews } from "../database/repository";
import ViewsChart from "../components/graphs/ViewsChart";
import ReservationChart from "../components/graphs/ReservationChart";
import ReviewsChart from "../components/graphs/ReviewsChart";
import RatingsChart from "../components/graphs/RatingsChart";
import ReviewsAverageChart from "../components/graphs/ReviewAverageChart";


function Dashboard() {
  const [movie_views,setMovieViews] = useState([])
  const [reservations_total,setReservations] = useState([])
  const [movie_reviews, setMovieReviews] = useState([])
  const [reviews_average, setAverageReviews] = useState([])
  const [movie_ratings, setRatings] = useState([])


  useEffect(() => {
    async function fetchData() {
      try {
        // Call the API function to get data
        const views = await getAllMoviesViews();
        const reservations = await getGroupedReservations();
        const movies = await getMoviesWithTotalReviews();
        const ratings = await getMoviesWithRating();
        const review_average = await getMoviesWithAverageReviews()
        console.log(review_average)
       
       
        // Update the state with the fetched data
        setMovieViews(views);
        setReservations(reservations)
        setMovieReviews(movies)
        setRatings(ratings)
        setAverageReviews(review_average)
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
        <div style={{marginLeft:'2rem'}}>
          <h1 style={{fontWeight:'bold'}}>Loop Cinema Analytics</h1>
            <h2 style={{marginTop:'3rem'}}>Analytics of Customer Reservations</h2>
            <hr/>
          </div>
          <ReservationChart data={reservations_total} />
          <div style={{marginLeft:'2rem'}}>
            <h2>Analytics of Movie Reviews</h2>
            <hr/>
          </div>
          
          <div className="row" style={{marginLeft:'1rem'}}>
            <ReviewsChart data={movie_reviews}/>
            <ReviewsAverageChart data={reviews_average} />
            
          </div>
          <div style={{marginLeft:'2rem'}}>
            <h2>Analytics of Movie Page Visits</h2>
            <hr/>
          </div>
          <div className="row" style={{marginLeft:'1rem'}}>
            <ViewsChart data={movie_views} />
          </div>
          <div style={{marginLeft:'2rem'}}>
            <h2>Analytics of Movie Ratings</h2>
            <hr/>
          </div>
          
          <RatingsChart data={movie_ratings} />      
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
