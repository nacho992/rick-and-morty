import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/interfaces/character.interface';
import { CharacterService } from 'src/app/shared/services/character.service';
//import { take } from "rxjs/operators";
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

  constructor(private charService: CharacterService) { }

  ngOnInit(): void {
    this.getDataService();
  }

  private getDataService(): void {
    this.charService.searchCharacters(this.query, this.pageNum)
    .pipe()
    .subscribe( (res: any) => {
      const { info, results } = res;
      this.characters = [...this.characters, ...results]
      this.info = info;
      console.log(this.characters)
    } )
  }

}
function take(arg0: number): import("rxjs").OperatorFunction<Character[], unknown> {
  throw new Error('Function not implemented.');
}

