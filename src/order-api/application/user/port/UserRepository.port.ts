import { User } from "../../../entity/user/User.js";


export interface UserRepository {
    create(email: string, options:{ passwordHash?: string | null; emailVerified?: boolean }): Promise<User>;
    findById(id: string): Promise<User | null>;
    findCredentials(email: string): Promise<{ user: User; passwordHash: string | null } | null>;
}