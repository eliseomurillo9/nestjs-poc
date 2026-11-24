
import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../guard/jwtGuard.js';
import { RolesGuard } from '../../guard/rolesGuard.js';
import { CreateOrderDto } from '../dto/CreateOrderDto.js';
import { OrderService } from '../../../../application/order/use-case/orderService.js';

@Controller('orders')
// @UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
  constructor(
    private readonly orderService: OrderService,
  ) { }

  @Get()
  async getOrders(
  ) {

    return await this.orderService.getOrders();
  }

  @Get(':orderId')
  async getOrderById(
    @Param('orderId') orderId: string
  ) {
    return await this.orderService.getOrder(orderId);
  }

  @Post()
  async createOrder(
    @Body() createOrder: CreateOrderDto,
  ) {
    return await this.orderService.createOrder(createOrder)
  }
}
