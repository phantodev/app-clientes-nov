export interface User {
    createdAt: string;
    name: string;
    avatar: string;
    email: string;
    cpfCnpj: string;
    role: string;
    city: string;
    state: string;
    id: string;
    password?: string;
}