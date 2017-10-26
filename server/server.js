const _ = require('lodash');
const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo');
var {User} = require('./models/users');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//post Todos and save
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text : req.body.text
  });

  todo.save().then((doc) =>{
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});
//show all todos from the DB
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});
// display a todo by its ID
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
//check for the valid ID
  if (!ObjectID.isValid(id)) {
    return res.status(400).send('Invalid id');
  }
// find the document by Id
  Todo.findById(id).then((todos) => {
    if(!todos){
      return res.status(404).send('id not found');
    }
    res.send({todos});
  }).catch((e) => {
    res.status(400).send();
  });
});
//delete document
app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
//check for valid ID
  if (!ObjectID.isValid(id)) {
    return res.status(400).send('Invalid id');
  }
//remove document by ID
  Todo.findByIdAndRemove(id).then((todos) => {
    if(!todos){
      return res.status(404).send('id not found');
    }
      res.send({todos});
    }).catch((e) => {
      res.status(400).send();
    });
});


//update todos
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

//check for completed
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
//find by ID and update
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

//register a user to the databse
app.post('/user', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.get('/user/me', (req, res) => {
  var token = req.header('x-auth');
  User.findByToken(token);
});

//setup sever
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
