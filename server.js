const express = require('express');
const app = express();
const Message = require('./db/Message').Message;
const Users = require('./db/Users');
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

//create new user
app.post('/user', (req, res, next) => {
  const newUser = new Users ( req.body )
   newUser.save()
   .then(() => res.send("new user created!"));
})

//get all users
app.get('/user', (req, res, next) => {
  Users.find()
  .then((results) => res.send(results))
})

//get one users
app.get('/user/:id', (req, res, next) => {
  Users.find({ _id : req.params.id})
  .then((results) => res.send(results))
})

//update user
app.put('/user/:id', (req, res, next) => {
  Users.findByIdAndUpdate({ _id : req.params.id }, req.body)
    .then((results) => res.send('user updated'))
})
//delete user
app.delete('/user/:id', (req, res, next) => {
  Users.remove({ _id: req.params.id })
  //  .then( Users.save())
   .then(() => res.sendStatus(202))
})


//catch route if any of above routes fail
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