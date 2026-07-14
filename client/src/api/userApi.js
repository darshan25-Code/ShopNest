import API from "./productApi";

// Get Profile
export const getProfile = () =>
  API.get("/users/profile", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

// Update Profile
export const updateProfile = (data) =>
  API.put("/users/profile", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

// Change Password
export const changePassword = (data) =>
  API.put("/users/change-password", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });