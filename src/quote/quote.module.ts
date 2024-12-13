import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { Quote } from '../entities/quote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quote])],
  providers: [QuoteService],
  controllers: [QuoteController],
})
export class QuoteModule {}
