import { Router } from 'express'
import * as indexCtrl from '../controllers/index.js'
export {
  router
}

const router = Router()

router.get('/', isLoggedIn, function(req, res) {
  res.redirect('/profiles')
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}