import axios from "axios";

const API_URL = 'https://new2-ecfgbmgwfnhch4bp.westus3-01.azurewebsites.net/api/feedbacks';
const token = localStorage.getItem('token');
const headers = {
    'Authorization': `Bearer ${token}`
};

export async function createFeedback(feedbackData, restaurantId, userId) {
    try {
        const response = await axios.post(`${API_URL}/${restaurantId}/${userId}`,
            feedbackData,
            {headers});
        return response.data;
    } catch (error) {
        console.error('Error creating feedback:', error);
        throw error;
    }
}

export async function deleteFeedback(feedbackId) {
    try {
        const response = await axios.delete(`${API_URL}/${feedbackId}`,
            {headers});
        return response.data;
    } catch (error) {
        console.error('Error creating feedback:', error);
        throw error;
    }
}