import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { BevCardsComponent } from './bev-cards/bev-cards.component';
import { CoffeeComponent } from './comments/coffee/coffee.component';
import { TeaComponent } from './comments/tea/tea.component';
import { MiscBevComponent } from './comments/misc-bev/misc-bev.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CommentsComponent } from './comments/comments.component';
import { MaterialModule } from './material-module';

import { AuthService } from "./services/auth.service"
import { BevCardService } from './services/bev-card.service';
import { CommentsService } from "./services/comments.service";
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
    CommentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  entryComponents: [],
  providers: [AuthService, BevCardService, CommentsService, HttpClient, AuthComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
