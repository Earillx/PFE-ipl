import { Component, OnInit } from '@angular/core';
import {DevicesProviderService} from '../../shared/services/devices-provider.service';

@Component({
  selector: 'app-rooms-manager',
  templateUrl: './rooms-manager.component.html',
  styleUrls: ['./rooms-manager.component.scss']
})
export class RoomsManagerComponent implements OnInit {

    public rooms: string[];

    public devices: [{[key: string]: any}];

    public selectedRoom: string = null;

    public selectedDevice: number = -1;

    constructor(private deviceService: DevicesProviderService) { }

    ngOnInit() {
        this.deviceService.getDevices()
            .subscribe((devices) => {
                this.devices = devices;
                this.rooms = this.devices.map(_ => _.room).filter((value, index) => {
                    return this.devices.indexOf(value) === index;
                });
            });
    }


    selectRoom(room?: string): void {
        this.selectedRoom = room;
    }

    selectDevice(device: number): void {

    }

}
