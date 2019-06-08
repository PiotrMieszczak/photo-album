import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { distinctUntilChanged, auditTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CoreReducer } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { AlbumsStoreActions } from 'src/app/store/actions/albums/albums.actions';

const VALIDATOR_MIN_LENGTH = 3;
const AUDIT_TIME = 300;

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit, OnDestroy {
  @Input() ctrlType: string;
  public searchForm: FormGroup;

  private _guard$: Subject<boolean> = new Subject<boolean>();

  constructor(private _fb: FormBuilder,
    private _store: Store<CoreReducer.State>) { 
    this.buildForm();
  }

  ngOnInit() {
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

  private startCtrlSub(): void {
    this.searchForm.get('searchCtrl').valueChanges
    .pipe(
      auditTime(AUDIT_TIME),
      distinctUntilChanged()
    )
    .subscribe(searchedPhrase => {
      console.log(this.ctrlType);
      this.ctrlType === 'album' ? this._store.dispatch(new AlbumsStoreActions.SearchAlbumAction({ searchedPhrase }))
        : console.log('innt typ');
    })
  }
}
