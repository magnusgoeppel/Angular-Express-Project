import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/users';
    private isLoggedIn: boolean = false;

    private currentTokenSubject: BehaviorSubject<string>;
    public currentToken: Observable<string>;
    constructor(private http: HttpClient)
    {
        this.currentTokenSubject = new BehaviorSubject<string>(localStorage.getItem('currentUserToken') || '');
        this.currentToken = this.currentTokenSubject.asObservable();
    }

    signUp(username: string, password: string): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(this.apiUrl, { username, password }, { headers });
    }

    private currentUsername: string | null = null;
    private currentAuthToken: string | null = null;

    generateAuthToken()
    {
        return Math.random().toString(36).substr(2);
    }

    setCurrentUser(username: string) {
        this.currentUsername = username;

        // Generieren und speichern Sie das Authentifizierungstoken
        const authToken = this.generateAuthToken();
        this.currentAuthToken = authToken;
        localStorage.setItem('authToken', authToken);
    }

    getCurrentUser(): string | null
    {
        return this.currentUsername;
    }

    setAuthToken(token: string)
    {
        this.currentAuthToken = token;
    }



    getAuthToken(): string | null {
        return this.currentAuthToken;
    }




    login(email: string, password: string): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(this.apiUrl + '/login', { email, password }, { headers }).pipe(
            tap(() => this.isLoggedIn = true)
        );
    }



    getHighscores() {
        return this.http.get<any[]>('http://localhost:3000/highscores');
    }

    getIsLoggedIn(): boolean
    {
        return this.isLoggedIn;
    }

    sendHighscore(username: string, score: number)
    {
        const url = 'http://localhost:3000/highscores';
        return this.http.post(url, { username, score });
    }

    logout(authToken: string, username: string | null): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
        return this.http.delete(`http://localhost:3000/sessions/${username}`, { headers }).pipe(
            tap(() => {
                this.setIsLoggedIn(false);
            })
        );
    }



    setIsLoggedIn(isLoggedIn: boolean)
    {
        this.isLoggedIn = isLoggedIn;
    }

    removeCurrentUser() {
        localStorage.removeItem('currentUser'); // oder wo auch immer Sie den aktuell angemeldeten Benutzer speichern
    }

    removeAuthToken() {
        localStorage.removeItem('authToken');  // oder wo auch immer Sie das Token speichern
    }
}
