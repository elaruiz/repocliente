'use strict';

const jwt = require('jsonwebtoken');
const secret = require('../constants').TOKEN_SECRET;

export const createToken = (user) => {
  let scopes;
  // Check if the user object passed in
  // has admin set to true, and if so, set
  // scopes to admin
  if (user.admin) {
    scopes = 'admin';
  }
  // Sign the JWT
  return jwt.sign(
    { id: user.id, name: user.name, scope: scopes },
    secret,
    { algorithm: 'HS256', expiresIn: '4h' }
  );
};


export const decodeToken = (req, res) => {
    let payload = jwt.decode(req.query.token, secret);
    res(payload)
};

// module.exports = createToken;
