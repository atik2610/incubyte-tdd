import { useState } from "react";
import { register } from "../api/authApi";

function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const message = await register({
        name,
        password,
      });

      alert(message);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>

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

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;