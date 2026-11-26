import { Module } from '@nestjs/common';
import { OrdersController } from '../adapter/rest/order/controller/Order.js';
import { OrderRepository } from '../application/order/port/order.repository.port.js';
import { OrderRepositoryInMemory } from '../adapter/persistence/in-memory/order/orderRepositoryInMemory.adapter.js';
import { OrderService } from '../application/order/use-case/orderService.js';
import { AuthenticationProvider } from '../../security/providers/session-auth.provider.js';
import { JwtAuthGuard } from '../../security/guard/jwtGuard.js';

const orderRepositoryProvider = {
    provide: "ORDER_REPOSITORY",
    useClass: OrderRepositoryInMemory,
};

const orderServiceProvider = {
    provide: OrderService,
    useFactory: (repository: OrderRepository) => new OrderService(repository),
    inject: ["ORDER_REPOSITORY"],
}

@Module({
    controllers: [OrdersController],
    providers: [orderRepositoryProvider, orderServiceProvider]
})
export class OrderModule {}
