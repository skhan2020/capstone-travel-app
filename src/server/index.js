
const path = require('path')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
let bodyParser = require('body-parser')

let projectData = {};

dotenv.config();

const app = express()

app.use(express.static('dist'))
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile('dist/index.html', { root: '.' })
})

app.get('/weatherDetailsURL', appGetWeatherURL);

function appGetWeatherURL(req, res) {
    const url = `https://api.darksky.net/forecast/${process.env.DS_API_ID}/`;
    res.send({ apiUrl: url});
}

app.get('/pictureURL', appGetPictureURL);

function appGetPictureURL(req, res) {
    const url = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_ID}`;
    res.send({ apiUrl: url});
}

app.post('/weather', appPost);

function appPost(req, res) {
    const data = req.body;
    projectData = data;
    res.send('projectData saved');
}

app.get('/all', appGet);

function appGet(req, res) {
  res.send(projectData);
}

let port = 8060;
// designates what port the app will listen to for incoming requests
app.listen(port, function () {
})


module.exports = {
    appGetWeatherURL,
    appGetPictureURL
  };

