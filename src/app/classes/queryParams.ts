export class QueryParams {
  private _limit: number;
  private _start: number;
  private _sort: string;
  private _order: string;
  private _page: number;

  constructor() { }

  /**
   * Condition for data request
   *
   * @param {string} column
   * @param {any} parameters
   */
  public where(column: string, parameters: any): void {
    this[column] = parameters;
  }

  /**
   * Definition of data limit
   * 
   * @param  {number} limit
   * @returns void
   */
  public setLimit(limit: number): void {
    this._limit = limit;
  }

  /**
   * Definition of data offset
   * 
   * @param  {number} offset
   * @returns void
   */
  public setOffset(offset: number): void {
    this._start = offset;
  }

  /**
   * Definition of data order
   *
   * @param {string} column
   * @param direction
   */
  public sortBy(column: string, direction: string): void {
    this._sort = column;
    this._order = direction;
  }

  /**
   * Definition of page count
   * 
   * @param  {number} page
   * @returns void
   */
  public setPage(page: number): void {
    this._page = page;
  }
}
