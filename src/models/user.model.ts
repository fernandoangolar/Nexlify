
export interface UserDTO {
    id: number;
    name: string;
    email: string;
    role: UserRoleDTO[];
    createdAt: Date;
    updatedAt: Date;
}

export interface UserRoleDTO {
    id: number;
    name: string;
    userId: number;
}

export interface UserCreateDTO {
    name: string;
    email: string;
    password: string;
    roles: string[];
}