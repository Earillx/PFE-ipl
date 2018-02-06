import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MachinesProviderService} from "../../../../shared/services";

@Component({
    selector: 'app-room-loader',
    templateUrl: './room-loader.component.html',
    styleUrls: ['./room-loader.component.css']
})
export class RoomLoaderComponent implements OnInit {

    public fileAnalyzed: boolean = false;

    file: FileList = null;

    analyzed: string = '';

    closeResult: string;

    constructor(private modalService: NgbModal,
                private machinesProvider: MachinesProviderService) { }

    ngOnInit() {}

    analyzeFile() {
        const reader: FileReader = new FileReader();

        reader.onloadend((event) => {
            // console.log(event.target.result);
            // this.fileAnalyzed = true;
            // this.analyzed = e.target.result;
        });

        // reader.readAsText(this.file);
    }

    open(content) {
        this.modalService.open(content, {
            size: 'lg',
            backdrop: true
        }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.file = null;
            this.fileAnalyzed = false;
            this.analyzed = null;
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
