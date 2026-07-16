import API from "./productApi";

export const getDashboardStats = () =>
  API.get("/admin/dashboard", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });