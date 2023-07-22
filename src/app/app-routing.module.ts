import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AllMangasComponent } from './components/all-mangas/all-mangas.component';
import { CurrentMangaComponent } from './components/current-manga/current-manga.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BookComponent } from './components/book/book.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main/allManga', redirectTo: 'allManga', pathMatch: 'full' },
  {
    path: 'currentManga/currentManga',
    redirectTo: 'currentManga',
    pathMatch: 'full',
  },
  {
    path: 'allManga/currentManga',
    redirectTo: 'currentManga',
    pathMatch: 'full',
  },
  {
    path: 'main/currentManga',
    redirectTo: 'currentManga',
    pathMatch: 'full',
  },
  {
    path: 'profile/currentManga',
    redirectTo: 'currentManga',
    pathMatch: 'full',
  },
  {
    path: 'profile/allManga',
    redirectTo: 'allManga',
    pathMatch: 'full',
  },
  {
    path: 'currentManga/book',
    redirectTo: 'book',
    pathMatch: 'full',
  },
  {
    path: 'book/currentManga',
    redirectTo: 'currentManga',
    pathMatch: 'full',
  },
  { path: 'currentManga/allManga', redirectTo: 'allManga', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'currentManga', component: CurrentMangaComponent },
  { path: 'allManga', component: AllMangasComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'book', component: BookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
