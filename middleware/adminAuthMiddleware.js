const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Admin = require('../models/Admin')

const adminProtect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.admin = await Admin.findById(decoded.id).select('-password')
      if (!req.user) {
        res.status(401)
        throw new Error('Not authirised')
      }

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized')
  }
})

module.exports = { adminProtect }
