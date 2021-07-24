import { Deck } from '../models/deck.js'

export{
    index,
    create,
    show,
    update,
    deleteDeck as delete,
}


function index (req, res){
    Deck.find({})
    .then((deck) => {
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
// Deck.create(req.body)
// .then(() => {
//     res.redirect('/decks')
// })
}

function show (req, res){

}
function update (req, res){

}

function deleteDeck (req, res) {

}