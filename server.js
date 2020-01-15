const express = require('express');
const app = express();
const Message = require('./db/Message').Message;
const db = require('./db/Message');
const bodyparser = require('body-parser');
app.use(bodyparser.json());


//create
app.post('/messages', (req,res, next) => {
  db.createMessage(req.body)
    .then(() => res.sendStatus(201));
})
//get all
app.get('/messages', (req,res,next) => {
  Message.find()
  .then((results) => res.send(results))
})
//get one
app.get('/messages/:number', (req, res, next) => {
  db.findMessage(req.params.number)
    .then((results) => res.send(results))
})

//update by id
app.put('/messages/:id', (req, res, next) => {
  Message.findByIdAndUpdate({ _id: req.params.id}, req.body)
    .then(() => res.sendStatus(202))
})

//delete
app.delete('/messages/:number', (req,res,next) => {
  Message.remove({ _id : req.params.number})
    .then((results) => results)
    .then(() => res.sendStatus(202))
})

app.use((req,res,next) => {
  res.status(404).send('That route does not exist');
});

const port = 3000;

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;



//update by name && message (picks the first message to update, doesnt find correct message)

// app.put('/messages/:name/:message/', (req, res, next) => {
//   var query = { name : req.params.name,
//                 message: req.params.message }
//   Message.findOneAndUpdate(query)
//     .then(() => res.sendStatus(202))
// })