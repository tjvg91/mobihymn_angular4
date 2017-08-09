import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InputModalPage } from './input-modal';

@NgModule({
  declarations: [
    InputModalPage,
  ],
  imports: [
    IonicPageModule.forChild(InputModalPage),
  ],
})
export class InputModalPageModule {}
