// global
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { BookComponent } from './components/book/book.component';
import { ItemReviewComponent } from './components/current-manga/item-review/item-review.component';
import { SixTitlesComponent } from './components/main/six-titles/six-titles.component';
import { TitlesComponent } from './components/all-mangas/titles/titles.component';
import { PromoComponent } from './components/main/promo/promo.component';
import { FooterComponent } from './components/footer/footer.component';
import { AllMangasComponent } from './components/all-mangas/all-mangas.component';
import { CurrentMangaComponent } from './components/current-manga/current-manga.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    BookComponent,
    ItemReviewComponent,
    SixTitlesComponent,
    TitlesComponent,
    PromoComponent,
    FooterComponent,
    AllMangasComponent,
    CurrentMangaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
