'use strict';
import * as mongoose from "mongoose";


import Server from './Server';
import PopulateDb from "./PopulateDb";

const server = new Server();
server.configure({
    port: process.env.PORT,
    jwt: {
        secret: Server.isDevelopment ? 'simplesecret' : 'oahdxucyhitjangxduwigzyxgnctdbonzfxydcxnfywldaz',
        sign : {
            expiresIn: '30days'
        }
    },
    dbURI: Server.isDevelopment ? 'mongodb://localhost/mongo' : 'mongodb://localhost/mongo', // add prod url later
});
mongoose.connection.dropDatabase();
PopulateDb.fillDb();
server.start();


