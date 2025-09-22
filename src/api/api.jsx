import axios from "axios";

// Base URL for the API. This is the single point of configuration.
const API_BASE_URL = "http://localhost:5001";

// Create a single Axios instance with the base URL.
const api = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * API function to fetch all products.
 * @returns {Promise<Array>} A promise that resolves to an array of product objects.
 */
export const fetchProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Re-throw the error for the component to handle
  }
};

/**
 * API function to fetch a single product by its ID.
 * @param {string} productId The ID of the product.
 * @returns {Promise<Object>} A promise that resolves to a product object.
 */
export const fetchProductById = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw error;
  }
};

/**
 * API function to add a new product.
 * @param {Object} productData The data for the new product.
 * @returns {Promise<Object>} A promise that resolves to the newly created product object.
 */
export const addProduct = async (productData) => {
  try {
    const response = await api.post("/products", productData);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

/**
 * Fetches all items in the shopping cart.
 * @returns {Promise<Array>} A promise that resolves to an array of cart item objects.
 */
export const fetchCartItems = async () => {
  try {
    const response = await api.get("/cartItems");
    return response.data;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};

/**
 * Adds a new item to the shopping cart.
 * @param {Object} itemData The data for the new cart item.
 * @returns {Promise<Object>} A promise that resolves to the newly created cart item object.
 */
export const addToCart = async (itemData) => {
  try {
    const response = await api.post("/cartItems", itemData);
    return response.data;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};

/**
 * Updates a cart item's details, such as quantity.
 * @param {string} itemId The ID of the cart item to update.
 * @param {Object} updateData The data to update (e.g., { quantity: 2, totalPrice: 500 }).
 * @returns {Promise<Object>} A promise that resolves to the updated cart item.
 */
export const updateCartItem = async (itemId, updateData) => {
  try {
    const response = await api.patch(`/cartItems/${itemId}`, updateData);
    return response.data;
  } catch (error) {
    console.error(`Error updating cart item with ID ${itemId}:`, error);
    throw error;
  }
};

/**
 * Deletes a cart item.
 * @param {string} itemId The ID of the cart item to delete.
 * @returns {Promise<Object>} A promise that resolves to the deletion confirmation.
 */
export const deleteCartItem = async (itemId) => {
  try {
    const response = await api.delete(`/cartItems/${itemId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting cart item with ID ${itemId}:`, error);
    throw error;
  }
};

/**
 * API function to fetch all users.
 * @returns {Promise<Array>} A promise that resolves to an array of user objects.
 */
export const fetchUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

/**
 * API function to add a new user.
 * @param {Object} userData The data for the new user.
 * @returns {Promise<Object>} A promise that resolves to the newly created user object.
 */
export const addUser = async (userData) => {
  try {
    const response = await api.post("/users", userData);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};
