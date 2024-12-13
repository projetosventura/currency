import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from '../entities/quote.entity';
import axios from 'axios';

@Injectable()
export class QuoteService {
  constructor(
    @InjectRepository(Quote)
    private readonly quoteRepository: Repository<Quote>,
  ) {}

  async getQuote(currency: string): Promise<number> {
    try {
      console.log(`Fetching exchange rate for currency: ${currency}`);
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${currency}`);
      return response.data.rates.USD; 
    } catch (error) {
      console.error(`Error fetching exchange rate for currency: ${currency}`, error);
      throw new HttpException('Error fetching exchange rate', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async saveQuote(currency: string, rate: number): Promise<Quote> {
    try {
      console.log(`Saving quote for currency: ${currency} with rate: ${rate}`);
      const quote = new Quote();
      quote.currency = currency;
      quote.rate = rate;
      quote.text = `Exchange rate for ${currency}`;
      quote.author = 'ExchangeRateAPI';
      quote.createdAt = new Date();
      return this.quoteRepository.save(quote);
    } catch (error) {
      console.error('Error saving quote', error);
      throw new HttpException('Error saving quote', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createQuote(quoteData: Partial<Quote>): Promise<Quote> {
    try {
      console.log('Creating new quote with data:', quoteData);
      const quote = this.quoteRepository.create(quoteData);
      return this.quoteRepository.save(quote);
    } catch (error) {
      console.error('Error creating quote', error);
      throw new HttpException('Error creating quote', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
