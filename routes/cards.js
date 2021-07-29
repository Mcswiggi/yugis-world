import { Router } from 'express'
const router = Router()
import * as cardsCtrl from '../controllers/cards.js'

router.post('/', isLoggedIn, cardsCtrl.create)
router.get('/:id', isLoggedIn, cardsCtrl.show)
router.post('/:id/addToDeck', isLoggedIn, cardsCtrl.addToDeck)
router.post('/search', isLoggedIn, cardsCtrl.search)


export {
  router
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}