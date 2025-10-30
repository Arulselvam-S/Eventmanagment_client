import api from './api';

export const contactService = {
  submitInquiry: async (contactData) => {
    const response = await api.post('/contacts', contactData);
    return response.data;
  },

  getAllInquiries: async () => {
    const response = await api.get('/contacts');
    return response.data;
  },

  getInquiryById: async (id) => {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
  },

  updateInquiry: async (id, updateData) => {
    const response = await api.put(`/contacts/${id}`, updateData);
    return response.data;
  },

  deleteInquiry: async (id) => {
    const response = await api.delete(`/contacts/${id}`);
    return response.data;
  }
};
