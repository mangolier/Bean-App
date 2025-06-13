import { post } from './api';

export interface AuthResponse {
    access_token: string;
}

export interface Credential {
    email: string;
    password: string;
}

export const login = async (credential: Credential): Promise<AuthResponse> => {
    try {
        const response = await post<AuthResponse>('/auth/login', credential);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch user info');
    }
};