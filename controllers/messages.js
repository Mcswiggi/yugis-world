import { Message } from '../models/message.js'

export{
    index,
    create,
    show,
    update,
    deleteMessage as delete,
    reply,
    newMessage as new
}

function newMessage (req, res) {
    res.render('messages/new')
}

function index (req, res){
    Message.find({})
    .then((messages) => {
        res.render('messages/index', {
            messages
        })
    })
    .catch((err) => {
        res.render(err)
    })
}
function create (req, res){
req.body.author = req.user.profile._id
Message.create(req.body)
.then(() => {
    res.redirect('/messages')
})
}
function show (req, res){

}
function update (req, res){

}
function deleteMessage (req, res){

}
function reply (req, res){

}