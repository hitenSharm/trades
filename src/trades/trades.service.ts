import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { TradeObjectDTO } from './dto/trade-object.dto';
import { TradesQueryDTO } from './dto/query-param.dto';

@Injectable()
export class TradesService {
  constructor(private readonly supabaseService: SupabaseService) {}

  /**
   * Creates a new trade object in the 'trades' table.
   *
   * @param {TradeObjectDTO} tradeObject - The trade data transfer object containing the trade information to be inserted.
   * @returns {Promise<{ statusCode: number, tradeObjectId: number }>} - The status code and ID of the newly created trade.
   * @throws {Error} - Throws an error if trade creation fails.
   */
  async createTradeObject(tradeObject: TradeObjectDTO) {
    const { data, error } = await this.supabaseService
      .getSupaClient()
      .from('trades')
      .insert([tradeObject])
      .select('id')
      .single();

    if (error) throw new Error('Failed to create trade');

    return {
      statusCode: HttpStatus.CREATED,
      tradeObjectId: data.id,
    };
  }

  /**
   * Fetches all trades from the 'trades' table, filtered by query parameters (type and user_id).
   *
   * @param {TradesQueryDTO} query - The query parameters object containing optional filters (type, user_id).
   * @returns {Promise<Array<any>>} - A promise resolving to an array of trade objects, each with a converted Unix timestamp.
   * @throws {Error} - Throws an error if fetching trades fails.
   */
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

  /**
   * Fetches a single trade by its ID from the 'trades' table.
   *
   * @param {number} id - The ID of the trade to fetch.
   * @returns {Promise<any>} - A promise resolving to the trade object with a converted Unix timestamp.
   * @throws {NotFoundException} - Throws a 404 Not Found error if the trade with the given ID does not exist.
   */
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
