import { useEffect, useState } from "react";
import { getVehicles,deleteVehicle } from "../api/vehicleApi";

function Vehicles() {

    const [vehicles, setVehicles] = useState([]);
    
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