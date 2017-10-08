// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('connection to mongo DB established');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('59da31ed2e48e227197e6849')
  // },{
  //   $set: {
  //     completed: true
  //   }
  // },{
  //   returnOriginal: false
  // }).then((result) =>{
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
  _id: new ObjectID('59d8ee79ea7dc71df0c16e53')
  },{
    $set: {
      name : 'Prateek'
    },
    $inc: {
      age : 1
    }
  },{
    returnOriginal: false
  }).then((result) =>{
    console.log(result);
  });

  //db.close();
});
