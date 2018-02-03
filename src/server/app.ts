'use strict';

import * as express from 'express';
import Controllers from './controllers';
import Routes, { Route } from './utils/annotations/Routes';
import * as path from 'path';

class Server {

    public readonly isDevelopment: boolean = process.env.NODE_ENV === 'development';
    private app: express.Application = express();

    private prefix: string = '/api/';

    public configure() {
        // Do not touch this please <3
        let controller = Controllers;

        this.app.use('/assets', express.static(path.join(__dirname, '../../', 'dist')));

        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            console.log(err);
            return res.sendStatus(500);
        });
    }

    public start() {
        let router: express.Router = express.Router();

        Routes.forEach((route: Route) => {
            console.log('Hooking ' + route.uri + ' on HTTP' + route.method);
            router[route.method](route.uri, route.callback);
        });

        this.app.use(this.prefix, router);
        this.app.listen(8888, () => {
            console.log(`🌎  Listening on port ${8888} in ${process.env.NODE_ENV} mode on Node ${process.version}.`);
            if (this.isDevelopment) {
                console.log('Open http://localhost:8888');
            }
        });
    }
}

const server = new Server();

server.configure();
server.start();
