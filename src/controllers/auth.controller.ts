
import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { registerSchema } from "../utils/validators";
import { error } from "console";

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }
    
    async register(req: Request, res: Response) {
        try {

            const validationResult = registerSchema.safeParse(req.body);

            if (!validationResult.success) {
                return res.status(400).json({ 
                    error: 'Dados inválidos',
                    details: validationResult.error.format()
                });
            }

            const user = await this.authService.register(validationResult.data);
            return res.status(201).json(user);

        } catch (error: any) {
            if ( error.message === 'Email já está em uso' ) {
                return res.status(400).json({ message: error.message });
            }

            console.error('Erro ao registrar usuário: ', error);
            return res.status(500).json({ message: 'Erro ao registrar usuário' });
        } 
    }

}