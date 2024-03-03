const express = require('express');
const router = express.Router();

router.get('/order');
router.get('/order/:id');
router.post('/order');
router.put('/order/:id');
router.delete('/order');


module.exports = router;