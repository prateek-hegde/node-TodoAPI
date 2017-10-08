// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('connection to mongo DB established');

  // db.collection('Todos').insertOne({
  //   text : "text test",
  //   completed : false
  // }, (err, res) =>{
  //   if(err){
  //     return console.log('Unable to insert Todo', err);
  //   }
  //   console.log(JSON.stringify(res.ops, undefined, 2));
  // });

  db.collection('Users').insertOne({
    name : 'Prateek',
    age : 21,
    location: 'Bangalore'
  },(err, res) => {
    if(err){
      return console.log('unable to insert', err);
    }
    console.log(res.ops[0]._id.getTimestamp());
  });

  db.close();
});
