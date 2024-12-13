import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ExchangeRateService {
  private readonly apiUrl = 'https://v6.exchangerate-api.com/v6/4bfc312a45625753bb8570d3/latest';

  async getExchangeRate(currency: string): Promise<number> {
    try {
      const response = await axios.get(`${this.apiUrl}/${currency}`);
      const rate = response.data.conversion_rates.BRL;
      if (!rate) {
        throw new HttpException('Rate not found', HttpStatus.NOT_FOUND);
      }
      return rate;
    } catch (error) {
      console.error(`Error fetching exchange rate for currency: ${currency}`, error);
      throw new HttpException('Error fetching exchange rate', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}