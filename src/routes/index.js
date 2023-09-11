const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Welcome To The Api");
});

router.use(require('../routes/auth/user'))
router.use('/admission',require('../routes/admission/application'))


module.exports = router;