'use strict';

import Server from './Server';

const server = new Server();
server.configure(  {
    port: process.env.PORT,
    jwt: {
        secret: Server.isDevelopment ? 'simplesecret' : 'oahdxucyhitjangxduwigzyxgnctdbonzfxydcxnfywldaz'
    },
    dbURI: Server.isDevelopment ? 'mongodb://localhost/mongo' : 'mongodb://localhost/mongo', // add prod url later
});
server.start();

