import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AlbumsListComponent } from './components/albums-list/albums-list.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { AppSettings } from './app.settings';
import { StoreModule } from '@ngrx/store';
import { CoreReducer } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { STORE_EFFECTS } from './store/effects';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UserDetailsComponent } from './components/albums-list/user-details/user-details.component';
import { PhotosListComponent } from './components/photos-list/photos-list.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    AlbumsListComponent,
    PageHeaderComponent,
    UserDetailsComponent,
    PhotosListComponent
  ],
  imports: [
    NgZorroAntdModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InfiniteScrollModule,
    StoreModule.forRoot(
      CoreReducer.reducers
    ),
    EffectsModule.forRoot(STORE_EFFECTS),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
  ],
  entryComponents: [
    UserDetailsComponent
  ],
  providers: [
    AppSettings,
    { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
