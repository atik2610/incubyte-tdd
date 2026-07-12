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

export async function deleteVehicle(id) {

    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }
}

export async function updateVehicle(id, vehicle) {

    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
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

export async function purchaseVehicle(id) {

    const response = await fetch(`${BASE_URL}/${id}/purchase`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
}