const mongoose = require('mongoose');

module.exports.getArticles = function (req, res) {
  const article = [
    {
      "title": "First",
      "date": "2017-07-12",
      "body": "Каждый веб-разработчик знает, что такое текст-«рыба». Текст этот, несмотря на на" +
        "звание, не имеет никакого отношения к обитателям водоемов. Используется он веб-д" +
        "изайнерами для вставки на интернет-страницы и демонстрации внешнего вида контент" +
        "а, просмотра шрифтов, абзацев, отступов и т.д. Так как цель применения такого те" +
        "кста исключительно демонстрационная, то и смысловую нагрузку ему нести совсем не" +
        "обязательно. Более того, нечитабельность текста сыграет на руку при оценке качес" +
        "тва восприятия макета. Самым известным «рыбным» текстом является знаменитый Lore" +
        "m ipsum. Считается, что впервые его применили в книгопечатании еще в XVI веке. С" +
        "воим появлением Lorem ipsum обязан древнеримскому философу Цицерону, ведь именно" +
        " из его трактата «О пределах добра и зла» средневековый книгопечатник вырвал отд" +
        "ельные фразы и слова, получив текст-«рыбу», широко используемый и по сей день. К" +
        "онечно, возникают некоторые вопросы, связанные с использованием Lorem ipsum на с" +
        "айтах и проектах, ориентированных на кириллический контент – написание символов " +
        "на латыни и на кириллице значительно различается. И даже с языками, использующим" +
        "и латинский алфавит, могут возникнуть небольшие проблемы: в различных языках те " +
        "или иные буквы встречаются с разной частотой, имеется разница в длине наиболее р" +
        "аспространенных слов. Отсюда напрашивается вывод, что все же лучше использовать " +
        "в качестве «рыбы» текст на том языке, который планируется использовать при запус" +
        "ке проекта. Сегодня существует несколько вариантов Lorem ipsum, кроме того, есть" +
        " специальные генераторы, создающие собственные варианты текста на основе оригина" +
        "льного трактата, благодаря чему появляется возможность получить более длинный не" +
        "повторяющийся набор слов."
    }
  ];

  const blog = mongoose.model('blog');

  blog
    .find()
    .then(items => {
      if (!items.length) {
        res
          .status(200)
          .json({articles: article});
      } else {
        res
          .status(200)
          .json({articles: items});
      }
    })

}

module.exports.createArticle = function (req, res) {
  //создаем новую запись блога и передаем в нее поля из формы
  const Model = mongoose.model('blog');

  let item = new Model({
    title: req.body.title,
    date: new Date(req.body.date),
    body: req.body.text
  });
  //сохраняем запись в базе
  item
    .save()
    .then(item => {
      return res
        .status(201)
        .json({status: 'Запись успешно добавлена'});
    }, err => {
      //если есть ошибки, то получаем их список и так же передаем
      const error = Object
        .keys(err.errors)
        .map(key => err.errors[key].message)
        .join(', ');

      //обрабатываем  и отправляем
      res
        .status(404)
        .json({
          status: 'При добавление записи произошла ошибка: ' + error
        });
    });
}

module.exports.editArticle = function (req, res) {
  const id = req.params.id;

  let data = {
    title: req.body.title,
    date: new Date(req.body.date),
    body: req.body.text
  };

  const Model = mongoose.model('blog');

  Model
    .findByIdAndUpdate(id, {$set: data} )
    .then((item) => {
      if (!!item) {
        res
          .status(200)
          .json({status: 'Запись успешно обновлена'});
      } else {
        res
          .status(404)
          .json({status: 'Запись в БД не обнаружена'});
      }
    })
    .catch((err) => {
      res
        .status(404)
        .json({
          status: 'При обновлении записи произошла ошибка: ' + err
        });
    });
}

module.exports.deleteArticle = function (req, res) {
  const id = req.params.id;
  const Model = mongoose.model('blog');

  Model
    .findByIdAndRemove(id)
    .then((item) => {
      if (!!item) {
        res.status(200).json({status: 'Запись успешно удалена'});
      } else {
        res.status(404).json({status: 'Запись в БД не обнаружена'});
      }
    }, (err) => {
      res.status(404).json({
        status: 'При удалении записи произошла ошибка: ' + err
      });
    });
}