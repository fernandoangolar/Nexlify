
import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';
import { UserCreateDTO, UserDTO } from '../models/user.model';
import { PrismaClient } from '../generated/prisma';

export class AuthService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async register(userData: UserCreateDTO): Promise<Omit<UserDTO, 'password'>> {
        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        const prisma = new PrismaClient();

        const userWithRoles = await prisma.$transaction(async (tx) => {
            // Criar usuário
            const newUser = await tx.user.create({
              data: {
                name: userData.name,
                email: userData.email,
                password: hashedPassword,
              },
            });
      
            // Adicionar roles ao usuário em lote
            if (userData.roles.length > 0) {
              await tx.userRole.createMany({
                data: userData.roles.map(role => ({
                  role,
                  userId: newUser.id
                }))
              });
            }
      
            // Retornar o usuário completo com suas roles
            return tx.user.findUnique({
              where: { id: newUser.id },
              include: { roles: true }
            });
          });
      
          // Remover senha antes de retornar
          if (!userWithRoles) throw new Error('Erro ao criar usuário');
          
          const { password, ...userWithoutPassword } = userWithRoles;
          return userWithoutPassword as any;
    }

}