import { Injectable } from "@nestjs/common";
import type { UserRepository } from "./port/UserRepository.port.ts";
import { User } from "../../entity/user/User.js";

@Injectable()
export class UserService {
    constructor(readonly repository: UserRepository) { }

    create(email: string, password: string): Promise<User> {
        return this.repository.create(email, { passwordHash: password });
    }

    findById(id: string): Promise<User | null> {
        return this.repository.findById(id);
    }



}