import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { OrderModule } from './module/order.module.js';

@Module({
  imports: [OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
