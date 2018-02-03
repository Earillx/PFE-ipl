'use strict';

import Server from './Server';


const server = new Server();
server.configure( Server.isDevelopment ? {
    port: 8888
} : {
    port: 80
});
server.start();

