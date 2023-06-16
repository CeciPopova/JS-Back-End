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
        await cryptoManager.create(cryptoData);

        res.redirect('/crypto/catalog');

    } catch (err) {
        console.log(err);
        res.render('crypto/create', { error: getErrorMessage(err) });
    }
});

// router.get('/:photoId/details', async (req, res) => {
//     const photoId = req.params.photoId;
//     const photo = await cryptoManager.getOne(photoId).populate('comments.user').lean();
//     const isOwner = req.user?._id == photo.owner._id;

//     res.render('photos/details', { photo, isOwner });
// });

// router.get('/:photoId/delete', isAuth,async (req, res) => {
//     const photoId = req.params.photoId;

//     try {
//         await cryptoManager.delete(photoId);

//         res.redirect('/photos')
//     } catch (err) {
//         res.render(`/photos/details`, { error: 'Unsuccessful photo deletion!' });
//     }
// });

// router.get('/:photoId/edit', isAuth, async (req, res) => {
//     const photo = await cryptoManager.getOne(req.params.photoId).lean();

//     res.render('photos/edit', { photo });
// });

// router.post('/:photoId/edit', isAuth, async (req, res) => {
//     const photoId = req.params.photoId;
//     const photoData = req.body;
//     try {
//         await cryptoManager.edit(photoId, photoData);
//         res.redirect(`/photos/${photoId}/details`);
//     } catch (err) {
//         res.render('photos/edit', { error: 'Unable to update photo', ...photoData });
//     }
// });

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