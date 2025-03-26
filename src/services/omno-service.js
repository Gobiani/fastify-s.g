// src/services/omno-service.js
'use strict';

const axios = require('axios');
const NodeCache = require('node-cache');
const querystring = require('querystring');
const config = require('../config');

const tokenCache = new NodeCache();

class OmnoService {
  constructor() {
    this.baseUrl = config.omno.baseUrl;
    this.authUrl = 'https://sso.omno.com/realms/omno/protocol/openid-connect/token';
    this.clientId = config.omno.clientId;
    this.clientSecret = config.omno.clientSecret;
    this.maxRetries = config.omno.maxRetries;
    this.retryDelay = config.omno.retryDelay;
  }

  async getAuthToken() {
    const cachedToken = tokenCache.get('authToken');
    if (cachedToken) {
      return cachedToken;
    }

    try {
      // For Keycloak, we need to send the data as form-urlencoded, not JSON
      const response = await axios.post(
        this.authUrl,
        querystring.stringify({
          grant_type: 'client_credentials',
          client_id: this.clientId,
          client_secret: this.clientSecret
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      const { access_token, expires_in } = response.data;
      tokenCache.set('authToken', access_token, expires_in - 60);
      return access_token;
    } catch (error) {
      console.error('Auth error:', error.response?.data || error.message);
      throw error;
    }
  }

  async createTransaction(transactionData) {
    const token = await this.getAuthToken();
    let retries = 0;
    
    const executeRequest = async () => {
      try {
        const response = await axios.post(
          `${this.baseUrl}/transaction/h2h/create`,
          transactionData,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        return response.data;
      } catch (error) {
        if (retries < this.maxRetries) {
          retries++;
          await new Promise(resolve => setTimeout(resolve, this.retryDelay));
          return executeRequest();
        }
        console.error('Transaction error:', error.response?.data || error.message);
        throw error;
      }
    };
    
    return executeRequest();
  }
}

module.exports = OmnoService;