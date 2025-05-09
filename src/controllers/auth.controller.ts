import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response) {
    try {
      const user = await this.authService.register(req.body);
      res.status(201).json({
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { token, user } = await this.authService.login(req.body);
      res.status(200).json({ token, user });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
}