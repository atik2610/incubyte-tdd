import { useEffect, useState } from "react";
import {
    getVehicles,
    searchVehicles,
    deleteVehicle,
    updateVehicle,
    purchaseVehicle,
    restockVehicle
} from "../api/vehicleApi";

function Vehicles() {

    const [vehicles, setVehicles] = useState([]);

    const [search, setSearch] = useState({
        make: "",
        model: "",
        category: "",
        minPrice: "",
        maxPrice: ""
    });

    const isAdmin = localStorage.getItem("role") === "ROLE_ADMIN";

    async function loadVehicles() {

        try {

            const data = await getVehicles();
            setVehicles(data);

        } catch (err) {
            alert(err.message);
        }
    }

    useEffect(() => {
        loadVehicles();
    }, []);

    async function handleSearch(e) {

        e.preventDefault();

        try {

            const data = await searchVehicles(search);
            setVehicles(data);

        } catch (err) {
            alert(err.message);
        }
    }

    async function handleRestock(id) {

        if (!isAdmin) return;

        try {

            const updatedVehicle = await restockVehicle(id);

            setVehicles(prev =>
                prev.map(vehicle =>
                    vehicle.id === id ? updatedVehicle : vehicle
                )
            );

        } catch (err) {
            alert(err.message);
        }
    }

    async function handlePurchase(id) {

        try {

            const updatedVehicle = await purchaseVehicle(id);

            setVehicles(prev =>
                prev.map(vehicle =>
                    vehicle.id === id ? updatedVehicle : vehicle
                )
            );

        } catch (err) {
            alert(err.message);
        }
    }

    async function handleUpdate(vehicle) {

        if (!isAdmin) return;

        const updatedVehicle = {
            make: prompt("Make", vehicle.make),
            model: prompt("Model", vehicle.model),
            category: prompt("Category", vehicle.category),
            price: Number(prompt("Price", vehicle.price)),
            quantity: Number(prompt("Quantity", vehicle.quantity))
        };

        if (
            updatedVehicle.make === null ||
            updatedVehicle.model === null ||
            updatedVehicle.category === null
        ) {
            return;
        }

        try {

            const updated = await updateVehicle(vehicle.id, updatedVehicle);

            setVehicles(prev =>
                prev.map(v =>
                    v.id === vehicle.id ? updated : v
                )
            );

        } catch (err) {
            alert(err.message);
        }
    }

    async function handleDelete(id) {

        if (!isAdmin) return;

        if (!window.confirm("Delete this vehicle?")) {
            return;
        }

        try {

            await deleteVehicle(id);

            setVehicles(prev =>
                prev.filter(vehicle => vehicle.id !== id)
            );

        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div className="page">

            <div className="card" style={{ width: "700px" }}>

                <h2>Vehicles</h2>

                <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>

                    <input
                        type="text"
                        placeholder="Make"
                        value={search.make}
                        onChange={(e) =>
                            setSearch({ ...search, make: e.target.value })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Model"
                        value={search.model}
                        onChange={(e) =>
                            setSearch({ ...search, model: e.target.value })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Category"
                        value={search.category}
                        onChange={(e) =>
                            setSearch({ ...search, category: e.target.value })
                        }
                    />

                    <input
                        type="number"
                        placeholder="Min Price"
                        value={search.minPrice}
                        onChange={(e) =>
                            setSearch({ ...search, minPrice: e.target.value })
                        }
                    />

                    <input
                        type="number"
                        placeholder="Max Price"
                        value={search.maxPrice}
                        onChange={(e) =>
                            setSearch({ ...search, maxPrice: e.target.value })
                        }
                    />

                    <button type="submit">
                        Search
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setSearch({
                                make: "",
                                model: "",
                                category: "",
                                minPrice: "",
                                maxPrice: ""
                            });
                            loadVehicles();
                        }}
                    >
                        Show All
                    </button>

                </form>

                <hr />

                {vehicles.length === 0 ? (
                    <p>No vehicles found.</p>
                ) : (
                    vehicles.map(vehicle => (

                        <div key={vehicle.id} style={{ marginBottom: "20px" }}>

                            <p><strong>Make:</strong> {vehicle.make}</p>

                            <p><strong>Model:</strong> {vehicle.model}</p>

                            <p><strong>Category:</strong> {vehicle.category}</p>

                            <p><strong>Price:</strong> ₹{vehicle.price}</p>

                            <p><strong>Stock:</strong> {vehicle.quantity}</p>

                            {isAdmin && (
                                <>
                                    <button onClick={() => handleRestock(vehicle.id)}>
                                        Restock
                                    </button>

                                    <button onClick={() => handleUpdate(vehicle)}>
                                        Edit
                                    </button>

                                    <button onClick={() => handleDelete(vehicle.id)}>
                                        Delete
                                    </button>
                                </>
                            )}

                            <button onClick={() => handlePurchase(vehicle.id)}>
                                Purchase
                            </button>

                            <hr />

                        </div>

                    ))
                )}

            </div>

        </div>
    );
}

export default Vehicles;