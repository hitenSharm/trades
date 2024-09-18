import { Module } from '@nestjs/common';
import { TradesService } from './trades.service';
import { TradesController } from './trades.controller';
import { SupabaseService } from 'src/supabase/supabase.service';

@Module({
  providers: [TradesService, SupabaseService],
  controllers: [TradesController],
})
export class TradesModule {}
