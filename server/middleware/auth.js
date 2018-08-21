const jwt = require('jsonwebtoken')

function auth(req, res, next) {
  let token = req.headers.token
  if (token) {
    jwt.verify(token, process.env.secretKey, function (err, decoded) {
      if (decoded) {
        next()
      } else {
        res.status(400).json({
          message: 'Invalid token'
        })
      }
    })
  } else {
    res.status(401).json({
      message: 'You have no access!',
    })
  }
}

module.exports = {auth}