import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MachinesProviderService} from "../../../../shared/services";

@Component({
    selector: 'app-room-loader',
    templateUrl: './room-loader.component.html',
    styleUrls: ['./room-loader.component.css']
})
export class RoomLoaderComponent implements OnInit {

    file;

    closeResult: string;

    constructor(private modalService: NgbModal,
                private machinesProvider: MachinesProviderService) { }

    ngOnInit() {


    }


    open(content) {
        this.modalService.open(content, {
            size: 'lg',
            backdrop: true
        }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }


    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

}
