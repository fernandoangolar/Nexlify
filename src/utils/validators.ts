

import { z } from 'zod';
import { Role } from '../models/user.model';

export const registerSchema = z.object({
    email: z.string().email({ message: 'E-mail inválido' }),
    password: z.string().min(8, { message: 'Senha deve ter pelo menos 8 caracteres' }),
    role: z.enum([Role.RESTAURANT_ADMIN, Role.RESTAURANT_EMPLOYEE, Role.CLIENT], {
      message: 'Papel inválido',
    }),
});