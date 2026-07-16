import API from "./productApi";

export const getDashboardStats = () =>
  API.get("/dashboard", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });