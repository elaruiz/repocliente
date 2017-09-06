'use strict';

import Hapi from 'hapi';
import glob from 'glob';
import path from 'path';
import { TOKEN_SECRET } from "./constants/index";
import models from './models/index';

const server = new Hapi.Server();

// The connection object takes some
// configuration, including the port
server.connection({ port: 3000, routes: { cors: true } });

server.register(require('hapi-auth-jwt'), err => {
  // We are giving the strategy a name of 'jwt'
  server.auth.strategy('jwt', 'jwt', 'required', {
    key: TOKEN_SECRET,
    verifyOptions: { algorithms: ['HS256'] }
  });

  // Look through the routes in
  // all the subdirectories of API
  // and create a new route for each
  glob
    .sync('routes/*/*.js', {
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
