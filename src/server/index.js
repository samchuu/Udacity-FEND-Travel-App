const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();


const app = express()
// cors is used so that browser and server can talk to each other without any security interruptions
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(express.static('dist'))

//Setting up port for requests
const port=8081;
function listening () {
    console.log(`local host currently running on port: ${port}`)
}
app.listen(port, listening);

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})