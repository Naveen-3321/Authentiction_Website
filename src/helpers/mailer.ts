import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "1341c02f4b1a77",
        pass: "febee273cd0c86",
      },
    });

    const mailOptions = {
      from: "gnav@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify ur password" : "Reset ur password",
      html:
        emailType === "VERIFY"
          ? `<p>Click <a href="${
              process.env.domain
            }/verifyemail?token=${hashedToken}">here</a> to ${
              emailType === "VERIFY" ? "verify ur email" : "reset ur password"
            }
      or copy and paste the link below in your browser.
      <br>${process.env.domain}/verifyemail?token=${hashedToken}</br>
      </p>`
          : `<p>Click <a href="${
              process.env.domain
            }/resetpassword?token=${hashedToken}">here</a> to ${
              emailType === "VERIFY" ? "verify ur email" : "reset ur password"
            }
      or copy and paste the link below in your browser.
      <br>${process.env.domain}/resetpassword?token=${hashedToken}</br>`,
    };

    await transport.sendMail(mailOptions);
    return mailOptions;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
