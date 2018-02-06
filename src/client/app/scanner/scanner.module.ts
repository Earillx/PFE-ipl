import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScannerRoutingModule } from './scanner-routing.module';
import { ScannerComponent } from './scanner.component';

import { QrScannerModule } from 'angular2-qrscanner';

@NgModule({
  imports: [
    CommonModule,
    ScannerRoutingModule,
      QrScannerModule
  ],
  declarations: [ScannerComponent]
})
export class ScannerModule {

}
