'use strict';

const webhookSchema = require('../schemas/webhook');

module.exports = async function(fastify, opts) {
  fastify.post('/webhook', {
    schema: webhookSchema.schema,
    handler: async (request, reply) => {
      try {
        const webhookData = request.body;
        
        // Extract the 3DS URL
        let redirectUrl = null;
        if (webhookData && '3dsRedirectUrl' in webhookData) {
          redirectUrl = webhookData['3dsRedirectUrl'];
        }
        
        // Create response
        const responseBody = {
          success: true,
          message: redirectUrl ? 'Webhook received with 3DS URL' : 'Webhook received without 3DS URL',
          redirectUrl: redirectUrl,
          transactionId: webhookData?.id || null,
          status: webhookData?.status || null
        };
        
        return responseBody;
      } catch (error) {
        return reply.code(500).send({
          success: false,
          error: error.message || 'Error processing webhook'
        });
      }
    }
  });
  
  // Callback endpoints
  fastify.get('/callback', {
    schema: {
      tags: ['payment'],
      description: 'Success callback for completed payments'
    }
  }, async (request, reply) => {
    return { success: true, message: 'Payment successful' };
  });
  
  fastify.get('/callbackFail', {
    schema: {
      tags: ['payment'],
      description: 'Failure callback for failed payments'
    }
  }, async (request, reply) => {
    return { success: false, message: 'Payment failed' };
  });
};
