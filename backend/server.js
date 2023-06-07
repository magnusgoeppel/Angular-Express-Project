const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const HighScore = require('./models/highscore.js'); // Pfad zu Ihrem HighScore-Modell
const User = require('./models/userdata.js'); // Pfad zu Ihrem User-Modell


app.use(cors({origin: 'http://localhost:4200', methods: ['GET', 'POST', 'PUT', 'DELETE']}));

app.use(express.json());

// Verbindung zur Datenbank herstellen
mongoose.connect('mongodb://127.0.0.1:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connection zu MongoDB erfolgreich...'))
    .catch(err => console.error('Connection zu MongoDB fehlgeschlagen ...', err));

// Neuer Highscore-Eintrag
const highScore = new HighScore({ username: 'test', score: 123 });

// Speichern in der Datenbank
highScore.save()
    .then(doc =>
    {
        console.log('Dokument erfolgreich in Collection highscores gespeichert:', doc);
    })
    .catch(err => {

        console.error('Error beim Speichern des Highscores des Dokuments:', err);
    });

let testUser = new User(
    {
    email: 'test@example.com',
    password: 'password',
    company: 'FH Technikum Wien',
    address: 'Musterstraße 123',
    plz: '12345'
});

testUser.save()
    .then(doc => {
        console.log('Dokument erfolgreich in collection Users gespeichert:', doc);
    })
    .catch(err => {
        console.error('Error beim Speichern des Users des Dokuments:', err);
    });

User.find()
    .then(users =>
    {
        console.log(users);
    })
    .catch(err => {
        console.error('Fehler beim Abrufen des Users', err);
    });

// Die in-memory Datenbank
const usersDb = {};
// Die authentifizierungstokens speichern
const authTokens = {};

// Funktion zur Erzeugung eines zufälligen Authentifizierungstokens
function generateAuthToken()
{
    return Math.random().toString(36).substr(2);
}

app.get('/', (req, res) =>
{
    res.send('Willkommen auf dem Server!');
});

app.post('/users', (req, res) =>
{
    const { username, password } = req.body;

    if (usersDb[username])
    {
        // Der Benutzername ist bereits in der Datenbank vorhanden
        res.status(409).json({ message: 'Benutzername bereits vorhanden' });
    }
    else
    {
        // Speichern Sie den neuen Benutzernamen und das Passwort in der Datenbank
        usersDb[username] = password;

        // Generieren und speichern Sie das Authentifizierungstoken
        const authToken = generateAuthToken();
        authTokens[username] = authToken;

        res.status(201).json(
            {
            message: 'Benutzer erfolgreich erstellt',
            username, password, authToken
        });
    }
});

// Erstellen Sie ein Array, um die Highscores zu speichern.
let highscores = [];

app.post('/highscores', (req, res) =>
{
    const { username, score } = req.body;
    highscores.push({ username, score });
    res.status(201).json({ message: 'Punktzahl erfolgreich hinzugefügt', username, score });
});

app.get('/highscores', (req, res) => {
    // Antwort mit den Highscores senden

    res.status(200).json(highscores);
});

app.delete('/sessions/:username', (req, res) =>
{
    const username = req.params.username;
    console.log(username);

    if (username)
    {
        // Delete the auth token
        delete authTokens[username];

        res.status(200).json({ message: 'Logout erfolgreich' });
    }
    else
    {
        res.status(404).json({ message: 'Authentifizierungstoken nicht gefunden oder Benutzer nicht berechtigt' });
    }
});

const port = 3000;
app.listen(port, () =>
{
    console.log(`Server läuft auf http://localhost:${port}`);
});

