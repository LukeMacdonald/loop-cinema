import React from "react";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <div className="col-md-9 col-sm-8" style={{ margin: '2rem 0' }}>  
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
