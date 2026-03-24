import { z } from 'zod';

// Uma base para a validação do usuário
// Criei essa base para usar .refine e .transform
// e validar se a duas senhas são iguais e remover
// a repetição da senha
const CreateUserBase = z.object({
  name: z.string().trim().min(4, 'Nome precisa ter um mínimo de 4 caracteres'),
  email: z.email({ message: 'E-mail inválido' }),
  password: z
    .string()
    .trim()
    .min(6, 'Senha precisa ter um mínimo de 6 caracteres'),
  passwordConfirm: z
    .string()
    .trim()
    .min(6, 'Confirmação de senha precisa ter um mínimo de 6 caracteres'),
});

export const CreateUserSchema = CreateUserBase.refine(
  data => {
    // Confirma se as senhas são iguais
    return data.password === data.passwordConfirm;
  },
  {
    path: ['passwordConfirm'], // aponta o erro pro campo de confirmação
    message: 'As senhas não conferem',
  },
).transform(({ email, name, password }) => ({
  name,
  email,
  password,
}));

export const PublicUserSchema = z.object({
  id: z.string().default(''),
  name: z.string().default(''),
  email: z.string().default(''),
});

export const UpdatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .trim()
      .min(6, 'Senha precisa ter um mínimo de 6 caracteres'),
    newPassword: z
      .string()
      .trim()
      .min(6, 'Nova senha precisa ter um mínimo de 6 caracteres'),
    newPasswordConfirm: z
      .string()
      .trim()
      .min(6, 'Confirmação de senha precisa ter um mínimo de 6 caracteres'),
  })
  .refine(
    data => {
      // Confirma se as senhas são iguais
      return data.newPassword === data.newPasswordConfirm;
    },
    {
      path: ['newPasswordConfirm'], // aponta o erro pro campo de confirmação
      message: 'As senhas não conferem',
    },
  )
  .transform(({ currentPassword, newPassword }) => ({
    currentPassword,
    newPassword,
  }));

export const UpdateUserSchema = CreateUserBase.omit({
  password: true,
  passwordConfirm: true,
}).extend({});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
export type PublicUserDto = z.infer<typeof PublicUserSchema>;
export type UpdatePasswordDto = z.infer<typeof UpdatePasswordSchema>;
