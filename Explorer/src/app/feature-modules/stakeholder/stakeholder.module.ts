import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {MaterialModule} from 'src/app/infrastructure/material/material.module';
import {FormsModule} from '@angular/forms';
import {EditProfileComponent} from "./edit-profile/edit-profile.component";

@NgModule({
  declarations: [UserProfileComponent, EditProfileComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [UserProfileComponent, EditProfileComponent],
})
export class StakeholderModule {
}