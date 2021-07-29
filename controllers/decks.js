import { Deck } from '../models/deck.js'
import { Card } from '../models/card.js'
import { Profile } from "../models/profile.js"


export{
    index,
    create,
    show,
    deleteCardFromDeck,
    newDeck as new,

}

function deleteCardFromDeck (req, res) {
    Card.findById(req.params.id)
    .then((card) => {
    card.addedToDeck.remove(req.body.deckId)
    card.save()
        .then(() => {
        Deck.findById(req.body.deckId)
        .then(deck => {
        deck.cards.remove(card._id)
        deck.save()
            .then(() => {
            card,
            res.redirect(`/decks/${req.body.deckId}`)
                })
            })
         })
    })
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
    .populate('cards')
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
    req.body.owner = req.user.profile._id
    Deck.create(req.body)
    .then((deck) => {
    Profile.findById(req.body.owner)
    .then((profile) => {
       profile.decks.push(deck._id)
       profile.save()
       .then(()=>{
           res.redirect(`/decks/${deck._id}`)
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

