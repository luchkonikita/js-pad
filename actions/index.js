const passport = require('passport')
const User = require('../models/user')

module.exports = {
  auth: passport.authenticate('github', {
    scope: ['user:email']
  }),
  authCallback: passport.authenticate('github', {
    failureRedirect: '/',
    successRedirect: '/',
    successFlash: 'Sucessfully logged in',
    failureFlash: 'Can not login'
  }),
  home: (req, res) => {
    res.render('pages/index', {
      flash: {
        success: req.flash('success').join(', '),
        error: req.flash('error').join(', ')
      }
    })
  }
}
