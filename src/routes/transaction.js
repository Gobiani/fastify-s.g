'use strict';

const transactionSchema = require('../schemas/transaction');
const OmnoService = require('../services/omno-service');
const config = require('../config');

module.exports = async function(fastify, opts) {
  const omnoService = new OmnoService();

  fastify.post('/create-transaction', transactionSchema, async (request, reply) => {
    try {
      const { body } = request;
      
      if (!body.hookUrl) {
        body.hookUrl = `${config.webhook.baseUrl}/webhook`;
      }
      if (!body.callback) {
        body.callback = `${config.webhook.baseUrl}/callback`;
      }
      if (!body.callbackFail) {
        body.callbackFail = `${config.webhook.baseUrl}/callbackFail`;
      }
      
      // Validate merchantInformation.name if merchantInformation is provided
      if (body.merchantInformation && !body.merchantInformation.name) {
        return reply.code(400).send({
          success: false,
          error: 'merchantInformation.name is required when merchantInformation is provided'
        });
      }
      
      // Call Omno service to create transaction
      const response = await omnoService.createTransaction(body);
      
      return {
        success: true,
        message: 'Transaction created successfully',
        data: response
      };
    } catch (error) {
      request.log.error(error);
      
      if (error.response) {
        return reply.code(error.response.status || 400).send({
          success: false,
          error: error.response.data?.message || 'Error from Omno API'
        });
      } else {
        return reply.code(500).send({
          success: false,
          error: error.message || 'Error creating transaction'
        });
      }
    }
  });
};