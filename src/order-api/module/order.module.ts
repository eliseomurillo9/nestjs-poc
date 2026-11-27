import { Module } from '@nestjs/common';
import { OrdersController } from '../adapter/rest/order/controller/Order.js';
import { OrderRepository } from '../application/order/port/order.repository.port.js';
import { OrderService } from '../application/order/use-case/orderService.js';
import { PostgresRepository } from '../adapter/persistence/postgres/order/postgresRepository.adapter.js';
import { PrismaConfig } from '../adapter/persistence/postgres/config/prismaClient.js';

const orderRepositoryProvider = {
    provide: "ORDER_REPOSITORY",
    useClass: PostgresRepository,
};

const orderServiceProvider = {
    provide: OrderService,
    useFactory: (repository: OrderRepository) => new OrderService(repository),
    inject: ["ORDER_REPOSITORY"],
}

@Module({
    controllers: [OrdersController],
    providers: [orderRepositoryProvider, orderServiceProvider, PrismaConfig]
})
export class OrderModule {}
