const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;
  
    Users.add(user)
      .then(saved => {
        const token = generateToken(saved);
        res.status(201).json({saved,
        user: saved,
      token
        });
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  router.post('/login', (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({
            message: `Welcome ${user.username}!`,
          });
        } else {
          res.status(401).json({ message: 'Please try again' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  function generateToken() {
    // header, payload & verify signature /
    // palload-> username, id, roles, expiration date /
    const payload = {
      sub: user.id, 
      username: user.username,
    };
  
    const options = {
      expiresIn: '1d'
    };
    // verify signature-> a secret(hash) /
    return jwt.sign(payload, process.env.JWT_SECRET, options);
  }
  
  
  
  module.exports = router;
  