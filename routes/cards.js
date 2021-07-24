import { Router } from 'express'
const router = Router()
import * as cardsCtrl from '../controllers/cards.js'

router.get('/', cardsCtrl.index)
router.get('/:id', cardsCtrl.show)
router.post('/', cardsCtrl.create)
router.put('/:id', cardsCtrl.update)
router.delete('/:id', cardsCtrl.delete)
router.post('/search', cardsCtrl.search)


export {
  router
}