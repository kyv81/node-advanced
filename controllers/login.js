module.exports.getLoginpage = function (req, res) {
  res.render('pages/login', {
    title: 'Авторизация',
    msg: req.query.msg
  });
}

module.exports.authorization = function (req, res) {
  //требуем наличия логина и пароля в теле запроса
  if (!req.body.login || !req.body.password) {
    //если не указан логин или пароль - сообщаем об этом
    return res.redirect('/login?msg=Все поля обязательны к заполнению!');
  }
  res.redirect('/admin');
}