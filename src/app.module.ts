import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './security/module/auth.module.js';
import { UsersModule } from './order-api/module/users.module.js';
import { OrderModule } from './order-api/module/order.module.js';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './security/guard/jwtGuard.js';
import { RolesGuard } from './security/guard/rolesGuard.js';
import { validate } from './config/validator.js';

@Module({
  imports: [
    OrderModule,
    UsersModule,
    AuthModule,
     ConfigModule.forRoot({
       validate,
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})
export class AppModule { }
