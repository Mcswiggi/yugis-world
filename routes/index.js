import { Router } from 'express'

export {
  router
}

const router = Router()

router.get('/', isLoggedIn, function(req, res, next) {
  res.render('index', { title: 'Landing Page' })
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}