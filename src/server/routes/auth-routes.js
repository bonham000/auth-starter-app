import express from 'express'
import _ from 'lodash'
import jwt from 'jsonwebtoken'
import config from '../config'
import assert from 'assert'
import dotenv from 'dotenv'

dotenv.config();
const url = process.env.MONGO_HOST;

import mongodb from 'mongodb'
const MongoClient = mongodb.MongoClient;

const app = module.exports = express.Router();

// connect to MongoDB here
let users = [{
  id: 1,
  username: 'gonto',
  password: 'gonto'
}];

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60 * 60 * 5 });
}

function getUserScheme(req) {
  
  var username;
  var type;
  var userSearch = {};

  // The POST contains a username and not an email
  if(req.body.username) {
    username = req.body.username;
    type = 'username';
    userSearch = { username: username };
  }
  // The POST contains an email and not an username
  else if(req.body.email) {
    username = req.body.email;
    type = 'email';
    userSearch = { email: username };
  }

  return {
    username: username,
    type: type,
    userSearch: userSearch
  }
}

function addNewUser(userProfile) {

  console.log('Submitting new user to the database:', userProfile);

  // Add data to database
  MongoClient.connect(url, (err, db) => {
    assert.equal(null, err)

    db.collection('users').insertOne(userProfile);

    db.close();
  });

};

// Sign up new user route
app.post('/register', function(req, res) {

  console.log('New registration received on server');
  
  var userScheme = getUserScheme(req);  

  if (!userScheme.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }

  if (_.find(users, userScheme.userSearch)) {
   return res.status(400).send("A user with that username already exists");
  }

  var profile = _.pick(req.body, userScheme.type, 'password', 'extra');
  profile.id = _.max(users, 'id').id + 1;

  users.push(profile);
  addNewUser(profile);

  res.status(201).send({
    username: userScheme.username,
    id_token: createToken(profile)
  });
});

// Handle user login
app.post('/sessions/create', function(req, res) {

  var userScheme = getUserScheme(req);

  // Verify the user submitted a username and password
  if (!userScheme.username || !req.body.password) {
    return res.status(400).send({ error: "You must send the username and the password" });
  }

  // Query users database for the submitted username
  var user = _.find(users, userScheme.userSearch);
  
  // If the username doesn't exist
  if (!user) { return res.status(401).send({ error: "The user doesn't exist" }) }

  // If the password doesn't make the stored username
  if (user.password !== req.body.password) {
    return res.status(401).send({
      error: "The username or password don't match"
    })
  }

  // Return valid authentication
  res.status(201).send({
    id_token: createToken(user),
    user: user.username
  });
});


// // Add data to database
// MongoClient.connect(url, (err, db) => {
//   assert.equal(null, err)

//   db.collection('polls').insertOne(req.body);

//   res.end();

//   db.close();
// });


// // Pull users from database
// MongoClient.connect(url, (err, db) => {
//   assert.equal(null, err);

//   db.collection('users').find().toArray( (error, response) => {
//     console.log(response)
//   });

//   db.close();
// });