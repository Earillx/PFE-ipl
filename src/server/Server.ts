'use strict';

import * as path from 'path';
import {Route} from './utils/annotations/Routes';
import Routes from './utils/annotations/Routes';
import * as express from 'express';
import Controllers from './controllers';
import SwaggerIntegration from './utils/Swagger';
import IServerConfiguration from './IServerConfiguration';

export default class Server extends IServerConfiguration {

    public static readonly isDevelopment: boolean = process.env.NODE_ENV === 'development';
    private app: express.Application = express();
    // Do not touch this please <3
    private controllers = Controllers; // tslint:disable-line

    private static handleError(err: any, req: express.Request, res: express.Response): express.Response {
        // console.error(err);
        return res.sendStatus(500);
    }

    private static handle404(req: express.Request, res: express.Response): express.Response {
        console.error('[404]: ' + req.method + ':' + req.path);
        return res.sendStatus(404);
    }

    public configure(config: IServerConfiguration) {
        this.port = config.port ? config.port : 8888;
        this.prefix = config.prefix ? config.prefix : '/api/';


        let router: express.Router = express.Router();

        Routes.forEach((route: Route) => {
            console.log('Hooking ' + route.uri + ' on HTTP' + route.method);
            router[route.method](this.prefix + route.uri, route.callback);
        });

        router.all('*', Server.handle404);

        SwaggerIntegration.integrate(this.app);
        this.app.use('/assets', express.static(path.join(__dirname, '../../', 'dist')));
        this.app.use(router);
        this.app.use(Server.handleError);
    }


    public start() {
        this.app.listen(this.port, () => {
            console.log(`🌎  Listening on port ${this.port} in ${process.env.NODE_ENV} mode on Node ${process.version}.`);
            if (Server.isDevelopment) {
                console.log('Open http://localhost:8888');
            }
        });
    }
}
