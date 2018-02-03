'use strict';

import Server from './Server';


const server = new Server();
server.configure( Server.isDevelopment ? {
    port: 8888
} : {});
server.start();

