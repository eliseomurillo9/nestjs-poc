import { Injectable } from "@nestjs/common";
import { Order } from "../../../entity/order/order.js";
import type { OrderRepository } from "../port/order.repository.port.js";
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class OrderService {
    constructor(private readonly repository: OrderRepository) {}

    getOrders(): Promise<Order[]> {
        return this.repository.findAll();
    }

    getOrder(orderId: string): Promise<Order | null> {
        return this.repository.findById(orderId);
    }

    createOrder(order: Omit<Order, "id">): Promise<Order | null> {
        const orderId = uuidv4();
        const newOrder = Order.build(orderId, order.userId, order.productId, order.quantity);
        return this.repository.create(newOrder);
    }
}