import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'preparationTime',
})
export class PreparationTimePipe implements PipeTransform {
  transform(value: number | undefined): string {
    if (value === null || value === undefined) {
      return '';
    }
    if (value < 60) {
      return value + 'm';
    }

    return `${Math.floor(value / 60)}h ${value % 60}m`;
  }
}
