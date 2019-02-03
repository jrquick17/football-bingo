import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {Square} from '../square.model';

@Component({
  selector:    'app-home',
  templateUrl: 'home.page.html',
  styleUrls: [
    'home.page.scss'
  ]
})
export class HomePage {
  public columnHeight = 50;

  public allSquares:Square[] = [
    // Football
    { text: '10+ Yard Completion', weight: 1 },
    { text: '15+ Yard Completion', weight: 0.75 },
    { text: '20+ Yard Completion', weight: 0.5 },
    { text: '25+ Yard Completion', weight: 0.25 },
    { text: '10+ Yard Run', weight: 1 },
    { text: '15+ Yard Run', weight: 0.75 },
    { text: '20+ Yard Run', weight: 0.5 },
    { text: '25+ Yard Run', weight: 0.25 },
    { text: 'Attempted 2pt Conversion', weight: 0.10 },
    { text: 'Delay of Game', weight: 1 },
    { text: 'Defensive Holding', weight: 1 },
    { text: 'Defensive Pass Interference', weight: 1 },
    { text: 'Excessive Celebration', weight: 1 },
    { text: 'Face Mask', weight: 0.25 },
    { text: 'Failed 2pt Conversion', weight: 0.05 },
    { text: 'False Start', weight: 1 },
    { text: 'Field Goal', weight: 1 },
    { text: 'Fourth Down Conversion', weight: 0.5 },
    { text: 'Helmet Off', weight: 1 },
    { text: 'Illegal Block', weight: 1 },
    { text: 'Missed Field Goal', weight: 0.3 },
    { text: 'Missed PAT', weight: 0.03 },
    { text: 'Neutral Zone Infraction', weight: 0.2 },
    { text: 'Offensive Holding', weight: 1 },
    { text: 'Offensive Pass Interference', weight: 0.20 },
    { text: 'Pass for a Loss', weight: 1 },
    { text: 'PAT', weight: 0.10 },
    { text: 'Pick 6', weight: 0.20 },
    { text: 'Play Overturned', weight: 0.25 },
    { text: 'Play Stands', weight: 0.25 },
    { text: 'QB Sneak', weight: 0.25 },
    { text: 'QB Rushing Touchdown', weight: 0.10 },
    { text: 'Roughing the Passer', weight: 1 },
    { text: 'Rush for a Loss', weight: 1 },
    { text: 'Sack', weight: 1 },
    { text: 'Safety', weight: 0.15 },
    { text: 'Successful 2pt Conversion', weight: 0.05 },
    { text: 'Tackle For a Loss', weight: 0.15 },
    { text: 'Too Many Players on Field', weight: 0.01 },
    { text: 'Touchdown', weight: 1 },
    { text: 'Unnecessary Roughness', weight: 1 },

    // Patriots
    { text: '"Deflate Gate"', weight: 0.5 },
    { text: 'Gronk Touchdown', weight: 0.75 },

    // Rams
    { text: '"St. Louis"', weight: 1 },

    // Superbowl
    { text: '"Tom Brady"', weight: 1 },

    // Superbowl XLI
    { text: '~"Rams no call versus the Saints"', weight: 1 },
  ];

  public squares:Square[] = [];

  constructor(
    private platform:Platform
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
  }

  getRandomElement(size) {
    return Math.floor(Math.random() * size);
  }

  getSquare(row, col) {
    if (row === 2 && col === 2) {
      return 'FREE';
    } else {
      let squareCount = this.squares.length;
      if (squareCount === 0) {
        this.squares = JSON.parse(JSON.stringify(this.allSquares));

        squareCount = this.squares.length;
      }

      let remainingSquares = squareCount;

      for (let i = 0; i < squareCount; i++) {
        const randomI = this.getRandomElement(remainingSquares);

        const square = this.squares.splice(randomI, 1)[0];

        if (Math.random() <= square.weight) {
          return square.text;
        }

        remainingSquares--;
      }

      return this.squares[
        this.getRandomElement(this.squares.length)
      ].text;
    }
  }
}
