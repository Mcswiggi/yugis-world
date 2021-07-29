import { Router } from 'express'
import * as deckCtrl from '../controllers/decks.js'

export{
    router
}

const router = Router()

router.get('/', isLoggedIn, deckCtrl.index)
router.get('/new', isLoggedIn, deckCtrl.new)
router.post('/', isLoggedIn, deckCtrl.create)
router.delete('/:id', isLoggedIn, deckCtrl.deleteCardFromDeck)
router.get('/:id', isLoggedIn, deckCtrl.show)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }