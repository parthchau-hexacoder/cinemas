import apiClient from '../client';
import type { Movie, ApiResponse } from '../../types';

export const movieService = {
    getAll: async (): Promise<ApiResponse<Movie[]>> => {
        return apiClient.get('/movies');
    },

    getById: async (id: string): Promise<ApiResponse<Movie>> => {
        return apiClient.get(`/movies/${id}`);
    },

};
