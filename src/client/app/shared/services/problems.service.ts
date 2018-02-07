import {Injectable} from '@angular/core';

import {AppSettings} from './../../../app.settings';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Observable} from 'rxjs/Rx';
import {catchError} from 'rxjs/operators/catchError';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {of} from 'rxjs/observable/of';
import {ProblemDTO} from "../../../../shared/ProblemDTO";
import {MachineDTO} from "../../../../shared/MachineDTO";

@Injectable()
export class ProblemsService {


    static httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    private _selectedProblem = new ReplaySubject<ProblemDTO>(1);

    public selectedProblem$ = this._selectedProblem.asObservable();

    set selectedProblem(problem: ProblemDTO) {
        this._selectedProblem.next(problem);
    }


    constructor(private http: HttpClient) {
    }


    getProblems(): Observable<ProblemDTO[]> {
        /*
        //TODO
        return this.http.get<ProblemDTO>(AppSettings.API_ADDRESS + '/problem', problem, ProblemsService.httpOptions).pipe(
            catchError(this.handleError<ProblemDTO>('getProblems')));
            */
        return null;
    }

    replaceURL(problem: ProblemDTO): ProblemDTO {
        problem.problem_photo = AppSettings.IMAGE_ADDRESS + '/' + problem.problem_photo;
        return problem;
    }

    getProblemsForMachine(machine: MachineDTO): Observable<ProblemDTO[]> {
        //TODO
        /*
        console.log('Loading for machine ', machine);

        if (!machine) {
            return of([]);
        }
        let problems = [this.problem1, this.problem2, this.problem3, this.problem4, this.problem5];

        return of(problems.filter((problem: ProblemDTO) => {
            return (<MachineDTO>problem.machine).__id === machine.__id;
        }));*/
        return null;
    }

    public addProblem(problem: ProblemDTO): Observable<ProblemDTO> {
        console.log("ici");
        return this.http.post<ProblemDTO>(AppSettings.API_ADDRESS + '/problem', problem, ProblemsService.httpOptions).pipe(
            catchError(this.handleError<ProblemDTO>('addProblem')));
    }


    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error); // log to console instead
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }


}
