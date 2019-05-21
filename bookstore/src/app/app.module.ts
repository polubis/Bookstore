import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatInputModule,
  MatDialogModule, MatSnackBarModule, MatAutocompleteModule, MatSelectModule, MatPaginatorModule, MatPaginatorIntl
} from '@angular/material';
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
import { OrdersComponent } from './pages/admin/pages/orders/orders.component';
import { OrderPopupComponent } from './containers/order-popup/order-popup.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LibraryComponent } from './pages/library/library.component';
import { MenuComponent } from './components/navigation/menu/menu.component';
import { UserOrdersPopupComponent } from './containers/user-orders-popup/user-orders-popup.component';
import { TableComponent } from './components/table/table.component';
import { ChangeUserDataPopupComponent } from './containers/change-user-data-popup/change-user-data-popup.component';
import { BooksTableComponent } from './pages/admin/pages/books/books-table/books-table.component';
import { SearcherCategorySwitcherComponent } from './components/searcher-category-switcher/searcher-category-switcher.component';
import { BookDetailsPopupComponent } from './containers/book-details-popup/book-details-popup.component';
import { BooksFormComponent } from './containers/books-form/books-form.component';
import { UserInterfaceService } from './services/UserInterfaceService';
import { KindOfBookFormComponent } from './containers/kind-of-book-form/kind-of-book-form.component';
import { PrinterFormComponent } from './containers/printer-form/printer-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageDirective } from './helpers/image-directive';
import { getDutchPaginatorIntl } from './dutch-paginator.intl';
import { BookKindsComponent } from './containers/book-kinds/book-kinds.component';

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
    OrdersComponent,
    OrderPopupComponent,
    NavigationComponent,
    LibraryComponent,
    MenuComponent,
    UserOrdersPopupComponent,
    TableComponent,
    ChangeUserDataPopupComponent,
    BooksTableComponent,
    SearcherCategorySwitcherComponent,
    BooksFormComponent,
    BookDetailsPopupComponent,
    KindOfBookFormComponent,
    PrinterFormComponent,
    ImageDirective,
    BookKindsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    MatStepperModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatIconModule,
    MatPaginatorModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    AppRoutingModule,
  ],
  providers: [CookieService, UserInterfaceService, { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() }],
  bootstrap: [AppComponent],
  entryComponents: [BookKindsComponent,
    KindOfBookFormComponent, PrinterFormComponent,
    BookDetailsPopupComponent, RegisterComponent, OrderPopupComponent,
    UserOrdersPopupComponent, ChangeUserDataPopupComponent, BooksFormComponent]
})
export class AppModule { }
