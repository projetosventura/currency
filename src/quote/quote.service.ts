import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Quote } from '../entities/quote.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuoteService {
  constructor(
    @InjectRepository(Quote)
    private readonly quoteRepository: Repository<Quote>,
  ) {}

  async getQuote(currency: string): Promise<number> {
    try {
      // Implement your logic to fetch the exchange rate for the given currency
      // For example, you might call an external API here
      return 1.23; // Placeholder value
    } catch (error) {
      console.error(`Error fetching exchange rate for currency: ${currency}`, error);
      throw new HttpException('Error fetching exchange rate', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async saveQuote(quoteData: { text: string; author: string; currency: string; rate: number }): Promise<Quote> {
    try {
      console.log(`Saving quote for currency: ${quoteData.currency} with rate: ${quoteData.rate}`);
      const quote = this.quoteRepository.create(quoteData);
      return await this.quoteRepository.save(quote);
    } catch (error) {
      console.error('Error saving quote', error);
      throw new HttpException('Error saving quote', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}