function Home() {
  const token = localStorage.getItem("token");

  return (
    <div>
      <h2>Home</h2>

      <p>{token ? "Logged In ✅" : "Not Logged In ❌"}</p>

    </div>
  );
}

export default Home;