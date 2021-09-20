import{PipeTransform,Pipe} from '@angular/core';

// todo should be implemented in one single integrated pipe RelativeTime
// also, code needs to be shorted and optimized

@Pipe({
  name:'relativeTimeNum'
})
export class RelativeTimeNumPipe implements PipeTransform{

  transform(inputDate:string):string{
    let current = new Date().valueOf();
    let input = new Date(inputDate).valueOf();
    let msPerSecond = 1000;
    let msPerMinute = msPerSecond * 60;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;
    let elapsed = current - input;

    if (elapsed < msPerSecond) {
      return '';
    }

    if (elapsed < msPerMinute) {
      return Math.floor(elapsed / 1000).toString() ;
    }

    else if (elapsed < msPerHour) {
      return Math.floor(elapsed / msPerMinute).toString();
    }

    else if (elapsed < msPerDay) {
      return Math.floor(elapsed / msPerHour).toString();
    }

    else if (elapsed < msPerMonth) {
      return '' +  Math.floor(elapsed / msPerDay).toString();
    }

    else if (elapsed < msPerYear) {
      return '' + Math.floor(elapsed / msPerMonth).toString();
    }

    else {
      return '' + Math.floor(elapsed / msPerYear).toString();
    }
  }
}

@Pipe({
  name:'relativeTimeText'
})
export class RelativeTimeTextPipe implements PipeTransform{

  transform(inputDate:string):string{
    let current = new Date().valueOf();
    let input = new Date(inputDate).valueOf();
    let msPerSecond = 1000;
    let msPerMinute = msPerSecond * 60;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30; // actually not totally correct
    let msPerYear = msPerDay * 365;

    let elapsed = current - input;

    if (elapsed < msPerSecond) {
      return 'time.justnow';
    }

    if (elapsed < msPerMinute) {
      let seconds = Math.floor(elapsed / 1000);
      return seconds == 1 ? 'time.secondAgo': 'time.secondsAgo';
      }

    else if (elapsed < msPerHour) {
      let minutes = Math.floor(elapsed / msPerMinute);
      return minutes == 1? 'time.minuteAgo': 'time.minutesAgo';
    }

    else if (elapsed < msPerDay) {
      let hours = Math.floor(elapsed / msPerHour);
      return hours == 1? 'time.hourAgo': 'time.hoursAgo';
    }

    else if (elapsed < msPerMonth) {
      let days = Math.floor(elapsed / msPerDay);
      return days == 1? 'time.dayAgo': 'time.daysAgo';
    }

    else if (elapsed < msPerYear) {
      let months = Math.floor(elapsed / msPerMonth);
      return months == 1? 'time.monthAgo' : 'time.monthsAgo';
    }

    else {
      return 'time.years ago';
    }
  }
}
