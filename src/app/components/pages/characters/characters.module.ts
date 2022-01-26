import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersDetailsComponent } from './characters-details/characters-details.component';
import { CharactersListComponent } from './characters-list/characters-list.component';

import { RouterModule } from "@angular/router";
import { CharacterComponent } from './characters.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const myComponent = [
  CharactersDetailsComponent,
  CharactersListComponent,
  CharacterComponent
]
@NgModule({
  declarations: [...myComponent],
  imports: [
    CommonModule,
    RouterModule,
    InfiniteScrollModule
  ],
  exports: [...myComponent]
})
export class CharactersModule { }
