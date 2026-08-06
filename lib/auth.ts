import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP } from "better-auth/plugins";
import nodemailer from "nodemailer";
import { prisma } from "./prisma";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  user: {
    additionalFields: {
      firstName: { type: "string", required: true },
      lastName: { type: "string", required: true },
      role: {
        type: "string",
        required: true,
        defaultValue: "volunteer",
        input: false,
      },
    },
  },
  plugins: [
    emailOTP({
      disableSignUp: true,
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "sign-in") {
          await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: email,
            subject: "Your March to the Polls Login Code",
            text: `Your verification code is: ${otp}`,
            html: `
              <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #122C4F; text-align: center;">March to the Polls</h2>
                <p>Your verification code is:</p>
                <p style="font-size: 32px; font-weight: bold; text-align: center; letter-spacing: 8px; color: #122C4F; background: #f3f4f6; padding: 16px; border-radius: 8px;">${otp}</p>
                <p style="color: #666; font-size: 14px;">This code expires in 5 minutes. If you did not request this code, you can safely ignore this email.</p>
              </div>
            `,
          });
        }
      },
    }),
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
});

export type Session = typeof auth.$Infer.Session;
