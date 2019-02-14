import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { BevCardsComponent } from './bev-cards/bev-cards.component';
import { CoffeeComponent } from './comments/coffee/coffee.component';
import { TeaComponent } from './comments/tea/tea.component';
import { MiscBevComponent } from './comments/misc-bev/misc-bev.component';
import { NavbarComponent } from './navbar/navbar.component';

import {AuthService} from "./services/auth.service"
import { BevCardService } from './services/bev-card.service';
import {CommentsService} from "./services/comments.service";
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    BevCardsComponent,
    CoffeeComponent,
    TeaComponent,
    MiscBevComponent,
    NavbarComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthService, BevCardService, CommentsService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
