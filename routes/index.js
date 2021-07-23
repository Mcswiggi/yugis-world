import { Router } from 'express'

export {
  router
}

const router = Router()

router.get('/', isLoggedIn, function(req, res) {
  res.redirect('/index')
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}