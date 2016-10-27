import express from 'express'
import _ from 'lodash'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import config from '../config'
import assert from 'assert'
import dotenv from 'dotenv'
import Validator from 'validator'
import validateUser from '../shared/validateUser'

dotenv.config();
const url = process.env.MONGO_HOST;

import mongodb from 'mongodb'
const MongoClient = mongodb.MongoClient;

const app = module.exports = express.Router();

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60 * 60 * 5 });
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

  const user = req.body;
  console.log('New registration received on server:', user);

  const validation = validateUser(user)

  if (!validation.isValid) {
    console.log('Invalid Registration:', validation.errors);
    res.status(400).send('Registration was in valid:', validation.errors);
  }
  else if (validation.isValid) {

    const passwordDigest = bcrypt.hashSync(user.password, 10);

    const profile = {
      username: user.username,
      email: user.email,
      password: passwordDigest,
      userData: {}
    }

    console.log('Valid Registration')

    addNewUser(profile);

    res.status(201).send({
      username: user.username,
      id_token: createToken(user)
    });

  }

});

// Handle user login
app.post('/sessions/create', function(req, res) {

  const { username, password } = req.body;

  MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);

    const Users = db.collection('users');
    
    Users.findOne( { username: username }).then( (data) => {
      
      if (data === null) {
        console.log('User does not exist');
        res.status(401).send('User does not exist');
      }
      else if (bcrypt.compareSync(password, data.password)) { 
        res.status(201).send({
          id_token: createToken(data),
          user: data.username
        });
      }
      else {res.status(401).send('Invalid login attempt')}

    });

  })

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
