import API from "./productApi";

export const registerUser = (userData) =>
  API.post("/users/register", userData);

export const loginUser = (userData) =>
  API.post("/users/login", userData);