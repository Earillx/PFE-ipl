import { Injectable } from '@angular/core';
import {of} from "rxjs/observable/of";
import {Observable} from "rxjs/Observable";


@Injectable()
export class MockProblemsService {


    constructor() { }

    getProblems(): Observable<[{ [key:string]:any; }]> {
        //problem_id, user_email, __machine-id, machine_name, ip_address, mac_address, comment, status, local,
        let problems : [{ [key:string]:any; }] =[
            {
                "id_problem":1,
                "date": new Date(),
                "email": "damienmeur@gmail.com",
                "local": "O17",
                "name_machine": "3BGHDKSD",
                "isAvailable":true,

            }, {
                "id_problem":2,
                "date": new Date(),
                "email": "gerardJugnot@gmail.com",
                "local": "O18",
                "name_machine": "32ZJDA",
                "isAvailable":false,

            }
        ];
        return of(problems);
    }
    getProblem(): Observable<any> {
        //problem_id, user_email, __machine-id, machine_name, ip_address, mac_address, comment, status, local,
        let problem : { [key:string]:any; } =
            {
                "id_problem":1,
                "date": new Date(),
                "email": "damienmeur@gmail.com",
                "local": "O17",
                "name_machine": "3BGHDKSD",
                "isAvailable":true,

            };
        return of(problem);
    }

}
