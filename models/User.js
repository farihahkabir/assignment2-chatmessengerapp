var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    type: String,
    required: "Name required"
  },
  displayName: {
    type: String
  },
  sessionName: {
    type: String
  }
});

//compile a model from schema to call query fields on it
var User = mongoose.model('User', userSchema);

module.exports = User;