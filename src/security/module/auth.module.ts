import { Module } from "@nestjs/common";
import { UsersModule } from "../../order-api/module/users.module.js";
import { JwtAuthGuard } from "../guard/jwtGuard.js";
import { AuthenticationProvider } from "../providers/session-auth.provider.js";

@Module({
  imports: [UsersModule],
  providers: [AuthenticationProvider, JwtAuthGuard],
  exports: [AuthenticationProvider, JwtAuthGuard]
})

export class AuthModule {}