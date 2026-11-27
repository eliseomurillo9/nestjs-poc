
import {
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  userId: number;

  @IsInt()
  productId: number;
  
  @IsInt()
  @Min(1)
  @Max(100)
  quantity: number;
}
