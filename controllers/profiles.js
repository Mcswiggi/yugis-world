import { Profile } from '../models/profile.js'

export {
  index,
 
}

function index (req, res) {
  Profile.find({}, 
    res.render("profiles"))
}

