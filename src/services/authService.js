import { login } from '../api/auth';

export const authenticateUser = async (email, password) => {
    try {
        const response = await login(email, password);
        if (response.isSuccess) {
            // Handle successful login (e.g., store token, redirect)
            console.log('Login successful:', response);
            return response;
        } else {
            // Handle login failure
            console.error('Login failed:', response.messages);
            throw new Error(response.messages[0].content);
        }
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};