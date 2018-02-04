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



export function HttpHead(path?: string) {
    return function (target: Function, propertyKey: string, description: PropertyDescriptor) {
        console.log(target, propertyKey);
        let uri = target.name.substr(0, target.name.length - 'Controller'.length).toLowerCase();
        uri += path === null ? '/' : (path.charAt(0) === '/' ? path : '/' + path);

        Routes.push(new Route(uri, 'head', target[propertyKey] as RequestHandler));
    };
}


export function HttpGet(path?: string) {
    return function (target: Function, propertyKey: string, description: PropertyDescriptor) {
        console.log(target, propertyKey);
        let uri = target.name.substr(0, target.name.length - 'Controller'.length).toLowerCase();
        uri += path === null ? '/' : (path.charAt(0) === '/' ? path : '/' + path);

        Routes.push(new Route(uri, 'get', target[propertyKey] as RequestHandler));
    };
}

export function HttpPost(path?: string) {
    return function (target: Function, propertyKey: string, description: PropertyDescriptor) {
        console.log(target, propertyKey);
        let uri = target.name.substr(0, target.name.length - 'Controller'.length).toLowerCase();
        uri += path === null ? '/' : (path.charAt(0) === '/' ? path : '/' + path);

        Routes.push(new Route(uri, 'post', target[propertyKey] as RequestHandler));
    };
}

export function HttpPatch(path?: string) {
    return function (target: Function, propertyKey: string, description: PropertyDescriptor) {
        console.log(target, propertyKey);
        let uri = target.name.substr(0, target.name.length - 'Controller'.length).toLowerCase();
        uri += path === null ? '/' : (path.charAt(0) === '/' ? path : '/' + path);

        Routes.push(new Route(uri, 'patch', target[propertyKey] as RequestHandler));
    };
}

export function HttpPut(path?: string) {
    return function (target: Function, propertyKey: string, description: PropertyDescriptor) {
        console.log(target, propertyKey);
        let uri = target.name.substr(0, target.name.length - 'Controller'.length).toLowerCase();
        uri += path === null ? '/' : (path.charAt(0) === '/' ? path : '/' + path);

        Routes.push(new Route(uri, 'put', target[propertyKey] as RequestHandler));
    };
}

export function HttpDelete(path?: string) {
    return function (target: Function, propertyKey: string, description: PropertyDescriptor) {
        console.log(target, propertyKey);
        let uri = target.name.substr(0, target.name.length - 'Controller'.length).toLowerCase();
        uri += path === null ? '/' : (path.charAt(0) === '/' ? path : '/' + path);

        Routes.push(new Route(uri, 'delete', target[propertyKey] as RequestHandler));
    };
}

export default Routes;
