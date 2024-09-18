import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TradesService } from './trades.service';
import { TradeObjectDTO } from './dto/trade-object.dto';
import { TradesQueryDTO } from './dto/query-param.dto';

@Controller('trades')
@UseGuards(AuthGuard('jwt'))
export class TradesController {
  constructor(private readonly tradesService: TradesService) {}

  @Post()
  async create(@Body() tradeObject: TradeObjectDTO) {
    return this.tradesService.createTradeObject(tradeObject);
  }

  @Get()
  async findAllTrades(@Query() queryParams: TradesQueryDTO) {
    return this.tradesService.fetchAllTrades(queryParams);
  }

  @Get(':id')
  async findOneTrade(@Param('id') id: string) {
    //convert to number and send to service.
    return this.tradesService.fetchOneTrade(+id);
  }

  @Delete(':id')
  @HttpCode(405)
  handleDelete() {
    return 'Method Not Allowed';
  }

  @Put(':id')
  @HttpCode(405)
  handlePut(): string {
    return 'Method Not Allowed';
  }

  @Patch(':id')
  @HttpCode(405)
  handlePatch() {
    return 'Method Not Allowed';
  }
}
