import {Injectable} from '@angular/core';
import {ProblemDTO} from '../../../../../shared/ProblemDTO';
import {UserDTO} from '../../../../../shared/UserDTO';
import {MachineDTO} from '../../../../../shared/MachineDTO';
import {AppSettings} from '../../../../app.settings';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Observable} from 'rxjs/Rx';
import {catchError} from 'rxjs/operators/catchError';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {of} from 'rxjs/observable/of';

@Injectable()
export class MockProblemsService {


    _selectedProblem = new ReplaySubject<ProblemDTO>(1);
    selectedProblem$ = this._selectedProblem.asObservable();


    set selectedProblem(problem: ProblemDTO) {
        this._selectedProblem.next(problem);
    }

    private user1: UserDTO;
    private user2: UserDTO;
    private user3: UserDTO;
    private user4: UserDTO;

    private machine1: MachineDTO;
    private machine2: MachineDTO;
    private machine3: MachineDTO;

    private problem1: ProblemDTO;
    private problem2: ProblemDTO;
    private problem3: ProblemDTO;
    private problem4: ProblemDTO;
    private problem5: ProblemDTO;

    private alreadyLoaded: boolean;

    static httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    constructor(private http: HttpClient,) {
        // problem_id, user_email, __machine-id, machine_name, ip_address, mac_address, comment, status, local,
        this.user1 = {
            __id: 1,
            email: 'damien.meur@student.vinci.be'
        };
        this.user2 = {
            __id: 2,
            email: 'clement.dujardin@student.vinci.be'
        };
        this.user3 = {
            __id: 3,
            email: 'alex.maniet@student.vinci.be'
        };
        this.user4 = {
            __id: 4,
            email: 'patrick.mazuez@student.vinci.be'
        };
        this.machine1 = {
            isAvailable: true,
            __id: 1,
            comment: 'commentaire1',
            ip_address: '192.168.0.110',
            local: '022',
            url_etiquette: 'hashIdMachine1',
            name: 'machine1',
            mac_address: '88:88:88:88:88:88',

        };
        this.machine2 = {
            isAvailable: true,
            __id: 2,
            comment: 'commentaire2',
            ip_address: '192.168.0.250',
            local: '017',
            url_etiquette: 'hashIdMachine2',
            name: 'machine2',
            mac_address: '99:99:99:99:99:99',

        };
        this.machine3 = {
            isAvailable: false,
            __id: 3,
            comment: 'commentaire3',
            ip_address: '192.168.0.230',
            local: '019',
            url_etiquette: 'hashIdMachine3',
            name: 'machine3',
            mac_address: 'ff:ff:ff:ff:ff:ff',

        };
        this.problem1 = {
            user: this.user1,
            problem_description: 'description du probleme1',
            __id: 1,
            date: new Date,
            status: 'ouvert',
            problem_photo: 'problemes/problem1.jpg',
            snapshot_machine: this.machine1,

        };
        this.problem2 = {
            user: this.user2,
            problem_description: 'description du probleme2',
            __id: 2,
            date: new Date,
            status: 'ouvert',
            problem_photo: 'problemes/problem2.jpg',
            snapshot_machine: this.machine2,

        };
        this.problem3 = {
            user: this.user3,
            problem_description: 'description du probleme3',
            __id: 3,
            date: new Date,
            status: 'ouvert',
            problem_photo: 'problemes/problem3.jpg',
            snapshot_machine: this.machine3,

        };
        this.problem4 = {
            user: this.user4,
            problem_description: 'description du probleme4',
            __id: 4,
            date: new Date,
            status: 'ouvert',
            problem_photo: 'problemes/problem4.jpg',
            snapshot_machine: this.machine3,

        };
        this.problem5 = {
            user: this.user1,
            problem_description: 'description du probleme5',
            __id: 5,
            date: new Date,
            status: 'fermé',
            problem_photo: 'problemes/problem5.jpg',
            snapshot_machine: this.machine2,

        };
        this.alreadyLoaded = true;
    }

    getProblems(): Observable<ProblemDTO[]> {
        let problems = [this.problem1, this.problem2, this.problem3, this.problem4, this.problem5];
        if (!this.alreadyLoaded)
            problems = problems.map(pb => this.replaceURL(pb));
        return of(problems);
    }

    getProblem(): Observable<ProblemDTO> {
        return of(this.replaceURL(this.problem1));
    }

    replaceURL(problem: ProblemDTO): ProblemDTO {
        problem.problem_photo = AppSettings.IMAGE_ADDRESS + '/' + problem.problem_photo;
        return problem;
    }

    getProblemsForMachine(machine: MachineDTO): Observable<ProblemDTO[]> {
        console.log('Loading for machine ', machine);

        if (!machine) {
            return of([]);
        }
        let problems = [this.problem1, this.problem2, this.problem3, this.problem4, this.problem5];

        return of(problems.filter((problem: ProblemDTO) => {
            return problem.snapshot_machine.__id === machine.__id;
        }));
    }

    public addProblem(problem: ProblemDTO): Observable<ProblemDTO> {
        console.log('ici');
        return this.http.post<ProblemDTO>(AppSettings.API_ADDRESS + '/problem', problem, MockProblemsService.httpOptions).pipe(
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
