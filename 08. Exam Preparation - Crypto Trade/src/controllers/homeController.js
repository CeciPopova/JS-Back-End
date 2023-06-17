const router = require('express').Router();
const cryptoManager = require('../managers/cryptoManager');

const { isAuth } = require('../middlewares/authMiddleware');

router.get('/', async (req, res) => {
    //console.log(req.user);
    const coins = await cryptoManager.getAll().lean()
    res.render('home', { coins });
});

router.get('/404', (req, res) => {
    res.render('404');
});



module.exports = router;