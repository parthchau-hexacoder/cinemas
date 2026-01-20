import apiClient from '../client';
import type { Show, BookingPayload, ApiResponse, Order } from '../../types';

export const bookingService = {
    getShowById: async (id: string): Promise<ApiResponse<Show>> => {
        return apiClient.get(`/show-times/${id}`);
    },

    createBooking: async (payload: BookingPayload): Promise<ApiResponse<any>> => {
        return apiClient.post('/bookings', payload);
    },

    getOrders: async (): Promise<ApiResponse<Order[]>> => {
        return apiClient.get('/orders');
    }
};
