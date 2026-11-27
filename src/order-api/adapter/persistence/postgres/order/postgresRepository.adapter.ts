import { HttpException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { OrderRepository } from "../../../../application/order/port/order.repository.port.js";
import { Order } from "../../../../entity/order/order.js";
import { PrismaConfig } from "../config/prismaClient.js";

@Injectable()
export class PostgresRepository implements OrderRepository {
    public constructor(private readonly prisma: PrismaConfig) { }
    findAll(): Promise<Order[]> {
        return this.prisma.client().order.findMany({
            include: {
                items: true
            }
        })
    }

    async findById(id: number): Promise<Order | null> {
        const order = await this.prisma.client().order.findUnique({
            where: {
                id: id
            },
            include: {
                items: true
            }
        })

        if (!order) {
            throw new HttpException(`Order with id ${id} not found`, 404);
        }

        return order;
    }

    async create(order: Order): Promise<Order> {
        try {
            const createdOrder = await this.prisma.client().order.create({
                data: {
                    ...order,
                    items: {
                        create: order.items
                    }
                },
                include: {
                    items: true
                }
            });
            return createdOrder;
        } catch (e) {
            Logger.debug("Creation order", order)
            throw new InternalServerErrorException("Issue creating order");
        }

    }
}