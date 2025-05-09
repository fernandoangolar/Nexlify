
export enum Role {
    RESTAURANT_ADMIN = 'RESTAURANT_ADMIN',
    RESTAURANT_EMPLOYEE = 'RESTAURANT_EMPLOYEE',
    CLIENT = 'CLIENT',
}

export interface User {
    id: number;
    email: string;
    password: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}