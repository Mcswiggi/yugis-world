import { Card } from '../models/card.js'
import { Deck } from '../models/deck.js'
import { Profile } from '../models/profile.js' 
import axios from 'axios'

export{
    show,
    create,
    search,
    addToDeck,
}

function addToDeck(req, res) {
  console.log('new card', req.body)
  console.log('req.params.id', req.params.id)
  Card.findOne({ ygoId: req.params.id }) 
  .then(card => {
    if(card) {
      Deck.findById(req.body.addedToDeck)
      .then((deck) => {
        console.log(deck)
        deck.cards.push(card._id)
        deck.save()
      .then(() => {
        card.addedToDeck.push(deck._id)
        card.save()
        .then(() => {
          res.redirect(`/profiles`)
        })
      })
    })
    } else {
      //if it doesnt exsist in the database create it!
      Card.create(req.body)
      .then((card) => {
      Deck.findById(req.body.addedToDeck)
      .then((deck) => {
        console.log(deck)
        deck.cards.push(card._id)
        deck.save()
      .then(() => {
        card.addedToDeck.push(deck._id)
        card.save()
        .then(() => {
          res.redirect(`/profiles`)
        })
      })
      })
      })
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}


function search(req, res) {
  //axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${req.body.search}`)
  axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${req.body.search}`)
  .then((response) => {    
    Profile.findById(req.user.profile._id)
    .populate('decks')
    .then((profile) => {
  console.log(profile.decks)
       res.render('cards/new',{
         title: 'Search Results',
         results: response.data,
         profile
       })
    })
  })
      // response.data comes from axios
      // results comes from the api object 
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

  function show (req, res) {
    axios                               //getting dark magician as the query
    //.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${req.body.search}`)
    .get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${req.body.search}`)
    .then((response) => {
      console.log('response.data.id', response.data.id)
      Card.findOne({ ygoId: response.data.id })
      // This is where we'll populate collectedBy
      .populate('addedToDeck')
          .then((card)=> {
            res.render("cards/show", {
              title: "Card Details",
              apiResult: response.data,
              card
            })
          })
        })
        .catch(err => {
          console.log(err)
          res.redirect('/')
        })
      }
      
      
    function create (req, res) {
      Card.create(req.body)
      .then(() => {
        res.redirect('/decks/index')
      })
      .catch((err) => {
        res.render(err)
    })
}
