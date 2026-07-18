import API from "./productApi";

// ============================
// Customer APIs
// ============================

// Place Order
export const placeOrder = (orderData) =>
  API.post("/orders", orderData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

// Get Logged-in User Orders
export const getMyOrders = () =>
  API.get("/orders/my-orders", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

// Get Single Order
export const getSingleOrder = (id) =>
  API.get(`/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

// ============================
// Admin APIs
// ============================

// Get All Orders
export const getAllOrders = () =>
  API.get("/orders", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

// Update Order Status
export const updateOrderStatus = (orderId, status) =>
  API.put(
    `/orders/${orderId}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );