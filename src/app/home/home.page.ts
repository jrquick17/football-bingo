import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {Square} from '../models/square.model';
import {Category} from '../models/category.model';
import {ListService} from '../services/list.service';
import {Board} from '../models/board.model';

@Component({
  selector:    'app-home',
  templateUrl: 'home.page.html',
  styleUrls: [
    'home.page.scss'
  ]
})
export class HomePage {
  public board:Board = new Board();

  public columnHeight = 50;

  public allCategories:Category[] = [
    {
      title: 'Football (Generic)',
      selected: true,
      squares: [
        { text: '10+ Yard Completion', weight: 1 },
        { text: '15+ Yard Completion', weight: 0.75 },
        { text: '20+ Yard Completion', weight: 0.5 },
        { text: '25+ Yard Completion', weight: 0.25 },
        { text: '10+ Yard Kickoff Return', weight: 0.25 },
        { text: '15+ Yard Kickoff Return', weight: 0.20 },
        { text: '20+ Yard Kickoff Return', weight: 0.15 },
        { text: '25+ Yard Kickoff Return', weight: 0.10 },
        { text: '10+ Yard Punt Return', weight: 0.25 },
        { text: '15+ Yard Punt Return', weight: 0.20 },
        { text: '20+ Yard Punt Return', weight: 0.15 },
        { text: '25+ Yard Punt Return', weight: 0.10 },
        { text: '10+ Yard Run', weight: 1 },
        { text: '15+ Yard Run', weight: 0.75 },
        { text: '20+ Yard Run', weight: 0.5 },
        { text: '25+ Yard Run', weight: 0.25 },
        { text: 'Attempted 2pt Conversion', weight: 0.10 },
        { text: 'Broken Up Touchdown', weight: 0.75 },
        { text: 'Challenge', weight: 0.75 },
        { text: 'Crying Fan', weight: 0.5 },
        { text: 'Delay of Game', weight: 1 },
        { text: 'Defensive Holding', weight: 1 },
        { text: 'Defensive Pass Interference', weight: 1 },
        { text: 'Defensive Touchdown', weight: 0.5 },
        { text: 'Excessive Celebration', weight: 1 },
        { text: 'Face Mask', weight: 0.25 },
        { text: 'Failed 2pt Conversion', weight: 0.05 },
        { text: 'False Start', weight: 1 },
        { text: 'Field Goal', weight: 1 },
        { text: 'Fourth and Short', weight: 0.5 },
        { text: 'Fourth Down Conversion', weight: 0.5 },
        { text: 'Fumble', weight: 0.25 },
        { text: 'Fumble (No Turnover)', weight: 0.10 },
        { text: 'Funny Fan Sign', weight: 0.15 },
        { text: 'Helmet Off', weight: 1 },
        { text: 'Illegal Block', weight: 1 },
        { text: 'Missed Field Goal', weight: 0.3 },
        { text: 'Missed PAT', weight: 0.03 },
        { text: 'Neutral Zone Infraction', weight: 0.2 },
        { text: 'Offensive Holding', weight: 1 },
        { text: 'Offensive Pass Interference', weight: 0.20 },
        { text: 'One Handed Catch', weight: 0.25 },
        { text: 'Pass for a Loss', weight: 1 },
        { text: 'PAT', weight: 0.10 },
        { text: 'Pick 6', weight: 0.20 },
        { text: 'Play Overturned', weight: 0.25 },
        { text: 'Play Stands', weight: 0.25 },
        { text: 'Punt Return Touchdown', weight: 0.05 },
        { text: 'QB Sneak', weight: 0.25 },
        { text: 'QB Rushing Touchdown', weight: 0.10 },
        { text: 'Roughing the Passer', weight: 1 },
        { text: 'Rush for a Loss', weight: 1 },
        { text: 'Sack', weight: 1 },
        { text: 'Safety', weight: 0.15 },
        { text: 'Special Teams Touchdown', weight: 0.10 },
        { text: 'Successful 2pt Conversion', weight: 0.05 },
        { text: 'Tackle by Hair', weight: 0.05 },
        { text: 'Tackle For a Loss', weight: 0.15 },
        { text: 'Third and Short', weight: 0.25 },
        { text: 'Trick Play', weight: 0.15 },
        { text: 'Too Many Players on Field', weight: 0.01 },
        { text: 'Touchdown', weight: 1 },
        { text: 'Touchdown Dance', weight: 1 },
        { text: 'Turnover', weight: 1 },
        { text: 'Unnecessary Roughness', weight: 1 }
      ]
    },
    {
      title: 'Los Angeles Rams',
      selected: false,
      squares: [
        { text: '"St. Louis"', weight: 1 },
      ]
    },
    {
      title: 'New England Patriots',
      selected: false,
      squares: [
        { text: '~"Brady one of the greatest"', weight: 1 },
        { text: '"Deflate Gate"', weight: 0.5 },
        { text: 'Gronk Touchdown', weight: 0.75 },
        { text: '"Gisele"', weight: 1 },
      ]
    },
    {
      title: 'Super Bowl',
      selected: false,
      squares: [
        { text: 'Broken Record', weight: 0.5 },
        { text: 'Celebrity Appearance', weight: 1 },
        { text: 'Doritos Commercial', weight: 1 },
        { text: 'Dumb Commercial', weight: 1 },
        { text: 'Genuinely Funny Commercial', weight: 0.5 },
        { text: 'New Movie Commercial', weight: 1 },
        { text: '"Tom Brady"', weight: 1 },
      ]
    },
    {
      title: 'Superbowl XLI',
      selected: false,
      squares: [
        { text: '~"Rams no call versus the Saints"', weight: 1 },
      ]
    },
  ];

  public categoryCount:number;

  public possibleSquares:Square[] = [];

  public selectedSquares:Square[] = [];

  public showCategories:boolean = false;

  public showInstructions:boolean = false;

  constructor(
    private list:ListService,
    private platform:Platform,
  ) {
    this.platform.ready().then(
      () => {
        const smallest = Math.min(
          platform.height(),
          platform.width()
        );

        this.columnHeight = smallest / 5;
      }
    );

    this.categoryCount = this.allCategories.length;

    this.generate();
  }

  private findSquare(row:number, col:number):Square {
    let squareCount = this.possibleSquares.length;

    if (squareCount !== 0) {
      if (row === 2 && col === 2) {
        return {
          text: 'FREE'
        };
      } else {
        if (squareCount === 0) {
          this.possibleSquares = JSON.parse(JSON.stringify(this.possibleSquares));

          squareCount = this.possibleSquares.length;
        }

        let remainingSquares = squareCount;

        for (let i = 0; i < squareCount; i++) {
          const randomI = this.getRandomElement(remainingSquares);

          const square = this.possibleSquares.splice(randomI, 1)[0];

          if (Math.random() <= square.weight) {
            return square;
          }

          remainingSquares--;
        }

        return this.possibleSquares[
          this.getRandomElement(this.selectedSquares.length)
        ];
      }
    }

    return new Square();
  }

  generate():void {
    this.board = new Board();

    this.loadPossibleSquares();
  }

  private getRandomElement(size:number):number {
    return Math.floor(Math.random() * size);
  }

  getSquare(row:number, col:number):string {
    let square:Square;
    if (typeof this.board.squares[row][col] === 'undefined') {
      square = this.findSquare(row, col);

      this.board.squares[row][col] = square;
    } else {
      square = this.board.squares[row][col];
    }

    return square.text;
  }

  private loadPossibleSquares():Square[] {
    this.possibleSquares = [];

    for (let c = 0; c < this.categoryCount; c++) {
      const category = this.allCategories[c];

      if (category.selected) {
        this.possibleSquares = this.list.merge(this.possibleSquares, category.squares);
      }
    }

    return this.possibleSquares;
  }

  select(selectedCategory:Category):void {
    selectedCategory.selected = !selectedCategory.selected;

    this.generate();
  }

  toggleCategories():void {
    this.showCategories = !this.showCategories;

    this.showInstructions = false;
  }

  toggleInstructions():void {
    this.showInstructions = !this.showInstructions;

    this.showCategories = false;
  }
}
