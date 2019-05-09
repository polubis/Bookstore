import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { StatsComponent } from './pages/admin/pages/stats/stats.component';
import { BooksComponent } from './pages/admin/pages/books/books.component';
import { BooksKindsComponent } from './pages/admin/pages/books-kinds/books-kinds.component';
import { AuthorsComponent } from './pages/admin/pages/authors/authors.component';
import { OrdersComponent } from './pages/admin/pages/orders/orders.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: '', component: StatsComponent },
      { path: 'books', component: BooksComponent },
      { path: 'books-kinds', component: BooksKindsComponent },
      { path: 'authors', component: AuthorsComponent },
      { path: 'orders', component: OrdersComponent }
    ],
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
