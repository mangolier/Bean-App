import { post } from './api';

export interface AuthResponse {
    accessToken: string;
}

export interface Credential {
    username: string;
    password: string;
}

export const login = async (credential: Credential): Promise<AuthResponse> => {
    try {
        const response = await post<AuthResponse>('/auth/login', credential);
        return response.data;
    } catch {
        throw new Error('Failed to fetch user info');
    }
};