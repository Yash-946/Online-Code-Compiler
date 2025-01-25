import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);
export const resendDomain = process.env.RESEND_DOMAIN as string;
export const contactUsTo = process.env.CONTACT_US_TO as string;