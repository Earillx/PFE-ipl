declare module 'swagger-ui-express' {


    class SwaggerUiExpress {

        static serve(req: any, res: any, next: any): any;

        static setup(swaggerJSDoc: any, options?: any): any;

    }

    export = SwaggerUiExpress;
}

