import apiClient from '../client';
import type { ApiResponse } from '../../types';


export const authService = {
    login: async (credentials: { email: string; password: string }): Promise<ApiResponse<{ accessToken: string }>> => {
        return apiClient.post('/auth/login', credentials);
    },

    signup: async (userData: { firstName: string; lastName: string; email: string; password: string }): Promise<ApiResponse<any>> => {
        return apiClient.post(`/auth/signup`, userData, {
            headers: { "Content-Type": "application/json" }
        });
    }
};
