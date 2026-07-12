import { useEffect, useState } from "react";
import {
    getVehicles,
    deleteVehicle,
    updateVehicle,
    purchaseVehicle,
    restockVehicle
} from "../api/vehicleApi";

function Vehicles() {

    const [vehicles, setVehicles] = useState([]);

    async function handleRestock(id) {

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
                prev.map(v => v.id === vehicle.id ? updated : v)
            );

        } catch (err) {
            alert(err.message);
        }
    }

    async function handleDelete(id) {

        if (!window.confirm("Delete this vehicle?")) {
            return;
        }

        try {

            await deleteVehicle(id);

            setVehicles(vehicles.filter(vehicle => vehicle.id !== id));

        } catch (err) {

            alert(err.message);
        }
    }

    useEffect(() => {

        async function loadVehicles() {
            try {
                const data = await getVehicles();
                setVehicles(data);
            } catch (err) {
                alert(err.message);
            }
        }

        loadVehicles();

    }, []);

    return (
        <div className="page">

            <div className="card" style={{ width: "700px" }}>

                <h2>Vehicles</h2>

                {vehicles.map(vehicle => (

                    <div key={vehicle.id} style={{ marginBottom: "20px" }}>

                        <p>Make : {vehicle.make}</p>

                        <p>Model : {vehicle.model}</p>
                        
                        <p>Category : {vehicle.category}</p>

                        <p>Price : ₹{vehicle.price}</p>

                        <p>Stock : {vehicle.quantity}</p>

                        <button onClick={() => handleRestock(vehicle.id)}>
                            Restock
                        </button>

                        <button onClick={() => handlePurchase(vehicle.id)}>
                            Purchase
                        </button>
                        
                        <button onClick={() => handleUpdate(vehicle)}>
                            Edit
                        </button>

                        <button onClick={() => handleDelete(vehicle.id)}>
                            Delete
                        </button>

                        <hr />

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Vehicles;