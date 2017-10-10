const mongoose = require('mongoose');

module.exports.getAvatar = function(req, res) {
  const avatar = {
    name: 'Архипов Александр',
    picture: '/assets/img/avatar.png'
  }
  const picture = mongoose.model('pic');
  picture
    .findOne()
    .then(item => {
      if (!item) {
        res
          .status(200)
          .json(avatar);
      } else {
        res
          .status(200)
          .json(item);
      }
    });
}

module.exports.setAvatar = function(req, res) {
  const Model = mongoose.model('pic');
  Model.remove({}, err => {
    if (err) return res.status(400).json({message: err.message, error: err})
    
    const item = new Model({name: req.body.name, picture: req.body.picture});
    item
      .save()
      .then(pic => res.status(201).json(pic), e => res.status(400).json({message: e.message, error: e}))
  });
}