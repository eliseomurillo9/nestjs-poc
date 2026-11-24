
import {
  IsUUID,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  productId: string;
  
  @IsInt()
  @Min(1)
  @Max(100)
  quantity: number;
}
