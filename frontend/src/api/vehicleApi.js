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

export async function restockVehicle(id) {

    const response = await fetch(`${BASE_URL}/${id}/restock`, {
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

export async function searchVehicles(search) {

    const params = new URLSearchParams();

    if (search.make)
        params.append("make", search.make);

    if (search.model)
        params.append("model", search.model);

    if (search.category)
        params.append("category", search.category);

    if (search.minPrice)
        params.append("minPrice", search.minPrice);

    if (search.maxPrice)
        params.append("maxPrice", search.maxPrice);

    const response = await fetch(
        `${BASE_URL}/search?${params.toString()}`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
}