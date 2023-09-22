import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import { useState } from "react";
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Review from "./pages/Review";
import Profile from "./pages/Profile";

import './styles/styles.css'


function App() {
  const [email, setEmail] = useState("");
  const loginUser = (email) => {
    setEmail(email);
  }

  const logoutUser = () => {
    setEmail(null);
  };

  
  return (
    <div className="App">
      <Router>
        <Header isLoggedIn={email !== null} email={email} loginUser={loginUser} logoutUser={logoutUser}/>
        <main role="main" className="main">
            <div className="container my-3">
              <Routes>
                <Route path="/" element={<Landing isLoggedIn={email !== null}/>}/>
                <Route path="/signup" element={<Signup loginUser={loginUser}/>} />
                <Route path="/signin" element={<Signin loginUser={loginUser}/>} />
                <Route path="/profile" element={<Profile email={email} logoutUser={logoutUser}/>}/>
                <Route path="/reviews/:movieID" element={<Review email = {email} isLoggedIn={email !== null}/>}/>
              </Routes>
            </div>
        </main>
        <Footer/>
      </Router> 
    </div>
  );
}

export default App;
