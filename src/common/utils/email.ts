import { google } from 'googleapis';

export class GmailService {
  /**
   * Function to send a email
   * @param res: Response object imported from express
   * @param subject: String contains the email subject
   * @param to: List of string contains the list of email
   * @param cc: List of string contains the list of copy
   * email
   * @param bcc: List of string contains the list of
   * blind copy email
   * @param text: Text plain of email body
   * @param html: Email body content in html format
   * @param files: Optional parameter of list files
   * @returns request of gmail package indicating the
   * status of the shipment
   */
  public async sendEmail(
    res,
    subject,
    to,
    cc = [],
    bcc = [],
    text = '',
    html = '',
    files = [],
  ) {
    const oAuth2Client = new google.auth.OAuth2(
      process.env.MAILING_SERVICE_CLIENT_ID,
      process.env.MAILING_SERVICE_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground',
    );
    oAuth2Client.setCredentials({
      refresh_token: process.env.MAILING_SERVICE_REFRESH_TOKEN,
    });

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const nodemailer = require('nodemailer');
    console.log(oAuth2Client);
    try {
      const accessToken = await oAuth2Client.getAccessToken();
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.SENDER_EMAIL,
          clientId: process.env.MAILING_SERVICE_CLIENT_ID,
          clientSecret: process.env.MAILING_SERVICE_CLIENT_SECRET,
          refreshToken: process.env.MAILING_SERVICE_REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
      const attachmentFile = files.length
        ? files.map((file) => {
            return {
              filename: file.originalname,
              path: file.path,
            };
          })
        : [];
      const mailOptions = {
        from: 'Siddhant &lt;' + process.env.SENDER_EMAIL + '>',
        to: to,
        cc: cc,
        bcc: bcc,
        subject: subject,
        text: text,
        html: html,
        attachments: attachmentFile,
      };

      const result = await transport.sendMail(mailOptions);
      return res.send(result);
    } catch (error) {
      console.log('error');
      console.log(error);
      return res.send(error);
    }
  }
}
