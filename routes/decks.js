import { Router } from 'express'
import * as deckCtrl from '../controllers/decks.js'

export{
    router
}

const router = Router()

router.get('/', isLoggedIn, deckCtrl.index)
router.get('/new', isLoggedIn, deckCtrl.new)
router.get('/:id', isLoggedIn, deckCtrl.show)
router.put('/:id', isLoggedIn, deckCtrl.update)
router.get('/:id/edit', isLoggedIn, deckCtrl.edit)
router.post('/', isLoggedIn, deckCtrl.create)
router.delete('/', isLoggedIn, deckCtrl.delete)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }