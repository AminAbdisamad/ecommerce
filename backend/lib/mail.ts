import { createTransport, getTestMessageUrl } from 'nodemailer';
import 'dotenv/config';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeEmail(text: string): string {
  return `
        <div style="
        border: 1px solid black;
        padding: 1rem;
        font-family:sans-serif;
        font-size:1.5rem;
        line-height: 1rem;

        ">

            <h2> Hello there, </h2>
            <p>${text}</p>
            <p>Commerce, </p>
        </div>
        `;
}
export interface Envelope {
  from: string;
  to?: null[] | null;
}

export interface Info {
  accepted?: string[] | null;
  rejected?: null[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}

export async function sendPasswordResetEmail(
  token: string,
  to: string
): Promise<void> {
  const info = await transport.sendMail({
    to,
    from: 'commerce@commerce.so',
    subject: 'Password Reset Token',
    html: makeEmail(
      `Your password Reset link is here

      <a href="${process.env.FRONTEND_URL}/password_reset?token=${token}">Click Here</a>

    `
    ),
  });
  console.log({ info });
  if (process.env.MAIL_USER?.includes('ethereal.email')) {
    console.log(`Message sent from ${getTestMessageUrl(info)}`);
  }
}
