'use strict';

import * as BodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import Routes, {Route} from './utils/annotations/Routes';
import Controllers from './controllers';
import SecurityContextGroups from './config/SecurityContextGroups';
import SwaggerIntegration from './utils/Swagger';
import IServerConfiguration from './config/IServerConfiguration';
import TokenMiddleware from './utils/middleware/tokens';
import * as mongoose from "mongoose";
import {Helmet} from "helmet";
import bodyParser = require("body-parser");

export default class Server extends IServerConfiguration {


    public static readonly isDevelopment: boolean = process.env.NODE_ENV === 'development';
    public static readonly serverAddress: string = Server.isDevelopment ? 'http://192.168.43.165:8888/' : 'http://192.168.43.165:8888/';
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
/*
    private static handleError(err: express.Errback, req: express.Request, res: express.Response): express.Response {
        console.error(err);
        return res.status(500).send();
    }

    private static handle404(req: express.Request, res: express.Response): express.Response {
        console.error('[404]: ' + req.method + ':' + req.path);
        return res.status(404).send();
    }
    */

    public clearDB() {

    }


    public configure(config: IServerConfiguration) {
        this.port = config.port ? config.port : 8888;
        this.prefix = config.prefix ? config.prefix : '/api';
        this.helmet = config.helmet ? config.helmet : {};
        this.jwt = config.jwt ? config.jwt : {secret: 'secrettooverride!'};
        this.dbURI = config.dbURI ? config.dbURI : 'mongodb://localhost/mongo';


        // Rewriting + Parsing + Security middleware
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Access-Control-Allow-Methods', 'GET,PUT, POST,DELETE,OPTIONS');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
            res.header("Access-Control-Max-Age", "1728000");

            if (req.method === 'OPTIONS') {
                res.sendStatus(200);
            } else {
                next();
            }
        });
        // this.app.use(Helmet(this.helmet));
        this.app.use(BodyParser({limit: '50mb'}));


        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            console.log("Query at HTTP-" + req.method + ":" + req.path);
            next();
        });
        this.app.use(TokenMiddleware.handle(this.prefix, this.jwt));

        // Routes registration
        let router: express.Router = express.Router();
        Routes.forEach((route: Route) => {
            router[route.method](this.prefix + route.uri, route.callback);
        });

        router.get('*', (req, res: express.Response) => {
            res.sendFile(path.resolve(__dirname + "../../../../dist/index.html"));
        });

        // Routing middlewares
        SwaggerIntegration.integrate(this.app);
        this.app.use('/', express.static(path.join(__dirname, '../../../', 'dist')));
        this.app.use('/images', express.static(path.join(__dirname, '../../../', 'images')));

        this.app.use(router);
        //this.app.use(Server.handleError);

        // MongoDB connection
        let conn = mongoose.connect(this.dbURI, (err) => {
            if (err) {
                console.log(err.message);
                console.log(err);
            } else {
                console.log('Connected to MongoDb on ' + this.dbURI);

            }
        });


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
