const nodemailer = require('nodemailer');
const config = require('../config.json');

module.exports.getWorks = function (req, res) {
  res.render('pages/works', {
    title: 'Мои работы',
    msg: req.query.msg
  });
}

module.exports.sendEmail = function(req, res) {
  //требуем наличия имени, обратной почты и текста
  if (!req.body.name || !req.body.email || !req.body.text) {
    //если что-либо не указано - сообщаем об этом
    return res.redirect('/works?msg=Все поля нужно заполнить!');
  }
  //инициализируем модуль для отправки писем и указываем данные из конфига
  const transporter = nodemailer.createTransport(config.mail.smtp);
  const mailOptions = {
    from: `"${req.body.name}" <${req.body.email}>`,
    to: config.mail.smtp.auth.user,
    subject: config.mail.subject,
    text: req
      .body
      .text
      .trim()
      .slice(0, 500) + `\n Отправлено с: <${req.body.email}>`
  };
  //отправляем почту
  transporter.sendMail(mailOptions, function (error, info) {
    //если есть ошибки при отправке - сообщаем об этом
    if (error) {
      return res.redirect('/works?msg=При отправке письма произошла ошибка');
    }
    res.redirect('/works?msg=Письмо успешно отправлено');
  });

}