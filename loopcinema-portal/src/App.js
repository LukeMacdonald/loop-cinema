import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import { useState } from "react";
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import MovieReviews from "./pages/MovieReviews";
import Profile from "./pages/Profile";

import './styles/styles.css'
import Reservation from "./components/reservations/Reservation";


function App() {
  const [username, setUsername] = useState(localStorage.getItem("user"));
  const loginUser = (username) => {
    localStorage.setItem('user',username);
    setUsername(username);
  }

  const logoutUser = () => {
    localStorage.removeItem('user')
    setUsername(null);
  };

  return (
    <div className="App">
      <Router>
        <Header isLoggedIn={username !== null} username={username} loginUser={loginUser} logoutUser={logoutUser}/>
        <main role="main" className="main">
            <div className="container my-3">
              <Routes>
                <Route path="/" element={<Landing isLoggedIn={username !== null}/>}/>
                <Route path="/signup" element={<Signup loginUser={loginUser}/>} />
                <Route path="/signin" element={<Signin loginUser={loginUser}/>} />
                <Route path="/profile/:username" element={<Profile logoutUser={logoutUser}/>}/>
                <Route path="/reviews/:movieID" element={<MovieReviews username = {username} isLoggedIn={username !== null}/>}/>
                <Route path="/reservation/:movieID/:sessionID" element={<Reservation username = {username} isLoggedIn={username !== null}/>}/>
              </Routes>
            </div>
        </main>
        <Footer/>
      </Router> 
    </div>
  );
}

export default App;
