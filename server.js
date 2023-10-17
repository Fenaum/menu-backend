const express = require('express');
const mongoose = require('mongoose');
const Entree = require('./models/entreeModel')
const app = express();

mongoose.set('strictQuery', false)
mongoose.connect("mongodb://localhost:27017/Menu-Master")
.then(() => console.log('Database Connected')
)
.catch(err => console.error('Connection error', err));

app.use(express.json())

app.get('/menu/entree', async (req, res) => {
  try {
    const entreeItem = await Entree.find({})
      .then((entreeItemData) => res.status(200).json(entreeItemData))
  } catch (err) {
      console.log(err.message);
      res.status(500).send({ error: err.message });
  }
});

app.post('/menu/entree', async (req, res) => {
  try {
    const entreeItem = await Entree.create(req.body)
    res.status(200).json(entreeItem);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ error: err.message });
  }
})

app.listen(5000, () => {
  console.log("Listening on http://localhost:5000/");
});