import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { BevCardsComponent } from './bev-cards/bev-cards.component';
import { CommentsComponent } from './comments/comments.component';

const routes: Routes = [
  { path:'', redirectTo:'/auth', pathMatch:'full' },
  { path:'auth', component: AuthComponent },
  { path:'home', component: HomeComponent },
  { path:'bevs', component: BevCardsComponent },
  { path:'comments', component: CommentsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
