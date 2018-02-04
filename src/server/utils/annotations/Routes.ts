import {RequestHandler} from 'express';

const Routes: Route[] = [];

export class Route {

    public readonly uri: string;
    public readonly method: string;
    public readonly callback: RequestHandler;

    constructor(uri: string, method: string, callback: RequestHandler) {
        this.uri = uri;
        this.method = method;
        this.callback = callback;
    }

}

function routingAnnotation(path?: string, type?: string): Function {
    return function (target: any, propertyKey: string) {
        let uri = target.name.substr(0, target.name.length - 'Controller'.length).toLowerCase();

        uri += path === null ? '/' : (path.charAt(0) === '/' ? path : '/' + path);
        console.log('[HTTP-' + type.toUpperCase() + '] \t{api-prefix}/' + uri +
            ' => ' + target.name + '::' + propertyKey);
        Routes.push(new Route(uri, 'get', target[propertyKey] as RequestHandler));
    };
}


export function HttpHead(path?: string) {
    return routingAnnotation(path, 'head');
}

export function HttpGet(path?: string) {
    return routingAnnotation(path, 'get');
}

export function HttpPost(path?: string) {
    return routingAnnotation(path, 'post');
}

export function HttpPatch(path?: string) {
    return routingAnnotation(path, 'patch');
}

export function HttpPut(path?: string) {
    return routingAnnotation(path, 'put');
}

export function HttpDelete(path?: string) {
    return routingAnnotation(path, 'delete');
}

export default Routes;
