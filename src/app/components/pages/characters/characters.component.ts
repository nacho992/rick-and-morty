import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Character } from 'src/app/interfaces/character.interface';



@Component({
    selector:'app-character',
    styleUrls: ['./characters.component.scss'],
    template:`
    <div class="img">
        <a [routerLink]="['/character-details', character.id]">
          <img
            [src]="character.image"
            [alt]="character.name"
            class="car-img-top"
          />
        </a>
      </div>

      <div class="card-body">
        <a [routerLink]="['/character-details', character.id]">
          <h2>{{ character.name | slice: 0:15 }}</h2>
        </a>
        <h4 class="text-muted">{{ character.gender }}</h4>
        <small class="text-muted">{{ character.created | date }}</small>
      </div>`,
    changeDetection:ChangeDetectionStrategy.OnPush
})

export class CharacterComponent{
    @Input() character!:Character;
}