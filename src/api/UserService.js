import axios from "axios";
import {message} from "antd";

const API_URL = 'https://new2-ecfgbmgwfnhch4bp.westus3-01.azurewebsites.net/api/auth';
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
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    const response = await axios.post(`${API_URL}/register`, requestBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.data) {
      message.error('You passed incorrect credentials!');
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    const token = response.data.token;
    const userId = response.data.userId;

    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);

    message.success('Registration successful!');
    history('/');

  } catch (error) {
    console.error('Registration error:', error);
    message.error('Registration failed. Please try again.');
  }
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