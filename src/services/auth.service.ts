import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../models/user.model';
import { loginSchema, registerSchema } from '../utils/validators';
import { TokenRepository } from '../repositories/token.repository';

export class AuthService {
  private userRepository: UserRepository;
  private tokenRepository: TokenRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.tokenRepository = new TokenRepository();
  }

  async register(data: unknown): Promise<User> {
    const validatedData = registerSchema.parse(data);

    const existingUser = await this.userRepository.findByEmail(validatedData.email);
    
    if (existingUser) {
      throw new Error('E-mail já registrado');
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    const user = await this.userRepository.create({
      email: validatedData.email,
      password: hashedPassword,
      role: validatedData.role,
    });

    return user;
  }

  async login(data: unknown) {
    const validatedData = loginSchema.parse(data);

    const user = await this.userRepository.findByEmail(validatedData.email);
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(validatedData.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }

    const token = jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret', {
      expiresIn: '1h',
    });

    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hora
    await this.tokenRepository.create({
      userId: user.id,
      token,
      expiresAt,
    });

    return { token, user: { id: user.id, email: user.email, role: user.role } };
  }
}