import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthorModalPage } from './author-modal';

@NgModule({
  declarations: [
    AuthorModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthorModalPage),
  ],
})
export class AuthorModalPageModule {}
