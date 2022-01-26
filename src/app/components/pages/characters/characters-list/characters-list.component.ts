import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Character } from 'src/app/interfaces/character.interface';
import { CharacterService } from 'src/app/shared/services/character.service';
import { filter } from "rxjs/operators";
type RequesInfo = {
  next: string
};

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {

  characters: Character[] = [];
  info: RequesInfo = {
    next: '',
  }
  private pageNum = 1;
  private query = '';
  private hideScrollHeigth = 200;
  private showScrollHeigth = 500;

  constructor(private charService: CharacterService,
              private route: ActivatedRoute,
              private router: Router )
  { this.onUrlChanged() }

  ngOnInit(): void {
    this.getCharactersByQuery();
  }

  private onUrlChanged(): void{
    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe(() => {
      this.characters = [];
      this.pageNum = 1;
      this.getCharactersByQuery();
    })
    
  }

  private getCharactersByQuery(): void{
    this.route.queryParams.pipe().subscribe((params) => {
      console.log('Params -->', params)
      this.query = params['q'];
      this.getDataService();
    })
  }

  private getDataService(): void {
    this.charService.searchCharacters(this.query, this.pageNum)
    .pipe()
    .subscribe( (res: any) => {
      if (!res?.results?.length) {
        this.characters = []
      }

      if (res?.results?.length) {
        const { info, results } = res;
        this.characters = [...this.characters, ...results]
        this.info = info;
      }
    } )
  }

}
function take(arg0: number): import("rxjs").OperatorFunction<Character[], unknown> {
  throw new Error('Function not implemented.');
}

