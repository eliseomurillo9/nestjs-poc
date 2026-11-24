
import { Module } from '@nestjs/common';
import { UserRepository } from '../application/user/port/UserRepository.port.js';
import { UserService } from '../application/user/UserService.js';
import { InMemoryUserRepository } from '../adapter/persistence/in-memory/user/inMemoryUserRepository.adapter.js';

@Module({
    providers: [{
        provide: "USER_REPOSITORY",
        useClass: InMemoryUserRepository
    },
    {
        provide: UserService,
        useFactory: (repository: UserRepository) => new UserService(repository),
        inject: ["USER_REPOSITORY"],
    }],
    exports: [UserService]
})
export class UsersModule { }
