'use strict';

import server from './server'
import models from './models';

server.start(() => {
    console.log(`App running at: ${server.info.uri}`);
});
