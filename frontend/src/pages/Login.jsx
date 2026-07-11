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
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;