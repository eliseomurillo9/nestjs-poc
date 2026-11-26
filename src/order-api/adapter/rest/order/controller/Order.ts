
import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { CreateOrderDto } from '../dto/CreateOrderDto.js';
import { OrderService } from '../../../../application/order/use-case/orderService.js';
import { Scope } from '../../../../../security/decorators/scopes.decorator.js';
import { SCOPES } from '../../../../../security/scopes.js';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly orderService: OrderService,
  ) { }

  @Get()
  @Scope([SCOPES.READ])
  async getOrders(
  ) {

    return await this.orderService.getOrders();
  }

  @Get(':orderId')
  @Scope([SCOPES.READ])
  async getOrderById(
    @Param('orderId') orderId: string
  ) {
    return await this.orderService.getOrder(orderId);
  }

  @Post()
  @Scope([SCOPES.WRITE])
  async createOrder(
    @Body() createOrder: CreateOrderDto,
  ) {
    return await this.orderService.createOrder(createOrder)
  }
}
