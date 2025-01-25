import ContactUsEmail from "@/emails/ContactUsEmail";
import { contactUsTo, resend, resendDomain } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendContactUsEmail(
  firstname: string,
  lastname: string,
  emailID: string,
  message: string
): Promise<ApiResponse> {
  // console.log(resend);
  try {
    await resend.emails.send({
      from: `Code-Compiler <no-reply@${resendDomain}>`,
      to: `${contactUsTo}`,
      subject: 'Contact Us',
      react: ContactUsEmail({ firstname, lastname, emailID, message }),
    });
    return { success: true, message: 'Contact us email sent successfully.' };

  } catch (emailError) {
    console.error('Error sending Contact us email:', emailError);
    return { success: false, message: 'Failed to send email.' };
  }
}