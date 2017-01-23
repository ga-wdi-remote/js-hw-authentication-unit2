var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var ListSchema = new Schema({
	name: String,
  complete: Boolean
});

var UserSchema = new Schema({
  username: String,
  email: String,
  password_digest: String,
  list: [ListSchema],
  created_at: Date,
  updated_at: Date
});

ListSchema.pre('save', function(next) {
  now = new Date();
  this.updated_at = now;

  if (!this.created_at) { this.created_at = now }
  next();
});

UserSchema.pre('save', function(next) {
  now = new Date();
  this.updated_at = now;

  if (!this.created_at) { this.created_at = now }
  next();
});

var UserModel = mongoose.model('User', UserSchema);
//var ListModel model
var ListModel = mongoose.model('List', ListSchema);

module.exports = {
  User: UserModel,
  List: ListModel
};
