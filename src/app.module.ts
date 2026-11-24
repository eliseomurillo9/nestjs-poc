import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { OrderModule } from './module/order.module.js';
import { AuthModule } from './security/module/auth.module.js';
import { UsersModule } from './security/User/module/users.module.js';
import { AuthenticationModule } from '@nestjs/authentication';

@Module({
  imports: [
    OrderModule,
    AuthenticationModule.forRoot({
      session: {
        absoluteTtl: '14d', // signed out after 14 days, however active
        idleTtl: '3d', // or after 3 days without a request
      },
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
