# Angular-Express.js-Projekt

Dieses Projekt beinhaltet eine einfache Anwendung mit Benutzerregistrierung, Login, Anzeige von Highscores und der Möglichkeit, Highscores zu senden. Es besteht aus einem Angular-Frontend und einem Express-Backend, das eine MongoDB-Datenbank verwendet.

## Struktur
Das Projekt ist in zwei Hauptverzeichnisse unterteilt:

- frontend/: Enthält den Angular-basierten Frontend-Code.
- backend/: Enthält den Express- und Mongoose-basierten Backend-Code.


## Voraussetzungen

- Node.js
- Angular CLI
- MongoDB

## Installation
### Backend
Navigieren Sie in das backend/ Verzeichnis:

```bash
cd backend 
```
Installieren Sie die erforderlichen npm-Pakete:

```bash
npm install
```
Starten Sie den MongoDB-Dienst auf Ihrem System.

Starten Sie den Backend-Server:

```bash
npm start
```

### Frontend
Navigieren Sie in das frontend/ Verzeichnis:

```bash
cd ../frontend
```
Installieren Sie die erforderlichen npm-Pakete:

```bash
npm install
```
Starten Sie die Angular-Anwendung:

```bash
ng serve
```
Öffnen Sie einen Webbrowser und navigieren Sie zu http://localhost:4200, um die Anwendung zu verwenden.

## Funktionalitäten
- Benutzerregistrierung: Erlaubt es neuen Benutzern, sich mit E-Mail, Passwort und optionalen Zusatzinformationen zu registrieren.
- Login/Logout: Benutzer können sich einloggen und ausloggen. Beim Login werden Benutzerinformationen und Authentifizierungstokens verwaltet.
- Highscore-Anzeige und -Sendung: Authentifizierte Benutzer können ihre Highscores senden und eine Liste der Highscores aller Benutzer anzeigen.

## API-Endpunkte
Das Backend stellt verschiedene Endpunkte zur Verfügung, darunter:

- POST /users: Registriert einen neuen Benutzer.
- POST /highscores: Fügt einen neuen Highscore hinzu.
- GET /highscores: Listet alle Highscores auf.
- DELETE /sessions/:username: Meldet einen Benutzer ab und löscht das Authentifizierungstoken.
