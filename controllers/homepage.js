const config = require('../config.json');
const http = require('request');
const apiOptions = {
  server: "http://188.225.84.211:3000"
};

module.exports.auth = function (req, res) {
  //требуем наличия логина и пароля в теле запроса
  if (!req.body.login || !req.body.password) {
    //если не указан логин или пароль - сообщаем об этом
    return res.redirect('/?msg=Все поля обязательны к заполнению!');
  }

  const pathApi = '/api/user';
  const requestOptions = {
    url: apiOptions.server + pathApi,
    method: "POST",
    json: {
      login: req.body.login,
      password: req.body.password
    }
  };

  http(requestOptions, function(error, response, body) {
    if (body.status === 'err') {
      return res.redirect(`/?msg=${body.message}`);
    }
    req.session.isAdmin = true;
    res.redirect('/admin');
  });
}

module.exports.getIndex = function (req, res) {
  if (req.session.isAdmin) {
    return res.redirect('/admin');
  }
  
  const pathApi = '/api/avatar';
  const requestOptions = {
    url: apiOptions.server + pathApi,
    method: "GET",
    json: {}
  };
  const sendObj = {
    title: 'Главная страница',
    msg: req.query.msg
  };
  http(requestOptions, function (error, response, body) {
    res.render('pages/index', Object.assign(sendObj, body));
  })
}