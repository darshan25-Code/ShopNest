import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Public APIs
export const getProducts = () => API.get("/products");

export const getProduct = (id) => API.get(`/products/${id}`);

// Admin APIs
export const createProduct = (data) =>
  API.post("/products", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const updateProduct = (id, data) =>
  API.put(`/products/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const deleteProduct = (id) =>
  API.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  export const addReview = (id, reviewData) => {
  return API.post(`/products/${id}/reviews`, reviewData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export default API;