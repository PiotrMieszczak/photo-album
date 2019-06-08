import { Pipe, PipeTransform } from '@angular/core';
// import { FilePathPipe } from './file-path.pipe';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Pipe({
  name: 'backgroundImage'
})
export class BackgroundImagePipe implements PipeTransform {

  constructor(
    // private filePathPipe: FilePathPipe,
    private sanitizer: DomSanitizer
  ) { }

  transform(value: string, uploaded = true): SafeStyle {
    // const src = (uploaded ? this.filePathPipe.transform(value || 'alt.jpg') : value)
    //   .replace(/\(/g, '%28')
    //   .replace(/\)/g, '%29');

    return this.sanitizer.bypassSecurityTrustStyle('url(' + value + ')');
  }

}
