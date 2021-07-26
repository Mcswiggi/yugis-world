import { Card } from '../models/card.js'
import { Deck } from '../models/deck.js'
import axios from 'axios'

export{
   show,
    create,
    //update,
    //deleteCard as delete,
    search,
    addToDeck,
    removeFromDeck,
}

function addToDeck(req, res) {
  req.body.addedToDeck = req.profile.deck._id
  Card.findOne({ ygoId:req.params.id }) 
  .then(card => {
    if(card) {
      card.addedToDeck.push(req.profile.deck._id)
      card.save()
      .then(() => {
        res.redirect(`/cards/${req.params.id}`)
      })
    } else {
      //if it doesnt exsist in the database create it!
      Card.create(req.body)
      .then(() => {
        res.redirect(`/cards/${req.params.id}`)
    })
  }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function removeFromDeck(req, res) {
   Card.findOne({ ygoId: req.params.id})
   .then(card => {
     card.addedToDeck.remove({_id: req.profile.deck._id})
     card.save()
     .then(() => {
       res.redirect(`/cards/${req.params.id}`)
     })
   })
   .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function search(req, res) {
    console.log(req.body.search)
    //axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${req.body.search}`)
    axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${req.body.search}`)
    .then((response) => {    
    console.log(response.data)
         res.render('cards/new',{
           title: 'Search Results',
           results: response.data,
      })
    })
        //response.data comes from axios
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
      Card.findOne({ ygoId: response.data.id })
      // This is where we'll populate collectedBy
      //.populate('collectedBy')
      // This is where we'll deep-populate reviews
      //   .populate({
        //     path: 'reviews',
        //     populate: {
          //       path: 'author'
          //     }
          //    })
          
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
function update (req, res) {
    // Card.findByIdAndUpdate(req.params.id, req.body, {new:true})
    // .then((card) => {
    //     res.json(card)
    // })
    // .catch((err) => {
    //     res.json(err)
    // })
}
function deleteCard (req, res) {
    // Card.findByIdAndDelete(req.params.id)
    // .then((card) => {
    //     res.json(card)
    // })
}