import axios from "axios";

const API_URL = 'https://new2-ecfgbmgwfnhch4bp.westus3-01.azurewebsites.net/api/restaurants';
const token = localStorage.getItem('token');
const headers = {
    'Authorization': `Bearer ${token}`
};

export async function getRestaurants(page = 0, size = 10, sortOption = 0, userId) {
  const endpoints = {
    0: `/recommended/${userId}`,
    1: "/sortedByPopularity",
    2: "/sortedByRating"
  };
  const endpoint = endpoints[sortOption] || `/recommended/${userId}`;
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

export async function addRestaurant(restaurantData, userId) {
    try {
        const response = await axios.post(`${API_URL}/${userId}`, restaurantData, {
            headers: headers
        });

        return response.data;
    } catch (error) {
        console.error('Error adding restaurant:', error);
        throw error;
    }
}

export async function getCreatedRestaurants(userId) {
  try {
    const response = await axios.get(`${API_URL}/created/${userId}`, {headers});
    return response.data;
  } catch (error) {
    console.error('Error fetching created restaurants:', error);
    throw error;
  }
}

export async function updateRestaurant(restaurantId, restaurantData) {
  try {
    const response = await axios.put(`${API_URL}/${restaurantId}`, restaurantData, {
      headers: headers
    });
    return response.data;
  } catch (error) {
    console.error('Error updating restaurant:', error);
    throw error;
  }
}