// src/api/userApi.js

import axios from 'axios';

const API_URL = "https://forty4-backend.onrender.com/api";
console.log("API_URL:", API_URL);

// Generic function to handle requests and errors
const handleRequest = async (request) => {
  try {
    const response = await request();
    return { data: response.data, error: null };
  } catch (error) {
    console.error("API error:", error.response?.data || error.message);
    return {
      data: null,
      error: error.response?.data?.message || error.message || "An error occurred"
    };
  }
};

export const getUsers = () => 
  handleRequest(() => axios.get(`${API_URL}/users`));

export const getUserById = (id) =>
  handleRequest(() => axios.get(`${API_URL}/users/${id}`));

export const createUser = (data) =>
  handleRequest(() => axios.post(`${API_URL}/users`, data));

export const updateUser = (id, data) =>
  handleRequest(() => axios.put(`${API_URL}/users/${id}`, data));

export const deleteUser = (id) =>
  handleRequest(() => axios.delete(`${API_URL}/users/${id}`));
