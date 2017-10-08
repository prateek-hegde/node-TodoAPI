const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo');
var{ Users} = require('./models/users');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text : req.body.text
  });

  todo.save().then((doc) =>{
    //console.log(JSON.stringify(doc, undefined, 2));
    res.send(doc);
  }, (e) => {
    //console.log('unable to save todo', e);
    res.status(400).send(e);
  });
});

app.listen(3000, () => {
  console.log('server is running on port 3000');
});
