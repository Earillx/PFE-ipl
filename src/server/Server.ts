'use strict';

import * as BodyParser from 'body-parser';
import * as Helmet from 'helmet';
import * as express from 'express';
import * as path from 'path';
import Routes, {Route} from './utils/annotations/Routes';
import Controllers from './controllers';
import SecurityContextGroups from './config/SecurityContextGroups';
import SwaggerIntegration from './utils/Swagger';
import IServerConfiguration from './config/IServerConfiguration';
import TokenMiddleware from './utils/middleware/tokens';

export default class Server extends IServerConfiguration {


    public static readonly isDevelopment: boolean = process.env.NODE_ENV === 'development';
    private app: express.Application = express();
    // Following lines are used to ensure imports
    private controllers = Controllers; // tslint:disable-line
    private groups = SecurityContextGroups; // tslint:disable-line

    static ifDev<T>(value: T): T {
        return this.isDevelopment ? value : null;
    }

    static ifProd<T>(value: T): T {
        return this.isDevelopment ? null : value;
    }

    private static handleError(err: express.Errback, req: express.Request, res: express.Response): express.Response {
        console.error(err);
        return res.sendStatus(500);
    }

    private static handle404(req: express.Request, res: express.Response): express.Response {
        console.error('[404]: ' + req.method + ':' + req.path);
        return res.sendStatus(404);
    }

    public configure(config: IServerConfiguration) {
        this.port = config.port ? config.port : 8888;
        this.prefix = config.prefix ? config.prefix : '/api/';
        this.helmet = config.helmet ? config.helmet : {};
        this.jwt = config.jwt ? config.jwt : { secret: 'secrettooverride!' };

        // Parsing + Security middleware
        this.app.use(Helmet(this.helmet));
        this.app.use(BodyParser());
        this.app.use(TokenMiddleware.handle(this.prefix, this.jwt));

        // Routes registration
        let router: express.Router = express.Router();
        Routes.forEach((route: Route) => {
            router[route.method](this.prefix + route.uri, route.callback);
        });
        router.all('*', Server.handle404);

        // Routing middlewares
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
