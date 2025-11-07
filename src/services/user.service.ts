import { apiMockIO } from '../config/axios';
import { User } from '@/type/users';

export const userService = {
  async getUserById(id: string): Promise<User> {
      const response = await apiMockIO.get<User>(`/users/${id}`);
      return response.data;
  },
  async updateUser(user: User): Promise<User> {
    const response = await apiMockIO.put<User>(`/users/${user.id}`, user);
    return response.data;
  }
};