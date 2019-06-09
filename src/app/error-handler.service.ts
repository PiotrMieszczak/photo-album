import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NzModalService } from 'ng-zorro-antd';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {

  constructor(private _modalService: NzModalService) { }

  /**
   * Handles error
   *
   * @param  {Error|HttpErrorResponse} error
   * @returns void
   */
  handleError(error: Error | HttpErrorResponse): void {
    this.openErrorMessage(error.message);
  }

  /**
   * Opens error message modal
   *
   * @param  {string} message
   * @returns void
   */
  private openErrorMessage(message: string): void {
    this._modalService.error({
      nzTitle: 'Oops! Something went wrong',
      nzContent: message
    });
  }
}
