import {Injectable} from '@angular/core';
import {MachineDTO} from '../../../../shared/MachineDTO';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {map} from "rxjs/operators/map";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class MachinesProviderService {

    private __machines: MachineDTO[] = [];
    private _machines = new ReplaySubject<MachineDTO[]>();
    private machines$ = this._machines.asObservable();

    private __loading = true;
    private _loading = new ReplaySubject<boolean>();
    private loading$ = this._loading.asObservable();

    get loading(): boolean {
        return this.__loading;
    }
    set loading(state: boolean) {
        this._loading.next(state);
    }

    constructor(private http: HttpClient) {
        this.machines = [];

        this.machines$.subscribe(_ => this.__machines = _);
        this.loading$.subscribe((loading) => this.__loading = loading);

        this.loadMachines();
    }

    public onLoading(): Observable<boolean> {
        return this.loading$.filter(_ => _ === true);
    }

    public onLoaded(): Observable<boolean> {
        return this.loading$.filter(_ => _ === false);
    }

    set machines(machines: MachineDTO[]) {
        this._machines.next(machines);
    }

    public loadMachines() {
        this.loading = true;
        this.http.get<MachineDTO[]>('/machines').subscribe((machines: MachineDTO[]) => {
            this.machines = machines;
            this.loading = false;
        });
    }

    public getMachines(): Observable<MachineDTO[]> {
        return this.machines$;
    }

    public getMachineForLocal(local: string) {
        return this.machines$.map((data) => {
            return data.filter(_ => _.local === local);
        });
    }

    public getMachine(id: string): Observable<MachineDTO> {
        return this.machines$.pipe<MachineDTO>(map(data => {
            return data.find(_ => _.__id === id);
        }));
    }

    public loadMachine(id: string): Observable<MachineDTO> {
        return this.http.get<MachineDTO>("/machine/" + id);
    }

    public updateMachines(local: string, toUpdate: MachineDTO[], toInsert: MachineDTO[], toRemove: MachineDTO[]) {
        // toInsert = toInsert.map(_ => {
        //     _.__id = (MachinesProviderService.mockId++).toString();
        //     return _;
        // });
        // toUpdate = toUpdate.map(_ => {
        //     _.__id = (MachinesProviderService.mockId++).toString();
        //     return _;
        // });
        // this.machines = this.__machines
        //     .filter(_ => _.local !== local)
        //     .concat(toInsert, toUpdate);
    }

}
