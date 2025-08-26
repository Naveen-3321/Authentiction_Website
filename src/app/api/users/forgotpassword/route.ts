import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log(reqBody);

    const { email } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          error: "User does exist",
        },
        { status: 400 }
      );
    }
    if (!user.isVerified) {
      return NextResponse.json(
        {
          error: "Verify before changing password ",
        },
        { status: 500 }
      );
    }

    sendEmail({
      email,
      emailType: "RESET",
      userId: user._id,
    });
    return NextResponse.json({ message: "Email sent" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      message: "Unable to send mail.Try again",
      status: 400,
    });
  }
}
