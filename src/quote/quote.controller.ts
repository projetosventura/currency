import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { Quote } from '../entities/quote.entity';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get(':currency')
  async getQuote(@Param('currency') currency: string): Promise<Quote> {
    try {
      console.log(`Fetching quote for currency: ${currency}`);
      const rate = await this.quoteService.getQuote(currency);
      return this.quoteService.saveQuote(currency, rate);
    } catch (error) {
      console.error(`Error fetching quote for currency: ${currency}`, error);
      throw new HttpException('Error fetching quote', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async createQuote(@Body() quoteData: Partial<Quote>): Promise<Quote> {
    try {
      console.log('Creating new quote with data:', quoteData);
      return this.quoteService.createQuote(quoteData);
    } catch (error) {
      console.error('Error creating quote', error);
      throw new HttpException('Error creating quote', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
