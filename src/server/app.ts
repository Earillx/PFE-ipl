'use strict';

import Server from './Server';

const server = new Server();
server.configure(  {
    port: Server.ifDev(8888),
    jwt: {
        secret: Server.isDevelopment ? 'simplesecret' : 'oahdxucyhitjangxduwigzyxgnctdbonzfxydcxnfywldaz'
    }
});
server.start();

