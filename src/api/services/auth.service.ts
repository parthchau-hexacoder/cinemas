import apiClient from '../client';
import axios from 'axios';
import type { ApiResponse } from '../../types';

const AUTH_API_URL = 'http://ec2-13-201-98-117.ap-south-1.compute.amazonaws.com:3000/auth';

export const authService = {
    login: async (credentials: { email: string; password: string }): Promise<ApiResponse<{ accessToken: string }>> => {
        return apiClient.post('/auth/login', credentials);
    },

    signup: async (userData: { firstName: string; lastName: string; email: string; password: string }): Promise<ApiResponse<any>> => {
        return axios.post(`${AUTH_API_URL}/signup`, userData, {
            headers: { "Content-Type": "application/json" }
        });
    }
};
