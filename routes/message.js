import { Router } from 'express'
import * as messageCtrl from '../controllers/messages.js'

export{
    router
}

router.get('/', isLoggedIn, messageCtrl.index)
router.get('/:id', isLoggedIn, messageCtrl.show)
router.put('/:id', isLoggedIn, messageCtrl.update)
router.post('/:id', isLoggedIn, messageCtrl.create)
router.post('/:id', isLoggedIn, messageCtrl.reply)
router.delete('/', isLoggedIn, messageCtrl.delete)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }