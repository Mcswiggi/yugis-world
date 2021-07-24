import { Card } from '../models/card.js'
import axios from 'axios'

export{
    index,
    show,
    create,
    update,
    deleteCard as delete,
    search
}

function search(req, res) {
    console.log(req.body.search)
    axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${req.body.search}`)
    .then(response => {
      // Card.find({ ygoId: response.data.id })
      
        res.render('cards/new', {
        title: 'Search Results',
        results: response.data.results
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  }

function index (req, res) {
    Card.find({})
    .then((cards) => {
        res.render('cards/index',
        {title: 'cards index'}
        )
    })
    .catch((err) => {
        res.render(err)
    })
}
function show (req, res) {
    axios                               //getting dark magician as the query
    .get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${req.params.id}`)
    .then((response) => {
      Card.findOne({ ygoprodeckId: response.data.id })
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
    // Card.create(req.body)
    // .then((card) => {
    //     res.json(card)
    // })
    // .catch((err) => {
    //     res.json(err)
    // })
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