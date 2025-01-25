import axios from "axios";

const MESSAGE_API_URL = 'http://localhost:8080/api/messages';

const getHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

export const MessageService = {
  getUserMessages: async (userId) => {
    try {
      const response = await axios.get(
        `${MESSAGE_API_URL}/user/${userId}`,
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  confirmReservation: async (reservationId, userId) => {
    try {
      const response = await axios.post(
        `${MESSAGE_API_URL}/reservations/${reservationId}/confirm`,
        null,
        {
          headers: getHeaders(),
          params: { userId }
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  cancelReservation: async (reservationId, userId) => {
    try {
      const response = await axios.post(
        `${MESSAGE_API_URL}/reservations/${reservationId}/cancel`,
        null,
        {
          headers: getHeaders(),
          params: { userId }
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteMessage: async (messageId) => {
    try {
      await axios.delete(
        `${MESSAGE_API_URL}/${messageId}`,
        { headers: getHeaders() }
      );
    } catch (error) {
      throw error;
    }
  },

  markMessageAsRead: async (messageId) => {
    try {
      const response = await axios.put(
        `${MESSAGE_API_URL}/${messageId}/read`,
        null,
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  markAllMessagesAsRead: async (userId) => {
    try {
      const response = await axios.put(
        `${MESSAGE_API_URL}/user/${userId}/read-all`,
        null,
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};