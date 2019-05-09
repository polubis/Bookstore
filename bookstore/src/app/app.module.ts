import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatInputModule,
  MatDialogModule, MatSnackBarModule } from '@angular/material';
import { MatStepperModule } from '@angular/material/stepper';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { BackdropLoaderComponent } from './components/backdrop-loader/backdrop-loader.component';
import { LoaderComponent } from './components/loader/loader.component';
import { RegisterComponent } from './containers/register/register.component';
import { SearcherComponent } from './components/searcher/searcher.component';
import { SliderComponent } from './components/slider/slider.component';
import { ErrorPlaceholderComponent } from './components/error-placeholder/error-placeholder.component';
import { CutTextPipe } from './helpers/cut-text-pipe';
import { StarsRateComponent } from './components/stars-rate/stars-rate.component';
import { HomeNavigationComponent } from './pages/home/home-navigation/home-navigation.component';
import { AdminComponent } from './pages/admin/admin.component';
import { SideNavComponent } from './pages/admin/side-nav/side-nav.component';
import { StatsComponent } from './pages/admin/pages/stats/stats.component';
import { BooksComponent } from './pages/admin/pages/books/books.component';
import { BooksKindsComponent } from './pages/admin/pages/books-kinds/books-kinds.component';
import { AuthorsComponent } from './pages/admin/pages/authors/authors.component';
import { OrdersComponent } from './pages/admin/pages/orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BackdropLoaderComponent,
    LoaderComponent,
    RegisterComponent,
    SearcherComponent,
    SliderComponent,
    ErrorPlaceholderComponent,
    CutTextPipe,
    StarsRateComponent,
    HomeNavigationComponent,
    AdminComponent,
    SideNavComponent,
    StatsComponent,
    BooksComponent,
    BooksKindsComponent,
    AuthorsComponent,
    OrdersComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatStepperModule,
    MatTooltipModule,
    MatTabsModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    AppRoutingModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  entryComponents: [RegisterComponent]
})
export class AppModule { }
