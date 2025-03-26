'use strict';

const fastify = require('fastify')({
  logger: true
});
const config = require('./src/config');
const cors = require('@fastify/cors');

// Register plugins in correct order
async function registerPlugins() {
  // Register CORS first 
  await fastify.register(cors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  });

  // Register routes
  fastify.register(require('./src/routes/transaction'));
  fastify.register(require('./src/routes/webhook'));
}

// Start server
const start = async () => {
  try {
    await registerPlugins();
    await fastify.listen(config.server);
    fastify.log.info(`Server is running on ${config.server.host}:${config.server.port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();