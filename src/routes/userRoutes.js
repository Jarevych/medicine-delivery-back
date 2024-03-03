const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const userMiddleware = require('../middlewares/userMiddleware')

router.post('/register', userController.signUp);
router.post('/login', userController.login);
router.get('/current', userMiddleware.checkToken, userMiddleware.current);

module.exports = router;