import { z } from 'zod';

export const perfilSchema = z.object({
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  
  email: z.string()
    .email('E-mail inválido')
    .min(1, 'E-mail é obrigatório'),
  
  password: z.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .max(50, 'Senha deve ter no máximo 50 caracteres')
    .optional()
    .or(z.literal('')),
  
  confirmarSenha: z.string()
    .optional()
    .or(z.literal('')),
  
  avatar: z.string().nullable().optional()
}).superRefine((data, ctx) => {
  // Se a senha foi preenchida, confirmarSenha deve ser igual
  if (data.password && data.password.length > 0) {
    if (data.password !== data.confirmarSenha) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'As senhas não coincidem',
        path: ['confirmarSenha']
      });
    }
  }
});

export type PerfilFormData = z.infer<typeof perfilSchema>;
