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
    const crypto = await cryptoManager.getOne(cryptoId).lean();
   
    const isOwner = req.user?._id == crypto.owner;

    res.render('crypto/details', { crypto, isOwner });
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
    const crypto = await cryptoManager.getOne(req.params.cryptoId).lean();

    res.render('crypto/edit', { crypto });
});

router.post('/:cryptoId/edit', isAuth, async (req, res) => {
    const cryptoId = req.params.cryptoId;
    const cryptoData = req.body;
   console.log(cryptoId);
   console.log(cryptoData);
    try {
        await cryptoManager.edit(cryptoId, cryptoData);
        res.redirect(`/crypto/${cryptoId}/details`);
    } catch (err) {
        res.render('crypto/edit', { error: 'Unable to update coin', ...cryptoData });
    }
});

router.get('/search', isAuth, (req, res) => {
    res.render('crypto/search');
});

// router.post('/:photoId/comments', isAuth, async (req, res) => {
//     const photoId = req.params.photoId;

//     const { message } = req.body;
//     const user = req.user._id;

//     try {
//         await cryptoManager.addComment(photoId, { user, message });

//         res.redirect(`/photos/${photoId}/details`);
//     } catch (error) {
        
//     }
// })

module.exports = router;