import {Injectable} from '@angular/core';
import {MachineDTO} from '../../../../shared/MachineDTO';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Observable} from "rxjs/Observable";
import {map} from "rxjs/operators/map";


@Injectable()
export class MachinesProviderService {

    private static readonly CREATOR = val => Observable.of(val);
    static mockId: number = 0;
    static mockMachines: MachineDTO[] = [
        {
            '__id': '1',
            'name': 'machine-1',
            'local': 'A1',
            'comment': 'azeazeoah  ahda dua',
            is_available: false
        } as MachineDTO,
        {
            '__id': '2',
            'name': 'machine-2',
            'local': 'A1',
            'comment': 'azeazeoah  ahda dua',
            is_available: true
        } as MachineDTO,
        {
            '__id': '3',
            'name': 'machine-3',
            'local': 'K2',
            'comment': 'azeazeoah  ahda dua',
            is_available: true
        } as MachineDTO,
        {
            '__id': '4',
            'name': 'machine-4',
            'local': 'A1',
            'comment': 'azeazeoah  ahda dua',
            is_available: true
        } as MachineDTO,
        {
            '__id': '5',
            'name': 'machine-5',
            'local': 'A1',
            'comment': 'azeazeoah  ahda dua',
            is_available: true
        } as MachineDTO,
        {
            '__id': '6',
            'name': 'machine-6',
            'local': 'K2',
            'comment': 'azeazeoah  ahda dua',
            is_available: true
        } as MachineDTO,
        {
            '__id': '7',
            'name': 'machine-7',
            'local': 'A1',
            'comment': 'azeazeoah  ahda dua',
            is_available: true
        } as MachineDTO,
        {
            '__id': '8',
            'name': 'machine-8',
            'local': 'A1',
            'comment': 'azeazeoah  ahda dua',
            is_available: true
        } as MachineDTO,
        {
            '__id': '9',
            'name': 'machine-9',
            'local': 'K2',
            'comment': 'azeazeoah  ahda dua',
            is_available: true
        } as MachineDTO,
        {
            '__id': '10',
            'name': 'machine-10',
            'local': 'A1',
            'comment': 'azeazeoah  ahda dua',
            is_available: true
        } as MachineDTO,
        {
            '__id': '11',
            'name': 'machine-11',
            'local': 'A1',
            'comment': 'azeazeoah  ahda dua',
            is_available: true
        } as MachineDTO,
        {
            '__id': '12',
            'name': 'machine-12',
            'local': 'K2',
            'comment': 'azeazeoah  ahda dua',
            is_available: true
        } as MachineDTO
    ];

    private __machines: MachineDTO[] = [];

    private _machines = new ReplaySubject<MachineDTO[]>();
    private machines$ = this._machines.asObservable();

    set machines(machines: MachineDTO[]) {
        this._machines.next(machines);
    }

    constructor() {
        MachinesProviderService.mockId = MachinesProviderService.length;
        this.machines = MachinesProviderService.mockMachines;
        this.machines$.subscribe(_ => this.__machines = _);
    }

    public getMachines() {
        return this.machines$;
    }

    public getMachineForLocal(local: string) {
        return this.machines$.pipe(map(data => {
            return data.filter(_ => _.local === local);
        }));
    }

    public getMachine(id: string) {
        return this.machines$.pipe<MachineDTO>(map(data => {
            return data.find(_ => _.__id === id);
        }));
    }

    public updateMachines(local: string, toUpdate: MachineDTO[], toInsert: MachineDTO[], toRemove: MachineDTO[]) {
        toInsert = toInsert.map(_ => {
            _.__id = (MachinesProviderService.mockId++).toString();
            return _;
        });
        toUpdate = toUpdate.map(_ => {
            _.__id = (MachinesProviderService.mockId++).toString();
            return _;
        });
        this.machines = this.__machines
            .filter(_ => _.local !== local)
            .concat(toInsert, toUpdate);
    }

}
