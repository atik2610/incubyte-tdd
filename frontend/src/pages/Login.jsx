import { useState } from "react";
import { login } from "../api/authApi";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login({
        name,
        password,
      });

      localStorage.setItem("token", data.token);

      alert("Login Successful");
      console.log(data);
    } catch (err) {
      alert("ID OR PASSWORD IS WRONG");
    }
  };

  return (
    <div className="page">
      <div className="card auth-card">
        <h2>Login</h2>

        <p className="subtitle">
          Welcome back! Please login.
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

          <button className="btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;