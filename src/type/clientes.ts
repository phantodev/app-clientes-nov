export interface Cliente {
  id: number;
  email: string;
  password: string;
  name: string;
  cpfCnpj: string;
  role: 'customer' | 'admin';
  avatar: string;
  city: string;
  state: string;
  country: string;
  creationAt: string;
  updatedAt: string;
}

export interface ClientesResponse extends Array<Cliente> {}