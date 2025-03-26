'use strict';

require('dotenv').config();

module.exports = {
  server: {
    port: process.env.PORT,
    host: process.env.HOST
  },
  omno: {
    merchantName: process.env.OMNO_MERCHANT_NAME,
    clientId: process.env.OMNO_CLIENT_ID,
    clientSecret: process.env.OMNO_CLIENT_SECRET,
    baseUrl: process.env.OMNO_BASE_URL,
    maxRetries: 3,
    retryDelay: 1000
  },
  webhook: {
    baseUrl: process.env.WEBHOOK_BASE_URL
  }
};