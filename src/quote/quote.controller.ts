import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { ExchangeRateService } from 'exchange-rate.service';
import { EmailService } from '../email/email.service';
import { Quote } from '../entities/quote.entity';

@Controller('quote')
export class QuoteController {
  constructor(
    private readonly quoteService: QuoteService,
    private readonly exchangeRateService: ExchangeRateService,
    private readonly emailService: EmailService,
  ) {}

  @Get(':currency')
  async getQuote(@Param('currency') currency: string, @Body('email') email: string): Promise<Quote> {
    try {
      console.log(`Fetching quote for currency: ${currency}`);
      const rate = await this.exchangeRateService.getExchangeRate(currency);
      const quote = await this.quoteService.saveQuote({ currency, rate, text: `Exchange rate for ${currency}`, author: 'ExchangeRateAPI' });

      if (email) {
        const message = `Olá ${quote.author}, hoje a cotação da moeda ${currency} para reais é: R$ ${rate}.\n\nObrigado por utilizar meu serviço.`;
        await this.emailService.sendEmail(email, quote);
      }

      return quote;
    } catch (error) {
      console.error(`Error fetching quote for currency: ${currency}`, error);
      throw new HttpException('Error fetching quote', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async createQuote(@Body() quoteData: { text: string; author: string; currency: string; rate: number }): Promise<Quote> {
    try {
      if (!quoteData || !quoteData.currency || !quoteData.rate || !quoteData.text || !quoteData.author) {
        throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
      }
      console.log('Creating new quote with data:', quoteData);
      return await this.quoteService.saveQuote(quoteData);
    } catch (error) {
      console.error('Error creating quote', error);
      throw new HttpException('Error creating quote', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}