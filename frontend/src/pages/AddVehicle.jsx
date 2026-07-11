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
    quantity: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createVehicle({
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity),
      });

      alert("Vehicle added successfully!");

      navigate("/vehicles");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="page">
      <div className="card auth-card">

        <h2>Add Vehicle</h2>

        <p className="subtitle">
          Enter vehicle details.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            className="input"
            type="text"
            name="make"
            placeholder="Make"
            value={form.make}
            onChange={handleChange}
          />

          <input
            className="input"
            type="text"
            name="model"
            placeholder="Model"
            value={form.model}
            onChange={handleChange}
          />

          <input
            className="input"
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
          />

          <input
            className="input"
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
          />

          <input
            className="input"
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
          />

          <button className="btn" type="submit">
            Add Vehicle
          </button>

        </form>

      </div>
    </div>
  );
}

export default AddVehicle;