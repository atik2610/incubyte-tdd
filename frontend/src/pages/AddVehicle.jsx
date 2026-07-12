import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createVehicle } from "../api/vehicleApi";

function AddVehicle() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        make: "",
        model: "",
        category: "",
        price: "",
        quantity: ""
    });

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            await createVehicle({
                ...form,
                price: Number(form.price),
                quantity: Number(form.quantity)
            });

            alert("Vehicle added successfully!");

            navigate("/vehicles");

        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div className="page">

            <div className="card add-vehicle-card">

                <div className="form-header">

                    <h2>Add New Vehicle</h2>

                    <p className="subtitle">
                        Fill in the details below to add a new vehicle to the inventory.
                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-grid">

                        <input
                            className="input"
                            type="text"
                            name="make"
                            placeholder="Vehicle Make"
                            value={form.make}
                            onChange={handleChange}
                            required
                        />

                        <input
                            className="input"
                            type="text"
                            name="model"
                            placeholder="Vehicle Model"
                            value={form.model}
                            onChange={handleChange}
                            required
                        />

                        <input
                            className="input"
                            type="text"
                            name="category"
                            placeholder="Category"
                            value={form.category}
                            onChange={handleChange}
                            required
                        />

                        <input
                            className="input"
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={form.price}
                            onChange={handleChange}
                            required
                        />

                        <input
                            className="input"
                            type="number"
                            name="quantity"
                            placeholder="Available Stock"
                            value={form.quantity}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <button
                        className="btn add-btn"
                        type="submit"
                    >
                        Add Vehicle
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AddVehicle;