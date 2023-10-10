import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login"
import { useState } from "react";
import DashboardUsers from "./pages/DashboardUsers";
import DashboardMovies from "./pages/DashboardMovies";
import MovieForm from "./components/movies/movie/NewMovie";
import EditMovieForm from "./components/movies/movie/EditMovie";

function App() {
  const [username, setUsername] = useState(localStorage.getItem("user"));

  const loginUser = (username) => {
    localStorage.setItem('user', username);
    setUsername(username);
  }

  const logoutUser = () => {
    localStorage.removeItem('user');
    setUsername(null);
  };

  return (
    <div className="App">
      <Router>
        <main role="main" className="main">
          <Routes>
            <Route path="/" element={<Login loginUser={loginUser} />} />
            <Route path="/admin/" element={<Dashboard username={username} />} />
            <Route path="/admin/users" element={<DashboardUsers username={username}/>} />
            <Route path="/admin/movies" element={<DashboardMovies username={username} />} />
            <Route path="/admin/movies/add" element = {<MovieForm/>}/>
            <Route path="/admin/movies/edit/:id" element = {<EditMovieForm/>}/>
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;

