import { get } from './api';

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'ADMIN' | 'USER';
}

export const getUserInfo = async (): Promise<User> => {
    try {
        const response = await get<User>('/user/info');
        return response.data;
    } catch {
        throw new Error('Failed to fetch user info');
    }
};