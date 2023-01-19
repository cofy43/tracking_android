import { Client, LocalAuth } from 'whatsapp-web.js';
import * as fs from 'fs';

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true },
});

global.authed = false;

client.on('qr', async (qr) => {
  console.log('qr');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const qrcode = require('qrcode-terminal');
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
  console.log('AUTH!');
  //authed = true;
});

client.on('auth_failure', () => {
  console.log('AUTH Failed !');
  process.exit();
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', async (msg) => {
  console.log(msg);
  // if (config.webhook.enabled) {
  //   if (msg.hasMedia) {
  //     const attachmentData = await msg.downloadMedia();
  //     msg.attachmentData = attachmentData;
  //   }
  //   axios.post(config.webhook.path, { msg });
  // }
});
client.on('disconnected', () => {
  console.log('disconnected');
});
client.initialize();

export class WhatsAppService {
  public async sendMessage(phoneNumber, text) {
    // Sending message.
    // return await client.sendMessage('525573923623@c.us', text);
    const phoneId = await client.getNumberId(phoneNumber);
    console.log(phoneId);
    client.isRegisteredUser(phoneId._serialized).then(async (isValid) => {
      if (isValid) {
        return await client.sendMessage(phoneId._serialized, text);
      }
      return `El número: ${phoneNumber} no está registrado en whatsapp`;
    });
  }
}
