function Home() {
  const token = localStorage.getItem("token");

  return (
    <div className="page">
      <div className="card home-card">
        <h2>Welcome 👋</h2>

        <p className="subtitle">
          React Authentication Demo
        </p>

        <div className="status">
          <span className={token ? "badge success" : "badge danger"}>
            {token ? "Logged In ✅" : "Not Logged In ❌"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Home;