import * as nodemailer from 'nodemailer';
import config from '../config';

class Mail {
    transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.mail.email,
                pass: config.mail.password,
            },
        });
    }

    sendMail(to: string, subject: string, message: string, { onFinish = () => { } }: { onFinish: Function }) {
        const mailOptions = {
            from: config.mail.email,
            to,
            subject,
            html: message,
        };

        this.transporter.sendMail(mailOptions, function (error: any, info: any) {
            if (error) {
                console.log(error);
                return error;
            } else {
                onFinish()
                return 'E-mail enviado com sucesso!';
            }
        });
    }
}

export const MESSAGES = {
    PASSWORD_RECOVER: {
        subject: 'Troque sua senha',
        body: (params: { name: string, link: string }) =>
            `<html><body><h3>Olá ${params.name}</h3><p>para trocar a senha, por favor <a href='${params.link}'>click aqui</a></p></body></html>`,
    },
    CODE_GEN: {
        subject: 'Troque sua senha',
        body: (params: { name: string, code: string }) =>
            `<html><body><h3>Olá ${params.name}</h3><p>o código para trocar a senha é <b>${params.code}</b></body></html>`,
    },
};
export default new Mail();
