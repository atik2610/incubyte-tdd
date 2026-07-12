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

    const isLoggedIn = !!localStorage.getItem("token");
    const isAdmin = localStorage.getItem("role") === "ROLE_ADMIN";

    useEffect(() => {
        loadVehicles();
    }, []);

    async function loadVehicles() {
        try {
            const data = await getVehicles();
            setVehicles(data);
        } catch (err) {
            alert(err.message);
        }
    }

    async function handleSearch(e) {
        e.preventDefault();

        try {
            const data = await searchVehicles(search);
            setVehicles(data);
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

            <div className="vehicle-page">

                {/* Search Section */}

                <div className="card search-card">

                    <h2>Search Vehicles</h2>

                    <form onSubmit={handleSearch}>

                        <input
                            className="input"
                            type="text"
                            placeholder="Make"
                            value={search.make}
                            onChange={(e) =>
                                setSearch({
                                    ...search,
                                    make: e.target.value
                                })
                            }
                        />

                        <input
                            className="input"
                            type="text"
                            placeholder="Model"
                            value={search.model}
                            onChange={(e) =>
                                setSearch({
                                    ...search,
                                    model: e.target.value
                                })
                            }
                        />

                        <input
                            className="input"
                            type="text"
                            placeholder="Category"
                            value={search.category}
                            onChange={(e) =>
                                setSearch({
                                    ...search,
                                    category: e.target.value
                                })
                            }
                        />

                        <input
                            className="input"
                            type="number"
                            placeholder="Min Price"
                            value={search.minPrice}
                            onChange={(e) =>
                                setSearch({
                                    ...search,
                                    minPrice: e.target.value
                                })
                            }
                        />

                        <input
                            className="input"
                            type="number"
                            placeholder="Max Price"
                            value={search.maxPrice}
                            onChange={(e) =>
                                setSearch({
                                    ...search,
                                    maxPrice: e.target.value
                                })
                            }
                        />

                        <div className="search-actions">

                        <button className="search-btn" type="submit">
                            Search
                        </button>

                        <button
                            className="show-btn"
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

                        </div>

                    </form>

                </div>

                {/* Vehicle List */}

                {vehicles.length === 0 ? (

                    <div className="empty">
                        No vehicles found.
                    </div>

                ) : (

                    <div className="vehicle-grid">

                        {vehicles.map(vehicle => (

                            <div
                                key={vehicle.id}
                                className="vehicle-card"
                            >

                                <h3>
                                    {vehicle.make} {vehicle.model}
                                </h3>

                                <div className="vehicle-category">
                                    {vehicle.category}
                                </div>

                                <p className="vehicle-price">
                                    ₹{vehicle.price.toLocaleString()}
                                </p>

                                <div className="stock">
                                    Stock : {vehicle.quantity}
                                </div>

                                <div className="vehicle-actions">

                                    {isLoggedIn && (
                                        <button
                                            className="purchase-btn"
                                            onClick={() => handlePurchase(vehicle.id)}
                                        >
                                            Purchase
                                        </button>
    )}

                                    {isAdmin && (
                                        <>
                                            <button
                                                className="restock-btn"
                                                onClick={() =>
                                                    handleRestock(vehicle.id)
                                                }
                                            >
                                                Restock
                                            </button>

                                            <button
                                                className="edit-btn"
                                                onClick={() =>
                                                    handleUpdate(vehicle)
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    handleDelete(vehicle.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default Vehicles;