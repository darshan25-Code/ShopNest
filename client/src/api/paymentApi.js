import API from "./productApi";

export const createRazorpayOrder = (amount) => {
  return API.post(
    "/payment/create-order",
    { amount },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

export const verifyPayment = (paymentData) => {
  return API.post(
    "/payment/verify",
    paymentData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};