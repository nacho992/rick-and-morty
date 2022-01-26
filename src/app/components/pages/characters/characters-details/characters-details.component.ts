import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Character } from 'src/app/interfaces/character.interface';
import { CharacterService } from 'src/app/shared/services/character.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-characters-details',
  templateUrl: './characters-details.component.html',
  styleUrls: ['./characters-details.component.scss']
})
export class CharactersDetailsComponent implements OnInit {

  character$: Observable<Character> | undefined;

  constructor(
    private route: ActivatedRoute,
    private charService: CharacterService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.pipe().subscribe( (params) => {
      const id = params['id'];
      this.character$ = this.charService.getDetails(id);
      console.log(this.character$.subscribe(res => console.log(res)))
    } )
  }

  onGoBack():void {
    this.location.back();
  }

}
