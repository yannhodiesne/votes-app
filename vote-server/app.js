const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT | 3000;

const votes = {
    yes: [],
    no: [],
};

app.use(cors());

app.use((req, res, next) => {
    req.userAgent = req.get('User-Agent');
    next();
});

app.get('/', (req, res) => {
    res.send({
        yes: votes.yes.length,
        no: votes.no.length
    });
});

app.post('/yes', (req, res) => {
    const yesIndex = votes.yes.indexOf(req.userAgent);
    const noIndex = votes.no.indexOf(req.userAgent);

    if (yesIndex !== -1) {
        votes.yes.splice(yesIndex, 1);
        res.send('Vote removed');
        return;
    }
    
    if (noIndex !== -1) {
        votes.no.splice(noIndex, 1);
    }

    votes.yes.push(req.userAgent);
    res.send('Vote added');
});

app.post('/no', (req, res) => {
    const yesIndex = votes.yes.indexOf(req.userAgent);
    const noIndex = votes.no.indexOf(req.userAgent);

    if (noIndex !== -1) {
        votes.no.splice(noIndex, 1);
        res.send('Vote removed');
        return;
    }
    
    if (yesIndex !== -1) {
        votes.yes.splice(yesIndex, 1);
    }

    votes.no.push(req.userAgent);
    res.send('Vote added');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
