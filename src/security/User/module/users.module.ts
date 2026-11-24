
import { Module } from '@nestjs/common';
import { InMemoryUserRepository } from '../percistence/inMemoryUserRepository.adapter.js';
import { UserRepository } from '../entity/application/port/UserRepository.port.js';
import { UserService } from '../entity/application/UserService.js';

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
