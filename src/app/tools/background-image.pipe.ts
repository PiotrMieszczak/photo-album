import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Pipe({
  name: 'backgroundImage'
})
export class BackgroundImagePipe implements PipeTransform {

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  /**
   * Returns string with background image url
   * 
   * @param  {string} value
   * @returns SafeStyle
   */
  transform(value: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle('url(' + value + ')');
  }

}
