import { IEnvironmentConfiguration } from './environment';

export const environmentConfiguration: IEnvironmentConfiguration = {
  database: {
    host: 'localhost',
    port: 27017,
    db: 'monica-dev',
    user: 'dev',
    pwd: 'dev'
  },
  port: 3000,
  authentication: {
    key: 'DEV_SECRET_THIS_SHOULD_BE_LONGER',
    options: {
      expiresIn: 7 * 24 * 3600
    }
  },
  smtp: {
    host: 'smtp.mailtrap.io',
    port: 587,
    auth: {
      user: 'user',
      pass: 'password',
    },
    email: {
      welcome: 'noreply@monica.com',
    }
  }
};
