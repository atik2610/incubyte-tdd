import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Vehicles from "./pages/Vehicles";
import AddVehicle from "./pages/AddVehicle";

function App() {
  return (
    <BrowserRouter>

      <nav className="navbar">
        <div className="logo">
          Auth Demo
        </div>

        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/vehicles">Vehicles</NavLink>
          <NavLink to="/vehicles/new">Add Vehicle</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
          <button
            className="logout-button"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/vehicles/new" element={<AddVehicle />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;