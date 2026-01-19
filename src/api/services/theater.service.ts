import apiClient from '../client';
import type { Theater, Show, ApiResponse, Movie, Screen } from '../../types';

export const theaterService = {
    getAll: async (): Promise<ApiResponse<Theater[]>> => {
        return apiClient.get('/theaters');
    },

    getById: async (id: string): Promise<ApiResponse<Theater>> => {
        return apiClient.get(`/theaters/${id}`);
    },

    getShowsByMovie: async (movieId: string): Promise<ApiResponse<Show[]>> => {
        return apiClient.get(`/show-times/movie/${movieId}`);
    },

    getShowsByTheater: async (theaterId: string): Promise<ApiResponse<Show[]>> => {
        return apiClient.get(`/show-times/theater/${theaterId}`);
    },

    getMovies: async (theaterId: string): Promise<ApiResponse<{ movies: Movie[] }>> => {
        return apiClient.get(`/theaters/${theaterId}/movies`);
    },

    getScreens: async (theaterId: string): Promise<ApiResponse<Screen[]>> => {
        return apiClient.get(`/theaters/${theaterId}/screens`);
    },

    getScreenDetails: async (screenId: string): Promise<ApiResponse<{ screen: { showTimes: Show[] } }>> => {
        return apiClient.get(`/screens/${screenId}`);
    }
};
