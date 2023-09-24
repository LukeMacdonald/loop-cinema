import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import './App.css'
import Dashboard from "./pages/Dashboard";

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
        <main role="main" className="main">
          <Routes>
            <Route path="/" element={<Login loginUser={loginUser}/>}/>
            <Route path="/admin" element={<Dashboard username={username}/>}/>
          </Routes>
        </main>
      </Router> 
    </div>
  );
}

export default App;
