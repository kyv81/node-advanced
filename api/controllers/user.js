const mongoose = require('mongoose');

module.exports.isAuth = function (req, res) {
  //получаем модель пользователя и шифруем введенный пароль
  const Model = mongoose.model('user');
  //пытаемся найти пользователя с указанным логином
  Model
    .findOne({login: req.body.login})
    .then(user => {
        //если такой пользователь не найден или пароль не верен - сообщаем об этом
        if (!user) {
          return res.status(404).json({status: 'err', message: 'Пользователя не существует'});
        }
        if (!user.validPassword(req.body.password)) {
          return res.status(400).json({status: 'err', message: 'Пароль введен неверно!'});
        } else {
          // если найден, то делаем пометку об этом в сессии пользователя, который сделал
          // запрос
          res.status(200).json({status: 'ok', message: 'Авторизация успешна!'});
        }
      }).catch(e => {
        res.status(404).json({
          status: 'При произошла ошибка: ' + e
        });
      });
}