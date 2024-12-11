import axios from "axios";

// Function to get the token (e.g., from localStorage or a state management tool)
const getToken = () => {
    return localStorage.getItem("token"); // Adjust based on how you store the token
};

// Create an Axios instance
const axiosClient = axios.create({
    baseURL: "http://172.17.15.28:30000", // Replace with your API base URL
});

// Add a request interceptor to attach the token to every request
axiosClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosClient;
