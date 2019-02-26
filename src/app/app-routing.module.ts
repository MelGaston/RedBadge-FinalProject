import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuard} from "./guard/auth.guard"
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { BevCardsComponent } from './bev-cards/bev-cards.component';
import { CommentsComponent } from './comments/comments.component';

const routes: Routes = [
  { path:'', redirectTo:'/auth', pathMatch:'full' },
  { path:'auth', component: AuthComponent },
  { path:'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path:'bevs', component: BevCardsComponent, canActivate: [AuthGuard] },
  { path:'community', component: CommentsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
