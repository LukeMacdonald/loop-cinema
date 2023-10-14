import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { getAllMoviesViews } from "../database/repository";
import MovieViewsChart from "../components/MovieViewsChart";


function Dashboard() {
  const [data,setData] = useState([])


  useEffect(() => {
    async function fetchData() {
      try {
        // Call the API function to get data
        const result = await getAllMoviesViews();
        console.log(result)
        
        // Update the state with the fetched data
        setData(result);
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
            <MovieViewsChart data={data} />
          </div>
        
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
