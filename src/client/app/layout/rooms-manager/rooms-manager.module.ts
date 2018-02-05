import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsManagerComponent } from './rooms-manager.component';
import { PageHeaderModule } from '../../shared';
import {RoomsManagerRoutingModule} from "./rooms-manager-routing.module";


@NgModule({
  imports: [
    CommonModule,
      RoomsManagerRoutingModule,
      PageHeaderModule
  ],
  declarations: [RoomsManagerComponent]
})
export class RoomsManagerModule { }
