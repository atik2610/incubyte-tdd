import { useState } from "react";
import { register } from "../api/authApi";

function Register() {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const message = await register({
        name,
        password,
        role
      });

      alert(message);

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="page">
      <div className="card auth-card">

        <h2>Register</h2>

        <p className="subtitle">
          Create a new account.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            className="input"
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            className="input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          <button className="btn" type="submit">
            Register
          </button>

        </form>

      </div>
    </div>
  );
}

export default Register;