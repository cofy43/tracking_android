import { Controller, Get, Param, Post, Res } from '@nestjs/common';
import { EmailService } from './email.service';
import { Response } from 'express';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/send')
  private sendEmail(@Res() res: Response) {
    return this.emailService.sendEmail(res);
  }

  @Post('/send-message/:phoneNumber')
  sendaWhatsApp(@Param('phoneNumber') phoneNumber: string) {
    return this.emailService.sendaWhatsApp(phoneNumber);
  }
}
