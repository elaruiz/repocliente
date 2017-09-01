'use strict';

const Hapi = require('hapi');
const Boom = require('boom');
const glob = require('glob');
const path = require('path');
const secret = require('./app/constants').TOKEN_SECRET;
const models = require('./app/models');

const server = new Hapi.Server();

// The connection object takes some
// configuration, including the port
server.connection({ port: 3000, routes: { cors: true } });

server.register(require('hapi-auth-jwt'), err => {
  // We are giving the strategy a name of 'jwt'
  server.auth.strategy('jwt', 'jwt', 'required', {
    key: secret,
    verifyOptions: { algorithms: ['HS256'] }
  });

  // Look through the routes in
  // all the subdirectories of API
  // and create a new route for each
  glob
    .sync('app/**/routes/*/*.js', {
      root: __dirname
    })
    .forEach(file => {
      const route = require(path.join(__dirname, file));
      server.route(route);
    });
});

// Start the server

models.sequelize.sync().then(function() {
    server.start(function() {
        console.log('Running on 3000');
    });
});
