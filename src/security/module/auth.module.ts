import { Module } from "@nestjs/common";
import { UsersModule } from "../../order-api/module/users.module.js";
import { SessionAuth } from "../providers/session-auth.provider.js";

@Module({
  imports: [UsersModule],
  providers: [SessionAuth],
})

export class AuthModule { }