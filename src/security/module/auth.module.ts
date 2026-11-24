import { Module } from "@nestjs/common";
import { UsersModule } from "../User/module/users.module.js";
import { SessionAuth } from "../providers/sessuin-auth.provider.js";

@Module({
  imports: [UsersModule],
  providers: [SessionAuth],
})

export class AuthModule { }