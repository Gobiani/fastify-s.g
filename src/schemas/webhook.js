'use strict';

const webhookSchema = {
  schema: {
    description: 'Handle Omno payment webhook',
    tags: ['webhooks'],
    body: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Transaction ID' },
        status: { type: 'string', description: 'Transaction status' },
        amount: { type: 'number', description: 'Transaction amount' },
        currency: { type: 'string', description: 'Transaction currency' },
        createdAt: { type: 'string', description: 'Creation timestamp' },
        psp: { type: 'string', description: 'Payment service provider' },
        cardMask: { type: 'string', description: 'Masked card number' },
        cardholder: { type: 'string', description: 'Cardholder name' },
        cardBrand: { type: 'string', description: 'Card brand' },
        expirationDate: { type: 'string', description: 'Card expiration date' },
        '3dsRedirectUrl': { type: 'string', description: '3DS redirect URL' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          redirectUrl: { type: 'string', nullable: true },
          transactionId: { type: 'string', nullable: true },
          status: { type: 'string', nullable: true }
        }
      },
      500: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          error: { type: 'string' }
        }
      }
    }
  }
};

module.exports = webhookSchema;