const express = require('express');
const mongoose = require('mongoose');
const Entree = require('./models/entreesModel')
const app = express();

mongoose.set('strictQuery', false)
mongoose.connect("mongodb://localhost:27017/Menu-Master")
.then(() => console.log('Database Connected')
)
.catch(err => console.error('Connection error', err));

app.use(express.json())

app.get('/menu/entree', async (req, res) => {
  try {
    const entreeItems = await Entree.find({})
    res.status(200).json(entreeItems)
  } catch (err) {
      console.log(err);
      res.status(500).send({ error: err.message });
  }
});

app.get('/menu/entree/:id', async (req, res) => {
  try {
    const { id } = req.params
    const entreeItems = await Entree.findById(id)
      return res.status(404).json({ message: `item does not exist` });
  } catch (err) {
      console.log(err)
      res.status(500).send({ error: err.message });
  }
});

app.put('/menu/entree/:id', async (req, res) => {
  try {
    const { id } = req.params
    const entreeItem = await Entree.findByIdAndUpdate(id, req.body);
    if (!entreeItem) {
      res.status(404).json({message: `item does not exist`})
    } else {
      return res.status(202).json({message: 'item has been updated', entreeItem})
    }
  } catch (err) {
      console.log(err);
      res.status(500).send({ error: err.message });
  }
});

app.delete('/menu/entree/:id', async (req, res) => {
  try {
    const { id } = req.params
    const entreeItem = await Entree.findByIdAndDelete(id);
    if (!entreeItem) {
      res.status(404).json({message: `item does not exist`})
    } else {
      res.status(200).json({message: `item has been removed`})
    }
  } catch (err) {
      console.log(err);
      res.status(500).send({ error: err.message });
  }
});

app.post('/menu/entree', async (req, res) => {
  try {
    const entreeItem = await Entree.create(req.body)
    res.status(200).json(entreeItem);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
})

app.listen(5000, () => {
  console.log("Listening on http://localhost:5000/");
});