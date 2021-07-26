import { Message } from '../models/message.js'

export{
    index,
    create,
    show,
    update,
    deleteMessage as delete,
    reply,
}



function index (req, res){
    Message.find({})
    .then((messages) => {
        res.render('messages/index', {
            title: 'All Messages',
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
    Message.findById(req.params.id)
    .populate('author')
    .populate({
      path: 'replies',
      populate: {
        path: 'author'
      }
    })
    .then(message => {
      res.render('messages/show', {
        title: 'Message Details',
        message
      })
    })
}
function update (req, res){

}
function deleteMessage (req, res){

}
function reply (req, res){

}