import { Deck } from '../models/deck.js'
import { Card } from '../models/card.js'
import { Profile } from "../models/profile.js"


export{
    index,
    create,
    show,
    update,
    deleteDeck as delete,
    newDeck as new,
    edit,

}

function edit (req, res) {

}

function newDeck (req, res) {
    res.render('decks/new', {
        title: 'Create a Deck'
    })
}

function index (req, res){
    Deck.find({})
    .populate({ 
        path: 'owner',
        populate: {
            path: 'owner'
        }
    })
    .then((decks) => {
        res.render('decks/index', {
            title: 'All Decks',
            decks
        })
    })
    .catch((err) => {
        res.render(err)
    })
}

function create (req, res){
    //deck owner is the profile logged in
    req.body.owner=req.user.profile._id
    Deck.create(req.body)
    .then((deck) => {
    Profile.findById(req.body.owner)
    .then((profile) => {
       profile.decks.push(deck._id)
       profile.save()
       .then(()=>{
           res.redirect('/profiles')
            })
        })
    })
    .catch((err) => {
        res.render(err)
    })
}

function show (req, res){
    console.log(req.params.id) // we have the deck that we clicked on
     Deck.findById(req.params.id)
     .populate('cards')
    .then((deck) => {
    res.render('decks/show', {
        title: 'Deck Show Page',
        deck
        }) 
    })
}
function update (req, res){

}

function deleteDeck (req, res) {

}