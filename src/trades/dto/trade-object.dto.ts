import {
  IsIn,
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class TradeObjectDTO {
  @IsIn(['buy', 'sell'])
  type: string;

  @IsInt()
  user_id: number;

  @IsString()
  symbol: string;

  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(100)
  shares: number;

  @IsNumber()
  price: number;
}
