import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Quote } from '../quote/entities/quote.entity';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendEmail(recipient: string, quote: Quote) {
    const message = this.constructMessage(quote);
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipient,
      subject: 'Your Quote',
      text: message,
    };

    await this.transporter.sendMail(mailOptions);
  }

  private constructMessage(quote: Quote): string {
    return `Hello,

Olá aqui está sua cotação:
${quote.text}

Atenciosamente: Vinícius Ventura`;
  }
}
