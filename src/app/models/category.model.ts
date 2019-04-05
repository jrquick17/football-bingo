import {Square} from './square.model';

export class Category {
  constructor() {

  }

  public squares:Square[] = [];
  public selected:boolean = false;
  public title:string;
}
