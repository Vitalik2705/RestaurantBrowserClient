import axios from "axios";

const API_URL = 'http://localhost:8081/api/restaurants';
const token = localStorage.getItem('token');
const headers = {
    'Authorization': `Bearer ${token}`
};

export async function getRestaurants(page = 0, size = 10, sortOption = 1) {
    const endpoint = sortOption === 1 ? "/sortedByPopularity" : "/sortedByRating";
    return await axios.get(`${API_URL}${endpoint}?page=${page}&size=${size}`, {headers});
}

export async function searchRestaurants(searchTerm, page = 0, size = 10) {
    return await axios.get(`${API_URL}/search?term=${encodeURIComponent(searchTerm)}&page=${page}&size=${size}`,
        {headers});
}

export async function filterRestaurants(searchTerms, page = 0, size = 10) {
    let searchParams = '';

    if (Array.isArray(searchTerms) && searchTerms.length > 0) {
        searchParams = searchTerms.map(term => `terms=${encodeURIComponent(term.toLowerCase())}`).join('&');
        return await axios.get(`${API_URL}/search/multiple?${searchParams}&page=${page}&size=${size}`, {headers});
    }

    return await getRestaurants();
}

export async function getRestaurant(id) {
    return await axios.get(`${API_URL}/${id}`, {headers});
}

export async function updatePopularityCount(restaurantId, newPopularityCount) {
    try {
        await axios.patch(
            `${API_URL}/updatePopularity`,
            null,
            {
                params: {
                    restaurantId: restaurantId,
                    newPopularityCount: newPopularityCount,
                },
                headers: headers,
            }
        );
        console.log('Popularity count updated successfully');
    } catch (error) {
        console.error('Error updating popularity count:', error);
        throw error;
    }
}

export async function updatePhoto(id, file) {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('file', file);

    try {
        const response = await axios.patch(`${API_URL}/photo`, formData, {
            headers: headers
        });

        return response.data;
    } catch (error) {
        console.error('Error updating photo:', error);
        throw error;
    }
}
