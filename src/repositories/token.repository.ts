import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export class TokenRepository {
  async create(token: { userId: number; token: string; expiresAt: Date }) {
    return await prisma.token.create({
      data: {
        userId: token.userId,
        token: token.token,
        expiresAt: token.expiresAt,
      },
    });
  }
}