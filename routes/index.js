import { Router } from 'express'
const router = Router()

export {
  router
}

// The root route renders our only view
router.get('/', function(req, res) {
  res.redirect('/students')
})
