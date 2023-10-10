import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import MovieReviews from './pages/MovieReviews';
import Profile from './pages/Profile';
import './styles/styles.css';
import Reservation from './components/reservations/Reservation';
import { AuthProvider } from './AuthContext'

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Header />
          <main role="main" className="main">
            <div className="container my-3">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/profile/:username" element={<Profile />} />
                <Route path="/reviews/:movieID" element={<MovieReviews />} />
                <Route path="/reservation/:movieID/:sessionID" element={<Reservation />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;

