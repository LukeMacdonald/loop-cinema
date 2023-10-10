import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import DashboardUsers from "./pages/DashboardUsers";
import DashboardMovies from "./pages/DashboardMovies";
import MovieForm from "./components/movies/movie/NewMovie";
import EditMovieForm from "./components/movies/movie/EditMovie";
import './assets/styles/pages.css'
import './assets/styles/styles.css'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <main role="main" className="main">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/admin/" element={<Dashboard />} />
              <Route path="/admin/users" element={<DashboardUsers />} />
              <Route path="/admin/movies" element={<DashboardMovies />} />
              <Route path="/admin/movies/add" element={<MovieForm />} />
              <Route path="/admin/movies/edit/:id" element={<EditMovieForm />} />
            </Routes>
          </main>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;

