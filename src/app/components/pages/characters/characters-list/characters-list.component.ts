import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Character } from 'src/app/interfaces/character.interface';
import { CharacterService } from 'src/app/shared/services/character.service';
import { filter } from "rxjs/operators";
import { DOCUMENT } from "@angular/common";
import { Location } from '@angular/common'
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
  
  showGoUpButton = false

  paramOk = false

  private pageNum = 1;

  private query = '';

  private hideScrollHeight = 200;

  private showScrollHeight = 500;

  constructor(
              @Inject(DOCUMENT) private document: Document,
              private charService: CharacterService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router )
  { 
    this.onUrlChanged() 
  }

  ngOnInit(): void {
    this.getCharactersByQuery();
  }

  @HostListener('window:scroll', [])
  onWindowScroll():void {
    const yOffSet = window.pageYOffset;
    if ((yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
    } else if (this.showGoUpButton && (yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }

  onScrollDown():void{
    if (this.info.next) {
      this.pageNum++;
      this.getDataService();
    }
  }

  onScrollTop():void{
    this.document.body.scrollTop = 0; // Safari
    this.document.documentElement.scrollTop = 0; // Other
  }

  private onUrlChanged(): void{
    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe(() => {
      this.characters = [];
      this.pageNum = 1;
      this.paramOk = false;
      this.getCharactersByQuery();
    })
    
  }

  private getCharactersByQuery(): void{
    this.route.queryParams.pipe().subscribe((params) => {
      this.query = params['q'];
      if (this.query) {
        this.paramOk = true;
      }
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

  onGoBack():void {
    this.location.back();
  }

}

