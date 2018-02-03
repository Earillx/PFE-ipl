import {RequestHandler} from "express";

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


export function HttpGet(path?: string) {
    return function (target: Function, propertyKey: string, description: PropertyDescriptor) {
        console.log(target, propertyKey);
        let uri = target.name.substr(0, target.name.length - "Controller".length).toLowerCase();
        uri += path === null ? '/' : (path.charAt(0) === '/' ? path : "/" + path);

        Routes.push(new Route(uri, 'get', target[propertyKey] as RequestHandler));
    };
}


export default Routes;
