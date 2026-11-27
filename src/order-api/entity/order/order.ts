export interface OrderItem {
    id: number;
    orderId?: number
    quantity: number
}
export class Order {
    id: number;
    userId: number;
    items: OrderItem[]

    constructor(orderId: number, userId: number, items: OrderItem[]) {
        this.id = orderId;
        this.userId = userId;
        this.items = items;
    }
}