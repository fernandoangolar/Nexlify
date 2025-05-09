import { PrismaClient, User as PrismaUser } from '../generated/prisma';
import { User } from '../models/user.model';

const prisma = new PrismaClient();

export class UserRepository {
  async create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const createdUser = await prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        role: user.role,
      },
    });
    return createdUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } });
  }
}