import { Injectable } from '@nestjs/common';
import { GmailService } from 'src/common/utils/email';
import { WhatsAppService } from 'src/common/utils/whatsaap';
import * as fs from 'fs';

@Injectable()
export class EmailService {
  private gmailService = new GmailService();

  private whatsAppService = new WhatsAppService();

  public async sendEmail(res) {
    const subject = `test correo`;
    const to = ['cofy43@gmail.com'];
    const text = `anexo comprobante del curso:\n saludos`;
    // se envia por correo
    return await this.gmailService.sendEmail(
      res,
      subject,
      to,
      [],
      [],
      text,
      '',
      [],
    );
  }

  async sendaWhatsApp(phoneNumber: string) {
    return await this.whatsAppService.sendMessage(phoneNumber, 'hola');
  }
}
