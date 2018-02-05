'use strict';

import Server from './Server';

const server = new Server();
server.configure(  {
    port: process.env.PORT,
    jwt: {
        secret: Server.isDevelopment ? 'simplesecret' : 'oahdxucyhitjangxduwigzyxgnctdbonzfxydcxnfywldaz'
    }
});
server.start();

