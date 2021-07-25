import 'dotenv/config.js'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import createError from 'http-errors'
import session from 'express-session'
import logger from 'morgan'
import methodOverride from 'method-override'
import passport from 'passport'
import { passUserToView} from './middleware/middleware.js'

import { router as indexRouter } from './routes/index.js'
import { router as profilesRouter } from './routes/profiles.js'
import { router as authRouter } from './routes/auth.js'
import { router as messagesRouter} from './routes/messages.js'
import { router as cardsRouter } from './routes/cards.js'
import { router as decksRouter } from './routes/decks.js'

// connect to the MongoDB with mongoose
import('./config/database.js')
import('./config/passport.js')

// create the Express app
const app = express()

// view engine setup
app.set(
  'views',
  path.join(path.dirname(fileURLToPath(import.meta.url)), 'views')
)
app.set('view engine', 'ejs')

app.use(methodOverride('_method'))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: 'lax'
    }
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(
  express.static(
    path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')
  )
)

//custom middleware to make sure user is logged in vs not logged in
app.use(passUserToView)

// mount all routes with appropriate base paths
app.use('/', indexRouter)
app.use('/profiles', profilesRouter)
app.use('/auth', authRouter)
app.use('/messages', messagesRouter)
app.use('/cards', cardsRouter)
app.use('/decks', decksRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export { app }
