const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const http = require('request');

const apiOptions = {
  server: "http://localhost:3000"
}

module.exports.getAdminpage = function (req, res) {
  res.render('pages/admin', {
    title: 'Admin panel',
    msgfile: req.query.msgfile,
    msgblog: req.query.msgblog
  });
}

module.exports.uploadAvatar = function (req, res) {
  let form = new formidable.IncomingForm();
  let upload = 'public/upload';
  let fileName;

  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload);
  }

  form.uploadDir = path.join(process.cwd(), upload);

  form.parse(req, function(err, fields, files) {
    if (err) {
      return res.redirect('/admin?msgfile=Не удалось загрузить картинку');
    }
    if (!fields.name) {
      fs.unlink(files.photo.path);
      return res.redirect('/admin?msgfile=Не указано описание картинки!');
    }

    fileName = path.join(upload, files.photo.name);

    fs.rename(files.photo.path, fileName, function (err) {
      if (err) {
        console.log(err);
        fs.unlink(fileName);
        fs.rename(files.photo.path, fileName);
      }
      const pathApi = '/api/avatar';
      let dir = fileName.substr(fileName.indexOf('\\'));
      const requestOptions = {
        url: apiOptions.server + pathApi,
        method: "POST",
        json: {
          name: fields.name,
          picture: dir
        }
      };

      http(requestOptions, function (error, response, body) {
        if (error) {
          return res.redirect('/admin?msgfile=Картинка не сохранилась в БД');
        }
        res.redirect('/admin?msgfile=Картинка успешно загружена');
      });

    });
    
  });

}

module.exports.addArticle = function (req, res) {
  const pathApi = '/api/blog';
  const requestOptions = {
    url: apiOptions.server + pathApi,
    method: "POST",
    json: {
      title: req.body.title,
      date: req.body.date,
      text: req.body.text
    }
  };

  http(requestOptions, function (error, response, body) {
    res.redirect('/admin?msgblog=' + body.status);
  });
}