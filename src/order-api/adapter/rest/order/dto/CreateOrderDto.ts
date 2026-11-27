
import {
  IsInt,
  Min,
  Max,
  IsArray,
} from 'class-validator';
import { OrderItem } from '../../../../entity/order/order.js';

export class CreateOrderDto {
  @IsInt()
  userId: number;

  @IsArray()
  items: OrderItem[];
}
