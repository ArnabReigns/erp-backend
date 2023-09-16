const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Welcome To The Api");
});

router.post('/localtime', (req, res) => {

    if (req.body.date) date = new Date(req.body.date);
    // Define the Kolkata, India timezone
    const timeZone = 'Asia/Kolkata';
    // Convert the date to the local date and time of Kolkata, India
    const localDate = date.toLocaleString('en-US', { timeZone });

    res.json({
        date: localDate
    })

})


router.use(require('../routes/auth/user'))
router.use(require('../middleware/useAuth'))
router.use('/activity', require('../routes/activity logger/logger'))
router.use('/admission', require('../routes/admission/application'))
router.use('/screening', require('../routes/admission/screening'))


module.exports = router;