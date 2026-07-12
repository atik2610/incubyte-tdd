import { BrowserRouter, Routes, Route, NavLink, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Vehicles from "./pages/Vehicles";
import AddVehicle from "./pages/AddVehicle";

function AppContent() {
  // Re-renders this component whenever the route changes
  useLocation();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const isLoggedIn = !!token;
  const isAdmin = role === "ROLE_ADMIN";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">WELCOME</div>

        <div className="nav-links">
          <NavLink to="/">Home</NavLink>

          <NavLink to="/vehicles">Vehicles</NavLink>

          {isAdmin && (
            <NavLink to="/vehicles/new">
              Add Vehicle
            </NavLink>
          )}

          {!isLoggedIn && (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}

          {isLoggedIn && (
            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/vehicles/new" element={<AddVehicle />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;