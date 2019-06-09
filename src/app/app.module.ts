import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { UserDetailsComponent } from './components/shared/user-details/user-details.component';
import { PhotosListComponent } from './components/photos-list/photos-list.component';
import { GalleryModule, GALLERY_CONFIG } from '@ngx-gallery/core';
import { LightboxModule, LIGHTBOX_CONFIG } from '@ngx-gallery/lightbox';
import { GallerizeModule } from '@ngx-gallery/gallerize';
import { BackgroundImagePipe } from './tools/background-image.pipe';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { UsersListComponent } from './components/users-list/users-list.component';
import { SearchbarComponent } from './components/shared/searchbar/searchbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    AlbumsListComponent,
    PageHeaderComponent,
    UserDetailsComponent,
    PhotosListComponent,
    BackgroundImagePipe,
    UsersListComponent,
    SearchbarComponent,
    PageNotFoundComponent
  ],
  imports: [
    NgZorroAntdModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    LightboxModule,
    GalleryModule,
    GallerizeModule,
    LoadingBarHttpClientModule,
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
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    {
      provide: GALLERY_CONFIG,
      useValue: {
        thumbPosition: 'top',
        imageSize: 'contain',
        dots: false,
        loadingMode: 'indeterminate',
        gestures: true
      }
    },
    {
      provide: LIGHTBOX_CONFIG,
      useValue: {
        keyboardShortcuts: false,
      }
    },
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
