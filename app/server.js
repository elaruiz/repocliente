'use strict';

import Hapi from 'hapi';
import hapiCors from 'hapi-cors';
import { TOKEN_SECRET } from "./constants/index";
import routes from './routes';
import inert from 'inert';



const server = new Hapi.Server();

// The connection object takes some
// configuration, including the port
server.connection({ host: process.env.HOST || 'localhost', port:  process.env.PORT || 8000, routes: { cors: true } });
export const host = server.info.uri;


server.register({
	register: hapiCors,
	options: {
		origins: ['*'],
        allowCredentials: 'true',
        exposeHeaders: ['content-type', 'content-length'],
        maxAge: 8440,
        methods: ['POST, GET, OPTIONS', 'PUT', 'PATCH'],
        headers: ['Accept', 'Content-Type', 'Authorization', 'X-Requested-With'], 
	}
});
server.register(inert, (err) => {
    
        if (err) {
            throw err;
        }
    });

server.register(require('hapi-auth-jwt'), err => {
    // We are giving the strategy a name of 'jwt'
    server.auth.strategy('jwt', 'jwt', 'required', {
        key: TOKEN_SECRET,
        verifyOptions: {algorithms: ['HS256']}
    });
    
    server.route(routes);
});


export default server;