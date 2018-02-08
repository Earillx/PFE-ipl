import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoomsManagerComponent} from './rooms-manager.component';
import {PageHeaderModule} from '../../shared';
import {RoomsManagerRoutingModule} from './rooms-manager-routing.module';
import {MachinesProviderService} from '../../shared/services/machines-provider.service';
import {MachinePreviewComponent} from './components/machine-preview/machine-preview.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {MachineToolsComponent} from './components/machine-tools/machine-tools.component';
import {RoomLoaderComponent} from './components/room-loader/room-loader.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {IpscanGeneratorComponent} from "./components/ipscan-generator/ipscan-generator.component";

@NgModule({
    imports: [
        CommonModule,
        RoomsManagerRoutingModule,
        PageHeaderModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule,
        NgbModule.forRoot()
    ],
    declarations: [IpscanGeneratorComponent, RoomsManagerComponent, MachinePreviewComponent, MachineToolsComponent, RoomLoaderComponent],
    providers: [MachinesProviderService]
})
export class RoomsManagerModule {
}
