import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsManagerComponent } from './rooms-manager.component';
import { PageHeaderModule } from '../../shared';
import {RoomsManagerRoutingModule} from './rooms-manager-routing.module';
import {DevicesProviderService} from '../../shared/services/devices-provider.service';


@NgModule({
  imports: [
      CommonModule,
      RoomsManagerRoutingModule,
      PageHeaderModule
  ],
  declarations: [RoomsManagerComponent],
  providers: [ DevicesProviderService ]
})
export class RoomsManagerModule { }
