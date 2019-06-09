import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsListComponent } from './components/albums-list/albums-list.component';
import { PhotosListComponent } from './components/photos-list/photos-list.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: AlbumsListComponent },
  { path: 'photos/:albumId', component: PhotosListComponent },
  { path: 'users', component: UsersListComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
