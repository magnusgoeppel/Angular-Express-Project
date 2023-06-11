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

User.find()
    .then(users =>
    {
        console.log(users);
    })
    .catch(err =>
    {
        console.error('Fehler beim Abrufen des Users', err);
    });

HighScore.find()
    .then(highscores =>
    {
        console.log(highscores);
    })
    .catch(err =>
    {
        console.log('Fehler beim Abrufen der Highscores', err);
    });


// Die authentifizierungstokens speichern
const authTokens = {};

app.get('/', (req, res) =>
{
    res.send('Willkommen auf dem Server!');
});

app.post('/users', (req, res) =>
{
    console.log(req.body);  // Fügen Sie diese Zeile hinzu

    const { username, password, company, address, plz } = req.body;

    const user = new User({ username, password, company, address, plz });

    user.save()
        .then(doc => {
            console.log('User-Dokument erfolgreich in MongoDB gespeichert:', doc);
            res.status(201).json({ message: 'User erfolgreich erstellt', doc });
        })
        .catch(err => {
            console.error('Fehler beim Speichern des User-Dokuments in MongoDB:', err);
            res.status(500).json({ message: 'Fehler beim Erstellen des Users', err });
        });
});


app.post('/highscores', (req, res) =>
{
    const { username, score } = req.body;

    const highScore = new HighScore({ username, score });

    highScore.save()
        .then(doc =>
        {
            console.log('Highscore-Dokument erfolgreich in MongoDB gespeichert:', doc);
            res.status(201).json({ message: 'Highscore erfolgreich hinzugefügt', doc });
        })
        .catch(err =>
        {
            console.error('Fehler beim Speichern des Highscore-Dokuments in MongoDB:', err);
            res.status(500).json({ message: 'Fehler beim Speichern des Highscores', err });
        });
});

app.get('/highscores', (req, res) => {
    HighScore.find().sort({ score: -1 }) // sortiert die Highscores in absteigender Reihenfolge
        .then(highscores => {
            res.status(200).json(highscores);
        })
        .catch(err => {
            console.error('Fehler beim Abrufen der Highscores', err);
            res.status(500).json({ message: 'Fehler beim Abrufen der Highscores', err });
        });
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

