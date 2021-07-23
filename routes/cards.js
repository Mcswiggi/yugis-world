import { Router } from 'express'
const router = Router()
import * as cardsCtrl from '../controllers/cards.js'

router.get('/cards', cardsCtrl.index)
router.get('/cards/:id', cardsCtrl.show)
router.post('/cards', cardsCtrl.create)
router.put('/cards/:id', cardsCtrl.update)
router.delete('/cards/:id', cardsCtrl.delete)
router.post('/search', cardsCtrl.search)


export {
  router
}