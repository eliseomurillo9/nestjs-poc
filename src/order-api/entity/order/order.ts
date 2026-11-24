export  class Order {
    id: string;
    userId: string;
    productId: string;
    quantity: number;

    constructor(orderId: string, userId: string, productId: string, quantity: number) {
        this.id = orderId;
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity
    }
    
    static build(orderId: string, userId: string, productId: string, quantity: number): Order {
        return new Order(orderId, userId, productId, quantity);
    }
}