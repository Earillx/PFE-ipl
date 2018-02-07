import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserDTO} from "../../../../shared/UserDTO";
import {AppSettings} from "../../../app.settings";
import {Observable} from 'rxjs/Rx';
import {catchError} from 'rxjs/operators/catchError';
import {of} from 'rxjs/observable/of';



@Injectable()
export class UsersService {
    static httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    constructor(private http: HttpClient) {
    }
    public addUser(user: UserDTO): Observable<UserDTO> {
        return this.http.post<UserDTO>( '/user', user, UsersService.httpOptions).pipe(
            catchError(this.handleError<UserDTO>('addUser')));
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
