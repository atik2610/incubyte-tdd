function Home() {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    return (

        <div className="page">

            <div className="card home-card">

                <h2>🚗 Vehicle Dealership Management System</h2>

                <p className="subtitle">
                    Manage your dealership with ease. Search available vehicles,
                    purchase inventory, and, if you're an administrator,
                    efficiently add, update, restock, and manage vehicles through
                    a simple and intuitive dashboard.
                </p>

                <div className="status">

                    <span className={token ? "badge success" : "badge danger"}>
                        {token
                            ? `Logged in as ${role === "ROLE_ADMIN" ? "Administrator" : "User"}`
                            : "You are not logged in"}
                    </span>

                </div>

                <div className="home-features">

                    <div className="feature-card">
                        🔍
                        <h4>Search Vehicles</h4>
                        <p>Find vehicles by make, model, category, or price range.</p>
                    </div>

                    <div className="feature-card">
                        🛒
                        <h4>Purchase</h4>
                        <p>Purchase available vehicles with a single click.</p>
                    </div>

                    <div className="feature-card">
                        🛠️
                        <h4>Inventory</h4>
                        <p>Administrators can add, edit, delete, and restock vehicles.</p>
                    </div>

                </div>

            </div>

        </div>

    );
}

export default Home;