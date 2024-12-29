import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const createOrder = async (payload) => {
  try {
    console.log("Creating order with payload:", payload);
    const response = await axios.post(
      `${API_BASE_URL}/orders`,
      {
        products: payload.products,
        orderData: {
          totalPrice: payload.orderData.totalPrice,
          address: payload.orderData.address,
          shippingMethod: payload.orderData.shippingMethod,
          paymentMethod: payload.orderData.paymentMethod,
        },
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to create order");
  }
};

export const getOrdersByUser = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/user`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch orders");
  }
};

export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Failed to fetch all orders"
    );
  }
};

export const updateOrder = async (orderId, status) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/orders/${orderId}`,
      {
        products: [],
        status: status,
      },
      { withCredentials: true }
    );
    console.log("Updated order:", response.data);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to update order");
  }
};

export const deleteOrder = async (orderId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/orders/${orderId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to delete order");
  }
};
