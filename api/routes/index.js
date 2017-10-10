const express = require('express');
const router = express.Router();

const isAdmin = (req, res, next) => {
    // если в сессии текущего пользователя есть пометка о том, 
    // что он является администратором
    if (req.session.isAdmin) {
        // то все хорошо :)
        return next();
    }
    // если нет, то запрещаем доступ к API
    res.status(403).json({message: 'Access denied'});
};

const ctrlBlog = require('../controllers/blog');
const ctrlAvatar = require('../controllers/avatar');
const ctrlUser = require('../controllers/user');

router.post('/user', ctrlUser.isAuth);

router.get('/blog', ctrlBlog.getArticles);
router.post('/blog', ctrlBlog.createArticle);
router.put('/blog/:id', ctrlBlog.editArticle);
router.delete('/blog/:id', ctrlBlog.deleteArticle);

router.get('/avatar', ctrlAvatar.getAvatar);
router.post('/avatar', ctrlAvatar.setAvatar);

module.exports = router;