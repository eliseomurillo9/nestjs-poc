export class Order {
    id: number;
    userId: number;
    productId: number;
    quantity: number;

    constructor(orderId: number, userId: number, productId: number, quantity: number) {
        this.id = orderId;
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity
    }
}