import { Message } from '../models/message.js'

export{
    index,
    create,
    show,
    update,
    deleteMessage as delete,
    reply,
    edit
}

function edit (req, res) {
    Message.findById(req.params.id)
    .populate({ 
        path: 'replies',
        populate: {
            path: 'author'
        }
    })
    .then(message => {
        console.log(message.replies[0])
        res.render('messages/edit', {
            title: "Edit message",
            message
        })
    })
    .catch((err) => {
        res.render(err)
    })
}

function index (req, res){
    Message.find({})
    .populate('author')
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

function reply (req, res){
    req.body.author = req.user.profile._id
    Message.findById(req.params.id)
    .then(message => {
        message.replies.push(req.body)
        message.save()
        .then(() => {
            res.redirect(`/messages/${req.params.id}`)
        })
    })
}

function update (req, res){
Message.findByIdAndUpdate(req.params.id, req.body, {new: true})
.then(message => {
    res.redirect(`/messages/${message._id}`)
})
.catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deleteMessage (req, res){
Message.findByIdAndDelete(req.params.id)
.then(() =>{
    console.log(req.params.id)
    res.redirect('/messages')
    })
}