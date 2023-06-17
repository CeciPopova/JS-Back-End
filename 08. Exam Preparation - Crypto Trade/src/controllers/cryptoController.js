const router = require('express').Router();

const cryptoManager = require('../managers/cryptoManager');

const { getErrorMessage } = require('../utils/errorHelpers');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/catalog', async (req, res) => {

    const coins = await cryptoManager.getAll().lean();
    res.render('crypto/catalog', { coins });
})

router.get('/create', isAuth, (req, res) => {
    res.render('crypto/create');
});

router.post('/create', isAuth, async (req, res) => {
    const cryptoData = req.body;
   
    try {
        await cryptoManager.create(req.user._id, cryptoData);

        res.redirect('/crypto/catalog');

    } catch (err) {
        console.log(err);
        res.render('crypto/create', { error: getErrorMessage(err) });
    }
});

router.get('/:cryptoId/details', async (req, res) => {
    const cryptoId = req.params.cryptoId;
    
    const crypto = await cryptoManager.getOne(cryptoId);
   
    const isOwner = req.user?._id == crypto.owner;
    const isBuyer = crypto.buyers.some(id => id == req.user?._id);


    res.render('crypto/details', { crypto, isOwner, isBuyer });
    
});

router.get('/:cryptoId/delete', isAuth,async (req, res) => {
    const cryptoId = req.params.cryptoId;

    try {
        await cryptoManager.delete(cryptoId);

        res.redirect('/crypto/catalog')
    } catch (err) {
        res.render(`/crypto/details`, { error: 'Unsuccessful photo deletion!' });
    }
});

router.get('/:cryptoId/edit', isAuth, async (req, res) => {
    const crypto = await cryptoManager.getOne(req.params.cryptoId);

    res.render('crypto/edit', { crypto });
});

router.post('/:cryptoId/edit', isAuth, async (req, res) => {
    const cryptoId = req.params.cryptoId;
    const cryptoData = req.body;
  
    try {
        await cryptoManager.edit(cryptoId, cryptoData);
        res.redirect(`/crypto/${cryptoId}/details`);
    } catch (err) {
        res.render('crypto/edit', { error: 'Unable to update coin', ...cryptoData });
    }
});

router.get('/search', isAuth, async (req, res) => {
    const { name, paymentMethod } = req.query;
    const crypto = await cryptoManager.search(name, paymentMethod);

    //const crypto = await cryptoManager.getAll().lean();

    res.render('crypto/search', { crypto });
});

router.get('/:cryptoId/buy', isAuth, async (req, res) => {
    const userId = req.user._id;
    const cryptoId = req.params.cryptoId;

    await cryptoManager.buy(userId, cryptoId);

    res.redirect(`/crypto/${cryptoId}/details`);

})

module.exports = router;