import axios from "axios";

const RESERVATION_API_URL = 'https://new2-ecfgbmgwfnhch4bp.westus3-01.azurewebsites.net/api/reservations';

const getHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

export const ReservationService = {
  getRestaurantTables: async (restaurantId) => {
    try {
      const response = await axios.get(
        `${RESERVATION_API_URL}/restaurants/${restaurantId}`,
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createReservation: async (tableId, userId, reservationData) => {
    try {
      const formattedData = {
        ...reservationData,
        reservationTime: reservationData.reservationTime.format('YYYY-MM-DDTHH:mm:ss')
      };

      const response = await axios.post(
        `${RESERVATION_API_URL}/tables/${tableId}/${userId}`,
        formattedData,
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserReservations: async (userId) => {
    try {
      const response = await axios.get(
        `${RESERVATION_API_URL}/users/${userId}`,
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteReservation: async (reservationId) => {
    try {
      await axios.delete(
        `${RESERVATION_API_URL}/${reservationId}`,
        { headers: getHeaders() }
      );
    } catch (error) {
      throw error;
    }
  },

  cancelReservation: async (reservationId) => {
    try {
      const response = await axios.post(
        `${RESERVATION_API_URL}/${reservationId}/cancel`,
        null,
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getRestaurantReservationsForAdmin: async (restaurantId) => {
    try {
      const response = await axios.get(
        `${RESERVATION_API_URL}/restaurant/${restaurantId}/all`,
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
