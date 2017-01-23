//======================
// REQUIREMENTS
//======================
//require express, mongoose, List schema, User schema, authHelpers
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var List = require("../models/list.js");
var User = require("../models/user.js");
var authHelpers = require("../helpers/auth.js");

//======================
// CREATE
//======================
//create a POST "/" route that saves the list item to the logged in user
router.post('/', function (req,res) {

  User.findById(req.session.currentUser._id).exec()
  .then(function(user) {
    user.list.push({
      name: req.body.name,
			complete: false
    });
		return user.save();
  }).then(function(user){
		console.log("It saved the user list!", user);
		res.redirect('/users/' + req.session.currentUser._id);
	}).catch(function(err){
		console.log('error: ', err);
	});

});



//======================
// EDIT
//======================
//create a GET "/:id/edit" route that renders the list's edit page
router.get('/:id/edit', function(req, res){
	User.findById(req.session.currentUser._id).exec()
	.then(function(user){
		var list = user.list.id(req.params.id);

		console.log("FOUND THE LIST!", list);
		res.render("lists/edit.hbs", {
			user: user,
			list: list
		});
	});
});

//======================
// UPDATE
//======================
//create a PUT "/:id" route that saves the changes from the list.
router.put('/:id', function(req, res){
  User.findById(req.session.currentUser._id).exec()
	.then(function(user){
		var list = user.list.id(req.params.id);

		list.name = req.body.name;
		// list.complete = !list.complete;
		return user.save();
  }).then(function(user){
		console.log("It updated the user list!", user);
		res.redirect('/users/' + req.session.currentUser._id);
	}).catch(function(err){
		console.log('error: ', err);
	});
});

router.put('/:id/done', function(req, res){
  User.findById(req.session.currentUser._id).exec()
	.then(function(user){
		var list = user.list.id(req.params.id);

		list.name = req.body.name;
		list.complete = !list.complete;
		return user.save();
  }).then(function(user){
		console.log("It updated the user list!", user);
		res.redirect('/users/' + req.session.currentUser._id);
	}).catch(function(err){
		console.log('error: ', err);
	});
});


//======================
// DELETE
//======================
router.delete('/:id', function (req,res) {
  User.findById(req.session.currentUser._id).exec()
  .then(function(user) {
    var list = user.list.id(req.params.id);
    // console.log(item.category);
    list.remove();
		return user.save();
	}).then(function(user){
		console.log("It saved the user list!", user);
		res.redirect('/users/' + req.session.currentUser._id);
	}).catch(function(err){
		console.log('error: ', err);
	});
});


//======================
// EXPORTS
//======================
module.exports = router;
