// Middleware to Check if Token is Expired
export const isTokenExpired = () => {
    const expirationTime = localStorage.getItem('ACCESS_TOKEN_EXPIRE');
    if (!expirationTime) {
        return true; // No expiration time found, consider token expired
    }

    const currentTime = new Date().getTime();
    return currentTime > expirationTime;
};

// If expired, you can force the user to re-authenticate
export const getAuthToken = () => {
    if (isTokenExpired()) {
        // Clear the expired token
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('ACCESS_TOKEN_EXPIRE');
        return null;
    }

    return localStorage.getItem('ACCESS_TOKEN');
};
