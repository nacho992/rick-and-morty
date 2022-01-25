import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersListRoutingModule } from './characters-list-routing.module';
import { CharactersListComponent } from './characters-list.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CharactersListRoutingModule
  ],
})
export class CharactersListModule { }
