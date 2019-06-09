import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { distinctUntilChanged, auditTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CoreReducer } from '../../../store/reducers';
import { Store } from '@ngrx/store';
import { UsersStoreActions, AlbumsStoreActions } from '../../../store/actions';

const VALIDATOR_MIN_LENGTH = 3;
const AUDIT_TIME = 300;

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit, OnDestroy {
  @Input() ctrlType: string;
  @Input() placeholder: string;
  public searchForm: FormGroup;

  private _guard$: Subject<boolean> = new Subject<boolean>();

  constructor(private _fb: FormBuilder,
    private _store: Store<CoreReducer.State>) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.startCtrlSub();
  }

  ngOnDestroy(): void {
    this._guard$.next(true);
  }

  /**
   * Builds form
   *
   * @returns void
   */
  private buildForm(): void {
    this.searchForm = this._fb.group({
      searchCtrl: [null, Validators.minLength(VALIDATOR_MIN_LENGTH)]
    });
  }

  /**
   * Starts subscription for form control changes
   *
   * @returns void
   */
  private startCtrlSub(): void {
    this.searchForm.get('searchCtrl').valueChanges
    .pipe(
      auditTime(AUDIT_TIME),
      distinctUntilChanged()
    ).subscribe(searchedPhrase => this.dispatchedActionBasedOnSearchType(searchedPhrase));
  }

  /**
   * Dispatches search action based on searchbar type
   *
   * @param  {string} searchedPhrase
   * @returns void
   */
  private dispatchedActionBasedOnSearchType(searchedPhrase: string): void {
    switch (this.ctrlType) {
      case 'album':
        this._store.dispatch(new AlbumsStoreActions.SearchAlbumAction({ searchedPhrase }));
        break;
      case 'user':
        this._store.dispatch(new UsersStoreActions.SearchUsersAction({ searchedPhrase }));
        break;
      default:
        break;
    }
  }
}
