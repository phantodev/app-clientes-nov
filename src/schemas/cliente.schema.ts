import { z } from 'zod';

export const clienteSchema = z.object({
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  
  email: z.string()
    .email('E-mail inválido')
    .min(1, 'E-mail é obrigatório'), 
  
  password: z.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .max(50, 'Senha deve ter no máximo 50 caracteres'),
  
  cpfCnpj: z.string()
    .min(11, 'CPF/CNPJ deve ter pelo menos 11 caracteres')
    .max(18, 'CPF/CNPJ deve ter no máximo 18 caracteres'),
  
  role: z.enum(['customer', 'admin'], {
    message: 'Tipo de usuário é obrigatório'
  }),
  
  city: z.string()
    .min(2, 'Cidade deve ter pelo menos 2 caracteres')
    .max(100, 'Cidade deve ter no máximo 100 caracteres'),
  
  state: z.string()
    .min(2, 'Estado é obrigatório')
    .max(2, 'Estado deve ter 2 caracteres'),
  
  country: z.string()
    .min(2, 'País deve ter pelo menos 2 caracteres')
    .max(100, 'País deve ter no máximo 100 caracteres')
});

export type ClienteFormData = z.infer<typeof clienteSchema>;
