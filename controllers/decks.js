import { Deck } from '../models/deck.js'
import { Card } from '../models/card.js'

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
    .catch((err) => {
        res.render(err)
    })
}

function show (req, res){

}
function update (req, res){

}

function deleteDeck (req, res) {

}