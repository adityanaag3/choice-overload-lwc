// Simple Express server setup to serve for local testing/dev API server
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const path = require('path');

const app = express();
app.use(helmet());
app.use(compression());

const SSE = require('express-sse');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3002;

const LEADERBOARD_URL = process.env.LEADERBOARD_URL;
const WORDSLIST = require('./questions.js');

let gameCodes = [];
let players = [];

let sse = new SSE();

const DIST_DIR = './dist';
app.use(express.static(DIST_DIR));
app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});

// eslint-disable-next-line no-shadow
const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

function randomString() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

app.get('/api/createsession', (req, res) => {
    let randomSessionId;
    do {
        gameCodes = [];
        players = [];
        randomSessionId = randomString();
        gameCodes.push(randomSessionId);
    } while (!gameCodes.includes(randomSessionId));
    res.json({ sessionId: randomSessionId });
});

app.get('/api/getquestions', (req, res) => {
    res.json(WORDSLIST);
});

app.get('/api/sendquestiontoclient', (req, res) => {
    const { gameObj } = req.query;
    sse.send({ type: 'game', value: JSON.parse(gameObj) });
    res.json({ success: true });
});

app.get('/api/revealanswers', (req, res) => {
    sse.send({ type: 'answerrevealed', value: true });
    res.json({ success: true });
});

app.get('/api/backtowaiting', (req, res) => {
    sse.send({ type: 'backtowaiting', value: true });
    res.json({ success: true });
});

app.get('/api/saveAnswer', (req, res) => {
    const { player_name, answers } = req.query;
    if (player_name) {
        let foundIndex = players.findIndex(
            (x) => x.player_name === player_name
        );
        players[foundIndex].answers = JSON.parse(answers);
        sse.send({ type: 'answerselected', value: players });
    }
    res.json({ success: true });
});

app.get('/api/savescore', (req, res) => {
    const { player_name, player_id, score } = req.query;
    if (player_name) {
        let foundIndex = players.findIndex(
            (x) => x.player_name === player_name
        );
        if(foundIndex > -1)
        players[foundIndex].score = score;
        sse.send({ type: 'scoreupdated', value: players });
    }
    if (LEADERBOARD_URL && player_id) {
        // Post Scores to external service
        fetch(LEADERBOARD_URL + '/insertscore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ player_id: player_id, score: score })
        })
            .then((response) => response.json())
            .then((data) => {
                res.json(data);
            })
            .catch((e) => {
                console.error(e);
            });
    } else {
        res.json({ success: true });
    }
});

app.get('/api/joinsession', (req, res) => {
    const { id, player_name } = req.query;

    if (gameCodes.includes(id) && !players.includes(player_name)) {
        players.push({ player_name, answers: [], score: 0 });

        sse.send({ type: 'newplayer', value: player_name });

        if (LEADERBOARD_URL) {
            // Post Scores to external service
            const scoreReq = {
                game_id: 'choiceoverload' + id,
                player_name: player_name
            };

            fetch(LEADERBOARD_URL + '/insertplayer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(scoreReq)
            })
                .then((response) => response.json())
                .then((data) => {
                    res.json({ success: true, player_id: data.id });
                })
                .catch((e) => {
                    console.error(e);
                    res.json({ success: false });
                });
        } else {
            res.json({ success: true });
        }
    } else {
        res.json({ success: false });
    }
});

app.get('/api/stream', sse.init);

// Keep SSE Connection Alive
const HEARTBEAT_INTERVAL = process.env.HEARTBEAT_INTERVAL || 30 * 1000; // 30 seconds
const heartBeat = () => sse.send(':ping');
setInterval(heartBeat, HEARTBEAT_INTERVAL);

app.listen(PORT, () =>
    console.log(
        `✅  API Server started: http://${HOST}:${PORT}/api/v1/endpoint`
    )
);
