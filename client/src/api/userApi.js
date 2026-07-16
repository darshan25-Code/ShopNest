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

  export const getAllUsers = () =>
  API.get("/users", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const deleteUser = (id) =>
  API.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const updateUserRole = (id, role) =>
  API.put(
    `/users/${id}/role`,
    { role },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );