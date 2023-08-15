import nodeMailer, { Transporter } from "nodemailer";
import { MailOption, NodemailerOption } from "../interfaces/nodemailer.interface";
import { MAILRE_HOST, MAILRE_PASS, MAILRE_PORT, MAILRE_USER } from "../config/config";

export const sendMail = async (options: NodemailerOption) => {
    const transport: Transporter = nodeMailer.createTransport({
        host: MAILRE_HOST,
        port: MAILRE_PORT, // if secure false port = 587, if true port= 465
        secure: true,
        // service: "smtp.gmail.com",
        auth: {
            user: MAILRE_USER,
            pass: MAILRE_PASS
        },

    });

    const emailOpt: MailOption = {
        from: "Social Network Team",
        to: options.email,
        subject: options.subject,
        html: options.message,
    };

    await transport.sendMail(emailOpt);
}