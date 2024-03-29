import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/navigation/Header";
import Footer from "./components/navigation/Footer";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import MovieReview from "./pages/MovieReview";
import MoviePage from "./pages/MoviePage";
import Profile from "./pages/Profile";
import "./styles/styles.css";
import Reservation from "./components/profile/reservations/Reservation";
import { AuthProvider } from "./AuthContext";
import ProfileReservation from "./pages/ProfileReservation";
import Home from "./pages/Home";
import zIndex from "@mui/material/styles/zIndex";

function App() {
  return (
    <AuthProvider>
      <div
        className="App min-h-screen"
        style={{ backgroundColor: "#1A1D1A", zIndex: -10 }}
      >
        <Router>
          <Header />
          <main role="main">
            <div className="">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route
                  path="/profile/details/:username"
                  element={<Profile />}
                />
                <Route
                  path="/profile/bookings/:username"
                  element={<ProfileReservation />}
                />
                <Route path="/movie/details/:movieID" element={<MoviePage />} />
                <Route
                  path="/movie/reviews/:movieID"
                  element={<MovieReview />}
                />
                <Route
                  path="/reservation/:movieID/:sessionID"
                  element={<Reservation />}
                />
              </Routes>
            </div>
          </main>
          {/* <Footer /> */}
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
