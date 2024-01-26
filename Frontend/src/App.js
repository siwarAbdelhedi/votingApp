import Login from './pages/login';
import LandingPage from './pages/landingPage';
import Register from './pages/register';
import './App.css';
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";


function App() {

  
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/landingPage" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
