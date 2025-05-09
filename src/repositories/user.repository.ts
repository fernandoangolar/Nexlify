
import { PrismaClient } from "../generated/prisma";

export class UserRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async findByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: { email },
            include: { roles: true}
        })
    }

    async create(userData: { name: string; email: string; password: string}) {
        return await this.prisma.user.create({
            data: userData,
            include: { roles: true}
        })
    }

    async addRoleToUser(userId: number, roles: string[]) {
        const rolePromise = roles.map(role => {
            this.prisma.userRole.create({
                data: {
                    role,
                    userId
                }
            })
        })

        return await Promise.all(rolePromise)
    }

}