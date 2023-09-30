import React from "react";
import Sidebar from "../components/Sidebar";
import Movies from "../components/movies/Movies";

function DashboardMovies() {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <div className="col-md-9 col-sm-8" style={{ margin: '2rem 0' }}>
          <Movies />; 
        </div>
      </div>
    </div>
  );
}

export default DashboardMovies;
