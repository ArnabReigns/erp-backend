const express = require('express');
const router = express.Router();
const Student = require('../../models/admission/application');


router.get('/graph', async (req, res) => {

    const offline = await Student.find({})

    res.json({
        offline: offline.length,
        others: 0,
        advertisement: 0,
        website: 0
    })

})


module.exports = router;