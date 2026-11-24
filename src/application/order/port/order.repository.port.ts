import { Order } from "../../../entity/order/order.js";

export interface OrderRepository {
    findAll(): Promise<Order[]>;
    findById(id: string): Promise<Order | null>;
    create(order: Order): Promise<Order>;
}