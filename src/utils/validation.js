import {jwtDecode} from "jwt-decode";

const isTokenValid = (token) => {
    if (!token) return false;
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return decodedToken.exp > currentTime;
    } catch (error) {
        return false;
    }
};

export const checkTokenValidity = (storedToken, history) => {
    if (!isTokenValid(storedToken)) {
        localStorage.removeItem('token');
        history("/login");
    }
};