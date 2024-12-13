import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { Quote } from '../entities/quote.entity';
import { ExchangeRateService } from 'exchange-rate.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quote])],
  controllers: [QuoteController],
  providers: [QuoteService, ExchangeRateService],
})
export class QuoteModule {}