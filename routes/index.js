import { Router } from 'express'

export {
  router
}

const router = Router()

router.get('/', function(req, res, next) {
  res.render('index', { title: "Yugi's World" })
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}