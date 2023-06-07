import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authService';
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit
{
  isLoggedIn: boolean = false;
  highscores!: any[];

  constructor(private authService: AuthService, private router: Router) { }

  // In Ihrem LandingPageComponent
  ngOnInit()
  {
    this.authService.getHighscores().subscribe(highscores =>
    {
      this.highscores = highscores;
    });
    this.isLoggedIn = this.authService.getIsLoggedIn();
  }

  sendHighscore() {
    const username = this.authService.getCurrentUser();
    const score = 100;
    if (username)
    {
      this.authService.sendHighscore(username, score).subscribe(response =>
      {
        console.log('Highscore erfolgreich gesendet.', response);
        // Aktualisieren Sie die Highscore-Liste nach dem Senden eines neuen Highscores
        this.authService.getHighscores().subscribe(highscores =>
        {
          this.highscores = highscores;
        });
      }, error =>
      {
        console.log('Fehler beim Senden des Highscores', error);
      });
    }
    else
    {
      console.log('Benutzer ist nicht angemeldet');
    }
  }

  logout()
  {
    const authToken = this.authService.getAuthToken();
    if (authToken)
    {
      const username = this.authService.getCurrentUser();
      this.authService.logout(authToken, username).subscribe(() =>
      {
        console.log('Erfolgreich ausgeloggt');
        alert('Erfolgreich ausgeloggt');
        this.authService.removeCurrentUser();
        this.authService.removeAuthToken();
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
      }, error => {
        console.log('Fehler beim Logout', error);
      });
    } else {
      console.log('Benutzer ist nicht angemeldet');
    }
  }

}
