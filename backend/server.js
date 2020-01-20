const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dateFormat = require('dateformat');
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);
const axios = require('axios');
const convert = require('xml-js');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH, HEAD');
  next();
});

const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Model = mongoose.model('newsgene', new Schema({
  date_creation: String,
  statut: String,
  sujet: String,
  redacteur_nom: String,
  redacteur_prenom: String,
  client_nom: String,
  sr_nom: String,
  sr_prenom: String,
  keywords: String,
}));

app.get('/', (req, res) => {
  Model.find((err,results) => {
    if(err) return res.json(err);
    return res.json(results);
  });
});

app.post('/update', (req, res) => {
  let { id, statut, sujet, redacteur_nom, redacteur_prenom, client_nom, sr_nom, sr_prenom } = req.body;
  //let message = `Une commande a été mise à jour. Veuillez recharger la page.`;
  var error = false;
  if (statut === undefined || statut === '') {
    error = true;
    console.log(statut);
    return res.send({error : 'error'});
  } else if (sujet === undefined || sujet === '') {
    error = true;
    console.log(error);
    return res.send('Le sujet est vide');  
  } else if (redacteur_nom === undefined || redacteur_nom === '') {
    error = true;
    console.log(error);
    return res.send('Le nom du rédacteur est vide');  
  } else if (redacteur_prenom === undefined || redacteur_prenom === '') {
    error = true;
    console.log(error);
    return res.send('Le prénom du rédacteur est vide');  
  } else if (client_nom === undefined || client_nom === '') {
    error = true;
    console.log(error);
    return res.send('Le nom du client est vide');  
  } else if (sr_nom === undefined || sr_nom === '') {
    error = true;
    console.log(error);
    return res.send('Le nom du secrétaire de rédaction est vide');  
  } else if (sr_prenom === undefined || sr_prenom === '') {
    error = true;
    console.log(error);
    return res.send('Le prénom du secrétaire de rédaction est vide'); 
  }
  console.log('continuer');
  if (id == null) {
    id = new mongoose.mongo.ObjectID();
    req.body.date_creation = dateFormat(Date.now(), "yyyy-mm-dd HH-MM-ss");
    //message = 'Une commande a été créée. Veuillez recharger la page.';
  }
  Model.findByIdAndUpdate(id, {...req.body}, { upsert: true }, (err, result) => {
    if (err) return res.json(err);
    //io.sockets.emit('changedMessage', message);
    return res.redirect('/');
  });
});

app.post('/delete', (req, res) => {
  let { id } = req.body;
  let message = `Une commande a été supprimé.`;
  Model.findByIdAndDelete(id, (err, result) => {
    if (err) return res.json(err);
    io.sockets.emit('changedMessage', message);
    return res.status(200).redirect('/');
  });
});

// app.get('/figaro', (req, res) => {
//   axios.get('https://www.lefigaro.fr/sitemap_news.xml')
//   .then((response) => {
//     const result = convert.xml2js(response.data, {compact: true, spaces: 4});
//     const information = result.urlset.url;
//     return res.send(information);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
// })


io.on('connection', socket => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
  socket.on('changes', (msg) => {
    socket.broadcast.emit('message', msg);
  });
});


const API_PORT = 3001;

server.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
