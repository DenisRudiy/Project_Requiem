import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AllMangasComponent } from './components/all-mangas/all-mangas.component';
import { CurrentMangaComponent } from './components/current-manga/current-manga.component';
import { UserPageComponent } from './components/user-page/user-page.component';

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
  { path: 'main', component: MainComponent },
  { path: 'currentManga', component: CurrentMangaComponent },
  { path: 'allManga', component: AllMangasComponent },
  { path: 'achievement', component: AllMangasComponent },
  { path: 'userPage', component: UserPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
