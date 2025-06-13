import { get } from './api';

export interface User {
    id: number;
    name: string;
    email: string;
}

export const getUserInfo = async (): Promise<User> => {
    try {
        const response = await get<User>('/user/info');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch user info');
    }
};