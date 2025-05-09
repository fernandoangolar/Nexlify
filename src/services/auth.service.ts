import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../models/user.model';
import { registerSchema } from '../utils/validators';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
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
}