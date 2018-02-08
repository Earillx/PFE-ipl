import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MachineDTO} from '../../../../../../shared/MachineDTO';
import {MockProblemsService} from '../../../../shared/services/mock/mock-problems.service';
import {ProblemDTO} from "../../../../../../shared/ProblemDTO";
import {AppSettings} from "../../../../../app.settings";
import {RouterModule} from "@angular/router";

@Component({
    selector: 'app-machine-preview',
    templateUrl: './machine-preview.component.html',
    styleUrls: ['./machine-preview.component.scss']
})
export class MachinePreviewComponent implements OnInit, OnChanges {
    public prefixURL = AppSettings.SERVER_ADDRESS;

    @Input()
    preview?: MachineDTO = null;

    knownProblems: ProblemDTO[] = [];

    constructor(
        private problemsService: MockProblemsService,
        private router: RouterModule) {
    }

    ngOnInit() {
        if (this.preview !== undefined && this.preview !== null) {
            this.updateKnownBugs();
        }
    }


    ngOnChanges(changes: SimpleChanges): void {
        if (changes.preview !== undefined && changes.preview.currentValue !== null
            && changes.preview.currentValue !== undefined) {
            this.updateKnownBugs();
        }
    }

    private updateKnownBugs() {
        this.problemsService
            .getProblemsForMachine(this.preview)
            .subscribe(problems => this.knownProblems = problems);
    }

    get print_etiquette() {
        return AppSettings.SERVER_ADDRESS + "/" + this.preview.url_etiquette;
    }
}
