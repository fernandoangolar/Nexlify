

import { z } from 'zod';

export const registerSchema = z.object({

    name: z.string().optional(),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    roles: z.array(z.string()).nonempty('Selecione pelo menos um papel'),

})

export type RegisterSchema = z.infer<typeof registerSchema>;