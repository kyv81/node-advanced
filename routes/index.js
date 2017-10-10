const express = require('express');
const router = express.Router();

const isAdmin = (req, res, next) => {
    // если в сессии текущего пользователя есть пометка о том,
    // что он является администратором
    if (req.session.isAdmin) {
        // то все хорошо :)
        return next();
    }
    // если нет, то перебросить пользователя на главную страницу сайта
    res.redirect('/');
};

const ctrlHome = require('../controllers/homepage');
const ctrlAbout = require('../controllers/about');
const ctrlWorks = require('../controllers/works');
const ctrlBlog = require('../controllers/blog');
const ctrlAdmin = require('../controllers/admin');

/* GET home page. */
router.get('/', ctrlHome.getIndex);
router.post('/login', ctrlHome.auth);

router.get('/about', ctrlAbout.getAbout);

router.get('/works', ctrlWorks.getWorks);
router.post('/contact', ctrlWorks.sendEmail);

router.get('/blog', ctrlBlog.getBlog);

router.get('/admin', isAdmin, ctrlAdmin.getAdminpage);
router.post('/admin/avatar', isAdmin, ctrlAdmin.uploadAvatar);
router.post('/admin/blog', isAdmin, ctrlAdmin.addArticle);

module.exports = router;
