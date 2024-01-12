import { Resend } from 'resend';
import * as process from 'process';

const resend = new Resend(process.env.RESED_API_KEY);

export const sendVereficationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.HOME_LINK}/auth/new-verefication?token=${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Подтверждение почты',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Активация Аккаунта</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

            body {
                font-family: 'Roboto', sans-serif;
                background-color: #f0f2f5;
                color: #333;
                padding: 20px;
            }
            .container {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 20px;
                margin: 0 auto;
                width: 600px;
                border-radius: 12px;
                box-shadow: 0 8px 24px rgba(102, 126, 234, 0.6);
                color: #ffffff;
                text-align: center;
            }
            .header {
                font-size: 24px;
                margin-bottom: 20px;
            }
            .content {
                margin-top: 20px;
            }
            .button {
                display: inline-block;
                margin-top: 20px;
                padding: 10px 20px;
                background-color: #ff8a00;
                color: #fff;
                text-decoration: none;
                border-radius: 25px;
                transition: transform 0.3s ease;
            }
            .button:hover {
                transform: translateY(-3px);
            }
            .icon {
                height: 24px;
                vertical-align: middle;
                margin-right: 8px;
            }
            .footer {
                margin-top: 30px;
                font-size: 12px;
                color: #b9bbbe;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
              
                Активация Вашего Аккаунта
            </div>
            <div class="content">
                <p>Здравствуйте,</p>
                <p>
                    Мы рады приветствовать Вас! 
                    Для завершения регистрации и активации аккаунта, пожалуйста, нажмите на кнопку ниже.
                </p>
                <a href="${confirmLink}" class="button">
                  
                    Активировать Аккаунт
                </a>
                <p>Если у Вас возникли проблемы с активацией, свяжитесь с нами.</p>
            </div>
            <div class="footer">
                С уважением,<br>
                Команда [Название Компании]
            </div>
        </div>
    </body>
    </html>
    `,
  });
};
