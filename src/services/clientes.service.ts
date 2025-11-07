import { ClienteFormData } from '@/schemas/cliente.schema';
import { apiMockIO } from '../config/axios';
import type { Cliente, ClientesResponse } from '../type/clientes';
import { AxiosError } from 'axios';

export const clientesService = {
  async getAll(): Promise<ClientesResponse> {
        // Simulação de erro 401 - Não autorizado
        const axiosError = new AxiosError(
          'Request failed with status code 401',
          '401',
          undefined,
          undefined,
          {
            status: 400,
            statusText: 'Bad Request',
            data: {
              message: 'Erro ao buscar clientes',
              error: 'Bad Request'
            },
            headers: {},
            config: {} as any
          } as any
        );
        
        throw axiosError;
    // new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(true);
    //   }, 2000);
    // });
    // const response = await apiMockIO.get<ClientesResponse>('/users');
    // return response.data;
  },
  async delete(id: number): Promise<void> {
    const response = await apiMockIO.delete(`/users/${id}`);
    return response.data;
  },
  async create(cliente: ClienteFormData): Promise<void> {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
    const response = await apiMockIO.post('/users', cliente);
    return response.data;
  },
  async update(cliente: Cliente): Promise<void> {
    const response = await apiMockIO.put(`/users/${cliente.id}`, cliente);
    return response.data;
  }
};