var  mongoose = require('mongoose');
var Users = mongoose.model('Users',{
  email: {
    required : true,
    minLength : 3,
    type : String,
    trim : true
  }
});

module.exports = {
  Users
}
