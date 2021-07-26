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
    Deck.create(req.body)
    .then(() => {
        res.redirect('/decks')
    })
    // const cardToCreate = {
    //     name: req.body.name,
    //     attack: req.body.attack,
    //     defense: req.body.defense,
    //     description: req.body.description,
    //     type: req.body.type,
    //     ygoId: req.body.ygoId,
    //     attribute: req.body.attribute,
    //     imageUrl: req.body.imageUrl,
    // }
    // Deck.cards.push(cardToCreate)
    .catch((err) => {
        res.render(err)
    })
}

function show (req, res){
     Deck.findById(req.params.id)
    .then((deck) => {
    res.render('decks/show', {
        deck
    }) 
    })
}
function update (req, res){

}

function deleteDeck (req, res) {

}