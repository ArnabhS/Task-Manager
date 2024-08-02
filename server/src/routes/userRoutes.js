const express = require('express');
const { registerUser, loginUser, logoutUser, getUser, handleSubscription} = require('../controllers/userController.js');
const { verifyToken } = require('../middleware/authMiddleware.js');
const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.put('/:id/subscribe',handleSubscription)
router.get('/:id',getUser)
router.post('/logout', verifyToken, logoutUser);

module.exports = router;