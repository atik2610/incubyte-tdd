const BASE_URL = "http://localhost:8080/api/vehicles";

function getToken() {
    return localStorage.getItem("token");
}

export async function getVehicles() {

    const response = await fetch(BASE_URL, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
}

export async function createVehicle(vehicle) {

    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(vehicle)
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
}