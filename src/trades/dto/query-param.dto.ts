import { IsOptional, IsIn, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class TradesQueryDTO {
  @IsOptional()
  @IsIn(['buy', 'sell'], { message: "type must be either 'buy' or 'sell'" })
  type?: string;

  @IsOptional()
  @Type(() => Number) // Transform query parameter to a number
  @IsInt({ message: 'user_id must be a valid number' })
  user_id?: number;
}
