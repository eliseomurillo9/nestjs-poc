import { HttpException, Injectable } from "@nestjs/common";
import { OrderRepository } from "../../../../application/order/port/order.repository.port.js";
import { Order } from "../../../../entity/order/order.js";

@Injectable()
export class OrderRepositoryInMemory implements OrderRepository {
    private orders: Order[] = [
        {
            id: "1",
            userId: "1",
            productId: "1",
            quantity: 1,
        },
        {
            id: "2",
            userId: "2",
            productId: "2",
            quantity: 2,
        }
    ];
    findAll(): Promise<Order[]> {
        return Promise.resolve(this.orders);
    }

    findById(id: string): Promise<Order | null> {
        const order = this.orders.find(order => order.id === id);

        if (!order) {
            throw new HttpException(`Order with id ${id} not found`, 404);
        }

        return Promise.resolve(order);
    }

    create(order: Order): Promise<Order> {
        this.orders.push(order);
        return Promise.resolve(order);
    }
}