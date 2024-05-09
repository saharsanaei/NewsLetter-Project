export const mailSecrets = {
    host: process.env.MAIL_PROVIDER_HOST,
    port: process.env.MAIL_PROVIDER_PORT,
    user: process.env.MAIL_PROVIDER_USER,
    password: process.env.MAIL_PROVIDER_PASSWORD,
    defaultSender: process.env.DEFAULT_MAIL_SENDER,
  };