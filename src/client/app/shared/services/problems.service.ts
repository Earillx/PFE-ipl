import {Injectable} from '@angular/core';

import {AppSettings} from './../../../app.settings';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Observable} from 'rxjs/Rx';
import {catchError} from 'rxjs/operators/catchError';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {of} from 'rxjs/observable/of';
import {ProblemDTO} from '../../../../shared/ProblemDTO';
import {MachineDTO} from "../../../../shared/MachineDTO";


@Injectable()
export class ProblemsService {


    static httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    private __problems: ProblemDTO[] = [];
    private _problems = new ReplaySubject<ProblemDTO[]>();
    private problems$ = this._problems.asObservable();
    private _selectedProblem = new ReplaySubject<ProblemDTO>(1);
    public selectedProblem$ = this._selectedProblem.asObservable();

    set selectedProblem(problem: ProblemDTO) {
        this._selectedProblem.next(problem);
    }

    private __loading = true;
    private _loading = new ReplaySubject<boolean>();
    private loading$ = this._loading.asObservable();

    get loading(): boolean {
        return this.__loading;
    }

    set loading(state: boolean) {
        this._loading.next(state);
    }

    set problems(problems: ProblemDTO[]) {
        this._problems.next(problems);
    }


    private $filtered: ReplaySubject<ProblemDTO[]> = new ReplaySubject(1);
    private filtered_: Observable<ProblemDTO[]> = this.$filtered.asObservable();

    getProblem(id: string): Observable<ProblemDTO> {
        return this.problems$.map<ProblemDTO>(_ => _.find(i => i.__id === id));
    }

    getProblems(): Observable<ProblemDTO[]> {
        return this.problems$;
    }

    public setFilteredList(problems: ProblemDTO[]) {
        this.$filtered.next(problems);
    }

    public getFilteredList(): Observable<ProblemDTO[]> {
        return this.filtered_;
    }



    constructor(private http: HttpClient) {
        this.$filtered.next([]);
        this.problems = [];
        this.problems$.subscribe(_ => this.__problems = _);
        this.loading$.subscribe((loading) => this.__loading = loading);
    }


    public onLoading(): Observable<boolean> {
        return this.loading$.filter(_ => _ === true);
    }

    public onLoaded(): Observable<boolean> {
        return this.loading$.filter(_ => _ === false);
    }

    public loadProblems() {
        this.loading = true;
        this.http.get<ProblemDTO[]>('/problems').subscribe((problems: ProblemDTO[]) => {
            this.problems = problems.map(pb => this.replaceURL(pb))
            this.loading = false;
        });
    }


    private replaceURL(problem: ProblemDTO): ProblemDTO {
        problem.problem_photo = AppSettings.IMAGE_ADDRESS + '/' + problem.problem_photo;
        return problem;
    }

    public addProblem(problem: ProblemDTO): Observable<ProblemDTO> {
        console.log(problem);
        return this.http.post<ProblemDTO>('/problem', problem, ProblemsService.httpOptions).pipe(
            catchError(this.handleError<ProblemDTO>('addProblem')));
    }

    public updateProblem(problem: ProblemDTO) {
        this.http.put<ProblemDTO>('/problem/' + problem.__id + '/status/' + problem.status, problem, ProblemsService.httpOptions)
            .subscribe((pb: ProblemDTO) => {
                this.__problems.filter(_ => _.__id !== problem.__id)
                    .concat(pb);
                this.problems = this.__problems;
            });
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
