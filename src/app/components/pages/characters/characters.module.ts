import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersDetailsComponent } from './characters-details/characters-details.component';
import { CharactersListComponent } from './characters-list/characters-list.component';

import { RouterModule } from "@angular/router";

const myComponent = [CharactersDetailsComponent, CharactersListComponent]
@NgModule({
  declarations: [...myComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [...myComponent]
})
export class CharactersModule { }
