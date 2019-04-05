import {Injectable} from '@angular/core';

@Injectable()
export class ListService {
  constructor() {

  }

  merge(alpha:any[], beta:any[], removeDuplicates?:boolean):any[] {
    alpha = alpha.concat(beta);

    if (removeDuplicates) {
      alpha = this.removeDuplicates(alpha);
    }

    return alpha;
  }

  private removeDuplicates(array:any[]):any[] {
    const returnVar = array.concat([]);

    for (let i = 0; i < returnVar.length; ++i) {
      const iValue = returnVar[i];

      for (let j = i + 1; j < returnVar.length; ++j) {
        const jValue = returnVar[j];

        const isDuplicate = iValue === jValue;

        if (isDuplicate) {
          returnVar.splice(j--, 1);
        }
      }
    }

    return returnVar;
  }
}
