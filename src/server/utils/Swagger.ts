/// <reference path="./declarations/swagger-ui-express.d.ts" />
import * as express from 'express';
import swaggerJSDoc = require('swagger-jsdoc');
import swaggerUiExpress = require('swagger-ui-express');


export default class SwaggerIntegration {

    static options = {
        swaggerDefinition: {
            info: {
                title: 'PFE API', // Title (required)
                version: '1.0.0', // Version (required)
            },
        },

        apis : [
            __dirname + '/../controllers/*Controller.js'
        ]
    };

    static uiOptions = {
        explorer: true
    };


    static integrate(express: express.Application) {
        let spec = swaggerJSDoc(this.options);

        express.get('/api/documentation.json', (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(spec);
        });

        express.use('/api/documentation', swaggerUiExpress.serve, swaggerUiExpress.setup(spec, this.uiOptions));
    }

}
