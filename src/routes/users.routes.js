const { Router } = require('express');
const passport = require('passport')

const { users, register, login, forgotPassword, recoverPassword } = require('../controller/users.ctrl');

const { auth, emailAuth } = require('../middleware/auth');

const { UserDTO } = require('../dto/user.dto');

const router = Router()

router.get('/api/users', users)

router.post('/api/register', register)
router.post('/api/login', login)

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/products');
  });

router.get('/api/sesions/current', auth, passport.authenticate("current"), (req, res) => {
  return res.json(new UserDTO(req.user))
})

router.post('/api/users', forgotPassword)
router.put('/api/users/:email', emailAuth, recoverPassword)

module.exports = router