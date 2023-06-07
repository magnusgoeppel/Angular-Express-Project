import { SignUpComponent } from './signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LoginComponent} from "./login/login.component";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/authService';
import { HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './landing-page/landing-page.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'landing-page', component: LandingPageComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: LoginComponent, pathMatch: 'full' }
];

@NgModule({
  declarations:
  [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    LandingPageComponent
  ],
  imports:
  [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
