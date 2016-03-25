import { Pipe, PipeTransform } from 'angular2/core';
import { Keg } from './keg.model';

@Pipe({
  name: "low",
  pure: false
})

export class LowPipe implements PipeTransform {
  transform(input: Keg[], args) {
    var desiredDoneState = args[0];
    if(desiredDoneState === "low") {
      return input.filter((keg) => {
        return keg.volume < 10;
      });
    } else {
      return input;
    }
  }
}
