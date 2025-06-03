import axios from "axios";

const API_URL = 'https://new2-ecfgbmgwfnhch4bp.westus3-01.azurewebsites.net/api/users/preferences';
const token = localStorage.getItem('token');
const headers = {
  'Authorization': `Bearer ${token}`
};

export async function saveUserPreferences(preferencesData, userId) {
  try {
    const response = await axios.post(`${API_URL}/${userId}`,
      preferencesData,
      {headers});
    return response.data;
  } catch (error) {
    console.error('Error saving preferences:', error);
    throw error;
  }
}

export const checkUserPreferences = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/check/${userId}`, {headers});
    return response.data;
  } catch (error) {
    console.error('Error checking preferences:', error);
    return false;
  }
};