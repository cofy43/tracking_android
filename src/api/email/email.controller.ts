import { Controller, Post, Res } from '@nestjs/common';
import { EmailService } from './email.service';
import { Response } from 'express';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/send')
  private sendEmail(@Res() res: Response) {
    return this.emailService.sendEmail(res);
  }
}
