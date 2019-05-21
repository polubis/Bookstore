import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { StatsComponent } from './pages/admin/pages/stats/stats.component';
import { OrdersComponent } from './pages/admin/pages/orders/orders.component';
import { AdmingGuard } from './helpers/admin-guard';
import { BooksComponent } from './pages/admin/pages/books/books.component';
import { LibraryComponent } from './pages/library/library.component';
import { LogInGuard } from './helpers/auth-guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { canActivate: [LogInGuard], path: 'login', component: LoginComponent },
  { path: 'library', component: LibraryComponent },
  {
    canActivate: [AdmingGuard], path: 'admin', component: AdminComponent, children: [
      { path: '', component: StatsComponent },
      { path: 'books', component: BooksComponent },
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
