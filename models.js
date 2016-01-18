var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

/**
 * Our User model.
 *
 * This is how we create, edit, delete, and retrieve user accounts via MongoDB.
 */
module.exports.User = mongoose.model('User', new Schema({
  id:           ObjectId,
  username:		{ type: String, required: '{PATH} is required.' },
  firstName:    { type: String, required: '{PATH} is required.' },
  lastName:     { type: String, required: '{PATH} is required.' },
  email:        { type: String, required: '{PATH} is required.', unique: true },
  password:     { type: String, required: '{PATH} is required.' },
  data:         Object,
}));


module.exports.Post = mongoose.model('Post', new Schema({
  id:           ObjectId,
  title:    { type: String, required: '{PATH} is required.' },
  name:     { type: String, required: '{PATH} is required.', unique: true },
  author:   { type: String, required: '{PATH} is required.' },
  text:     { type: String, required: '{PATH} is required.' },
}));

module.exports.Publication = mongoose.model('Publication', new Schema({
  id:           ObjectId,
  name:    { type: String, required: '{PATH} is required.', unique: true },
  title:     { type: String, required: '{PATH} is required.' },
  author:        { type: String, required: '{PATH} is required.' },
  team:     { type: String, required: '{PATH} is required.' },
  url:     { type: String, required: '{PATH} is required.' },
  text:     { type: String, required: '{PATH} is required.' },
}));

module.exports.Project = mongoose.model('Project', new Schema({
  id:           ObjectId,
  name:    { type: String, required: '{PATH} is required.', unique: true },
  title:     { type: String, required: '{PATH} is required.' },
  author:  { type: String, required: '{PATH} is required.' },
  team:     { type: String, required: '{PATH} is required.' },
  text:     { type: String, required: '{PATH} is required.' },
}));

module.exports.Team = mongoose.model('Team', new Schema({
  id:           ObjectId,
  name:    { type: String, required: '{PATH} is required.', unique: true },
  firstName:    { type: String, required: '{PATH} is required.' },
  lastName:     { type: String, required: '{PATH} is required.' },
  email:        { type: String, required: '{PATH} is required.', unique: true },
  bio:     { type: String, required: '{PATH} is required.' },
  urls:    { type: Object, required: '{PATH} is required.' },
}));

// MEDIA MODEL GOES HERE 