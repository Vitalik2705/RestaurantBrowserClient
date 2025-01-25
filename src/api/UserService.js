import axios from "axios";
import {message} from "antd";

const API_URL = 'http://localhost:8080/api/auth';
const token = localStorage.getItem('token');
const headers = {
    'Authorization': `Bearer ${token}`
};

export const loginRequest = async (requestBody, history) => {
    axios.post(`${API_URL}/login`, requestBody, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            const token = response.data.token;
            const userId = response.data.userId;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);

            history('/');
        })
        .catch(error => {
            message.error('You passed incorrect credentials!');
        });
}

export const registrationRequest = async (requestBody, history) => {
    axios.post(`${API_URL}/register`, requestBody, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.data) {
                message.error('You passed incorrect credentials!');
            } else {
                const token = response.data.token;
                const userId = response.data.userId;
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);

                history('/');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

export const getUserRequest = async () => {
    const userId = localStorage.getItem('userId');
    try {
        const response = await axios.get(`${API_URL}/${userId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export const addFavouriteRestaurant = async (restaurantId,) => {
    const userId = localStorage.getItem('userId');
    await axios.post(`${API_URL}/${userId}/add-favorite-restaurant/${restaurantId}`, headers)
}

export const getUserFavoriteRestaurants = async (page = 0, size = 10) => {
    const userId = localStorage.getItem('userId');
    try {
        const response = await axios.get(`${API_URL}/${userId}/favorite-restaurants?page=${page}&size=${size}`,
            headers);
        return response.data;
    } catch (error) {
        console.error('Error fetching favorite restaurants:', error);
        throw error;
    }
}

export const removeFavouriteRestaurant = async (restaurantId,) => {
    const userId = localStorage.getItem('userId');
    await axios.delete(`${API_URL}/${userId}/remove-favorite-restaurant/${restaurantId}`, headers)
}