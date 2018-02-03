"use strict";

import * as express from 'express';
import UserController from "./controllers/UserController";
import Routes, { Route } from './utils/annotations/Routes';

class Server {

    public readonly isDevelopment: boolean = process.env.NODE_ENV === 'development';
    private app: express.Application = express();

    private prefix: string = "/api/";

    public configure() {
        this.config();
    }

    public start() {
        let router: express.Router = express.Router();

        Routes.forEach((route: Route) => {
            console.log("Hooking " + route.uri + " on HTTP" + route.method);
            router[route.method](this.prefix + route.uri, route.callback);
        });

        this.app.use(router);
        this.app.listen(8888);
    }

    private config() {
        new UserController();
    }

}

const server = new Server();

server.configure();
server.start();
