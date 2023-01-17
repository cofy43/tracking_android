import { Injectable } from '@nestjs/common';
import { GmailService } from 'src/common/utils/email';

@Injectable()
export class EmailService {
  private gmailService = new GmailService();

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
}
