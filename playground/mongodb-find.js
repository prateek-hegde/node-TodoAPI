// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('connection to mongo DB established');

  db.collection('Users').find({
    "name" : "Prateek"
  }).toArray().then((docs) => {
    //console.log('Todos:');
    console.log(JSON.stringify(docs, undefined, 2));
  },(err) => {
    console.log('unable to fetch', err);
  });

  // db.collection('Todos').find({
  //   _id : new ObjectID('59d8eb18cf4cba10082347ab')
  // }).toArray().then((docs) => {
  //   console.log('Todos:');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // },(err) => {
  //   console.log('unable to fetch', err);
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos: ${count}`);
  // },(err) => {
  //   console.log('unable to fetch', err);
  // });

  //db.close();
});
