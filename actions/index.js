const passport = require('passport')
const User = require('../models/user')

function addUser(req) {
  return {
    user: req.user
  }
}

function addFlash(req) {
  return {
    flash: {
      success: req.flash('success').join(', '),
      error: req.flash('error').join(', '),
      notice: req.flash('notice').join(', ')
    }
  }
}

module.exports = {
  auth: passport.authenticate('github', {
    scope: ['user:email']
  }),
  authCallback: passport.authenticate('github', {
    successRedirect: '/pad',
    failureRedirect: '/',
    successFlash: 'Sucessfully logged in',
    failureFlash: 'Can not login'
  }),
  checkLogin: (req, res, next) => {
    if (req.isAuthenticated()) { return next() }
    req.flash('error', 'You are not authorized do access this page')
    res.redirect('/');
  },
  logout: (req, res) => {
    req.logout()
    req.flash('notice', 'You have successfully logged out')
    res.redirect('/')
  },
  home: (req, res) => {
    if (req.user) {
      return res.redirect('/pad')
    }
    res.render('pages/index', Object.assign({}, addFlash(req)))
  },
  pad: (req, res) => {
    res.render('pages/pad', Object.assign({}, addFlash(req), addUser(req)))
  }
}
