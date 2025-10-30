import api from './api';

export const rentalService = {
  getAllRentals: async () => {
    const response = await api.get('/rentals');
    return response.data;
  },

  getRentalById: async (id) => {
    const response = await api.get(`/rentals/${id}`);
    return response.data;
  },

  createRental: async (rentalData) => {
    const response = await api.post('/rentals', rentalData);
    return response.data;
  },

  updateRental: async (id, rentalData) => {
    const response = await api.put(`/rentals/${id}`, rentalData);
    return response.data;
  },

  deleteRental: async (id) => {
    const response = await api.delete(`/rentals/${id}`);
    return response.data;
  },

  getAllRentalsAdmin: async () => {
    const response = await api.get('/rentals/admin/all');
    return response.data;
  }
};
