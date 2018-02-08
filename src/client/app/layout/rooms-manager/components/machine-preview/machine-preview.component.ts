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
    public prefixURL = AppSettings.IMAGE_ADDRESS;


    @Input()
    preview?: MachineDTO = null;

    knownProblems: ProblemDTO[] = [];

    public QRbase64: string = 'iVBORw0KGgoAAAANSUhEUgAAA+gAAAPoAQMAAAB3bUanAAAABlBMVEUAAAD///+l2Z/dAAACzklEQVR4Xu3dQWvDMAyA0eSf95c3Y7mISLMUOrYWeN8pxtDns8HVdryz7bGNncBq4+z5vdqvwHMb2z9Tp9PpdDqdTqfT6XQ6nU6n049VSc8bTelEdZdOp9PpdDqdTqc30el0Op1Op2/RYFYkc3Uj2n+j0+l0Op1Op9PpdDqdTqfT6fTalgr4L3U6nU6n0+l0Op1Op9PpdDqdHtw/6HQ6nU6n0+l0Op1Op9PpdDp91daerTFfegtMp9PpdDqdTqfT6XQ6nU6n05uGe8MkZX2InqPT6XQ6nU6n0+l0Op1Op9OPm6XDRAv9VvRLdDqdTqfT6XQ6nU6n0+l0erotXHCLZZh9dQzG2U6n0+l0Op1Op9PpY3Q6nU6n0wNpao7QDKul0+l0Op3eRKfT6XQ6nU6n0+n9oIu7cwdCH8xY0ukRnU6n0+l0Op1Op9PpdDp9njcxD6ad51nk5TX6JTqdTqfT6XQ6nU6n0+l0Or0ZZdH1Ipd2P06n0+l0Op1Op9PpdDqdTqfTH6sfLEjduDkQds/wGZ1Op9PpOTqdTqfT6XQ6nU6nr82tPdbZdFsYel3S6XQ6nU6n0+l0Op1Op9Pp9PEf5GbzPhzcKvolOp1Op9PpdDqdTqfT6XQ6PSF3H+L2DwNq9ZkuvUan0+l0Op1Op9PpdDqdTqfPzfNhn+UrCq5+0el0Op1Op9PpdDqdTqfT6fTxPWyRao1epXxlSKc30el0Op1Op9PpdDqdTqfTj1Whj28HKjLPqaXTa3Q6nU6n0+l0Op1Op9Pp9JB+QpoTJb0rXSO+ptPpdDqdTqfT6XQ6nU6n0+n0oapPx3pdp9PpdDqdTqfT6XQ6nU6n0+n166wfLzDPrt3p9IhOp9PpdHpEp9PpdDqdTqfXlnosh2kD0c23wHQ6nU6n0+l0Op1Op9PpdDq9q78j7PUwl0v6JTqdTqfT6XQ6nU6n0+l0Ov14Z19bU+3PR9EPDQAAAABJRU5ErkJggg==';

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
