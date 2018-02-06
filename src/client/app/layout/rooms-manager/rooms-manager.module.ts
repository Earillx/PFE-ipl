import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsManagerComponent } from './rooms-manager.component';
import { PageHeaderModule } from '../../shared';
import {RoomsManagerRoutingModule} from './rooms-manager-routing.module';
import {MachinesProviderService} from '../../shared/services/machines-provider.service';
import { MachinePreviewComponent } from './components/machine-preview/machine-preview.component';
import { FormsModule } from '@angular/forms';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import { MachineToolsComponent } from './components/machine-tools/machine-tools.component';
import { RoomLoaderComponent } from './components/room-loader/room-loader.component';
import { PopupServiceService } from './components/room-loader/popup-service.service';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
      CommonModule,
      RoomsManagerRoutingModule,
      PageHeaderModule,
      FormsModule,
      NgxDatatableModule,
      NgbModule.forRoot()
  ],
  declarations: [RoomsManagerComponent, MachinePreviewComponent, MachineToolsComponent, RoomLoaderComponent],
  providers: [ MachinesProviderService, PopupServiceService ]
})
export class RoomsManagerModule { }
