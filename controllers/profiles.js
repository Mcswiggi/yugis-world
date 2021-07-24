import { Profile } from '../models/profile.js'

export {
  index,
  show,
  addFriend,
  removeFriend
}

function removeFriend (req, res) {
  Profile.findById(req.user.profile)
  .then(profile => {
    profile.friends.remove({_id: req.params.id})
    profile.save()
    .then(()=> {
      res.redirect(`/profiles/${req.params.id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function addFriend (req, res) {
  Profile.findById(req.user.profile)
  .then(profile => {
    profile.friends.push(req.params.id)
    profile.save()
    .then(()=> {
      res.redirect(`/profiles/${req.params.id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show (req, res) {
  Profile.findById(req.params.id)
  // .populate('friends')
  .then(profile => {
    Profile.findById(req.user.profile)
    .then(userProfile => {
    res.render('profiles/show', {
      //profile of the user clicked
      profile,
      //profile of the logged in user
      userProfile,
      title: `${profile.name}'s profile`
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function index (req, res) {
  Profile.find({})
  .then(profiles => {
    res.render("profiles/index", {
      title: "All Profiles",
      profiles
    })
  })
}

