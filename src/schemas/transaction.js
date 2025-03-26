'use strict';

const transactionSchema = {
  schema: {
    description: 'Create a new payment transaction',
    tags: ['transactions'],
    body: {
      type: 'object',
      required: ['amount', 'currency', 'lang', 'hookUrl', 'callback', 'callbackFail', 'billing', 'orderId', 'cardData'],
      properties: {
        amount: { type: 'number', description: 'Transaction amount' },
        currency: { type: 'string', description: 'Transaction currency' },
        lang: { type: 'string', description: 'Language for communication' },
        hookUrl: { type: 'string', description: 'URL where webhook will be sent' },
        callback: { type: 'string', description: 'URL for successful payment redirect' },
        callbackFail: { type: 'string', description: 'URL for failed payment redirect' },
        billing: {
          type: 'object',
          required: ['firstName', 'lastName', 'address1', 'city', 'state', 'country', 'postalCode', 'phone', 'email'],
          properties: {
            firstName: { type: 'string', description: 'First name of cardholder' },
            lastName: { type: 'string', description: 'Last name of cardholder' },
            address1: { type: 'string', description: 'Billing address' },
            city: { type: 'string', description: 'City of billing address' },
            state: { type: 'string', description: 'State of billing address' },
            country: { type: 'string', description: 'Country of billing address' },
            postalCode: { type: 'string', description: 'Postal code of billing address' },
            phone: { type: 'string', description: 'Phone number of cardholder' },
            email: { type: 'string', description: 'Email address of cardholder' }
          }
        },
        orderId: { type: 'string', description: 'Unique order identifier' },
        cardData: {
          type: 'object',
          required: ['cardNumber', 'cardHolderName', 'cardExpiryDate', 'cardExpiryDate2', 'cardCvv', 'browser'],
          properties: {
            cardNumber: { type: 'string', description: 'Card number' },
            cardHolderName: { type: 'string', description: 'Name on the card' },
            cardExpiryDate: { type: 'string', description: 'Expiry month (MM)' },
            cardExpiryDate2: { type: 'string', description: 'Expiry year (YYYY)' },
            cardCvv: { type: 'string', description: 'CVV of the card' },
            browser: {
              type: 'object',
              properties: {
                colorDepth: { type: 'integer', description: 'Color depth of browser' },
                userAgent: { type: 'string', description: 'User agent string' },
                language: { type: 'string', description: 'Browser language' },
                timeZone: { type: 'string', description: 'Time zone' },
                screenWidth: { type: 'integer', description: 'Screen width' },
                javaEnabled: { type: 'boolean', description: 'Java enabled status' },
                customerIp: { type: 'string', description: 'Customer IP address' },
                screenHeight: { type: 'integer', description: 'Screen height' },
                windowHeight: { type: 'integer', description: 'Window height' },
                timeZoneOffset: { type: 'integer', description: 'Time zone offset' },
                windowWidth: { type: 'integer', description: 'Window width' }
              }
            }
          }
        },
        saveCard: { type: 'boolean', description: 'Whether to save the card' },
        merchantInformation: { 
          type: 'object',
          required: ['name'], 
          properties: {
            name: { type: 'string', description: 'Merchant name in bank receipt', maxLength: 22 },
            merchantName: { type: 'string', description: 'Merchant name in 3DS page', maxLength: 22 },
            country: { type: 'string', description: '2-letter country code', minLength: 2, maxLength: 2 },
            address1: { type: 'string', description: 'Merchant address' },
            administrativeArea: { type: 'string', description: 'State or province' },
            locality: { type: 'string', description: 'City' },
            postalCode: { type: 'string', description: 'Postal code' },
            url: { type: 'string', description: 'Merchant website' },
            customerServicePhoneNumber: { type: 'string', description: 'Customer service phone' },
            categoryCode: { type: 'string', description: 'MCC code' },
            noteToBuyer: { type: 'string', description: 'Note to buyer' }
          }
        }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: { type: 'object' }
        }
      },
      400: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          error: { type: 'string' }
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

module.exports = transactionSchema;
