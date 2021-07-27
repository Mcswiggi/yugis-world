import { Router } from 'express'
import * as messageCtrl from '../controllers/messages.js'

export{
    router
}

const router = Router()

router.get('/', isLoggedIn, messageCtrl.index)
router.post('/', isLoggedIn, messageCtrl.create)
router.get('/:id', isLoggedIn, messageCtrl.show)
router.post('/:id', isLoggedIn, messageCtrl.reply)
router.get('/:id/edit', isLoggedIn, messageCtrl.edit)
router.put('/:id', isLoggedIn, messageCtrl.update)
router.delete('/:id', isLoggedIn, messageCtrl.delete)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }