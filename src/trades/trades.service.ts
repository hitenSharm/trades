import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { TradeObjectDTO } from './dto/trade-object.dto';
import { TradesQueryDTO } from './dto/query-param.dto';

@Injectable()
export class TradesService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async createTradeObject(tradeObject: TradeObjectDTO) {
    const { data, error } = await this.supabaseService
      .getSupaClient()
      .from('trades')
      .insert([tradeObject])
      .select('id')
      .single();

    if (error) throw new Error('Failed to create trade');
    console.log(data);

    return {
      statusCode: HttpStatus.CREATED,
      tradeObjectId: data.id,
    };
  }

  async fetchAllTrades(query: TradesQueryDTO) {
    //start creating the promise.
    let queryBuilder = this.supabaseService
      .getSupaClient()
      .from('trades')
      .select('*')
      .order('id', { ascending: true });

    // If there is buy/sell or user_id in path params.
    if (query.type) queryBuilder = queryBuilder.eq('type', query.type);
    if (query.user_id) queryBuilder = queryBuilder.eq('user_id', query.user_id);

    const { data, error } = await queryBuilder;

    if (error) throw new Error('Failed to fetch trades');

    return data.map((trade) => ({
      ...trade,
      timestamp: Math.floor(new Date(trade.timestamp).getTime() / 1000), // Convert to Unix time in seconds.
    }));
  }

  async fetchOneTrade(id: number) {
    const { data, error } = await this.supabaseService
      .getSupaClient()
      .from('trades')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) throw new NotFoundException('Trade not found');

    return {
      ...data,
      timestamp: Math.floor(new Date(data.timestamp).getTime() / 1000), // Convert to Unix time in seconds.
    };
  }
}
