const express = require('express');
const router = express.Router();
const Student = require('../../models/admission/application');
const emailValidator = require("email-validator");
const { HttpStatusCodes, HttpStatusText } = require('../../utils/http-status');
const fileUpload = require('express-fileupload');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: 'AKIA2FCMN5RRFNDIBMMF',
    secretAccessKey: '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'
});

const bucketName = 'sociolinq';

router.use(fileUpload());

// Create a new student application

router.get('/graph', async (req, res) => {

    Student.find({}).then(r => {
        res.json({
            offline: r.length,
            others: 0,
            advertisement: 0,
            website: 0
        })
    }).catch(err => res.json({
        err
    }));
})

router.post('/create-application', async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            age,
            middle_name,
            date_of_birth,
            gender,
            cma,
            nationality,
            religion,
            category,
            contact_number,
            email,
            applying_for,
            fisc_year,
            current_class,
            previous_percent,
            specialization,
            school_name,
            board,
            medium,
            residential_state,
            residential_city,
            residential_pin_code,
            permanent_state,
            permanent_city,
            permanent_pin_code,
            father_name,
            father_occupation,
            father_annual_income,
            father_number,
            father_email,
            mother_name,
            mother_occupation,
            mother_annual_income,
            mother_number,
            mother_email,
            guardian_name,
            guardian_occupation,
            guardian_annual_income,
            guardian_number,
            guardian_email,
            primary_contact,
            payment_date,
            payment_mode,
            challan_no
        } = req.body;

        let img = req.files.profile_img;
        let profile_img = ""

        s3.upload({
            Bucket: bucketName,
            Key: 'profile/' + img.name,
            Body: img.data
        }, async (err, data) => {
            if (err) {
                res.json({ err })
                console.error(err);
            } else {
                profile_img = data.Location;

                const student = new Student({
                    profile_img,
                    first_name,
                    last_name,
                    age,
                    middle_name,
                    date_of_birth,
                    gender,
                    cma,
                    nationality,
                    religion,
                    category,
                    contact_number,
                    email,
                    applying_for,
                    fisc_year,
                    current_class,
                    previous_percent,
                    specialization,
                    school_name,
                    board,
                    medium,
                    residential_state,
                    residential_city,
                    residential_pin_code,
                    permanent_state,
                    permanent_city,
                    permanent_pin_code,
                    father_name,
                    father_occupation,
                    father_annual_income,
                    father_number,
                    father_email,
                    mother_name,
                    mother_occupation,
                    mother_annual_income,
                    mother_number,
                    mother_email,
                    guardian_name,
                    guardian_occupation,
                    guardian_annual_income,
                    guardian_number,
                    guardian_email,
                    primary_contact,
                    payment_date,
                    payment_mode,
                    challan_no
                });

                if (email && !emailValidator.validate(email)) return res.json({ error: "Student email is not valid" })
                // if (parent_email && !emailValidator.validate(parent_email)) return res.json({ error: "Parent Email is not valid" })

                const savedStudent = await student.save();

                res.status(201).json({ message: 'Student application created successfully', data: savedStudent });

            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the student application' });
    }
});

router.post('/applications/filter', (req, res) => {

    const { fisc_year, date, current_class } = req.body;

    const filter = {};

    if (date) {
        const [startDate, endDate] = date.split('-');

        const start = new Date(new Date(startDate).setHours(0, 0, 0)).toLocaleString()
        const end = new Date(new Date(endDate).setHours(23, 59, 59)).toLocaleString()

        Student.find({}).then(r => 
            r.map((s)=>{
                console.log( s.first_name + " " + new Date(s.created_at).toLocaleString())
            }))

        console.log(start, end)

        filter.created_at = {
            $gte: start,
            $lte: end
        };
    }
    if (fisc_year) {
        filter.fisc_year = fisc_year;
    }
    if (current_class) {
        filter.current_class = current_class;
    }

    Student.find(filter).then(result => res.status(200).json(result)).catch((err) => {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: err });
    })


})

router.get('/applications', (req, res) => {
    Student.find({}).then(result => res.json(result)).catch(() => {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: HttpStatusText.INTERNAL_SERVER_ERROR });
    })
})

router.delete('/applications', (req, res) => {
    Student.deleteMany({}).then(result => res.json(result)).catch(() => {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: HttpStatusText.INTERNAL_SERVER_ERROR });
    })
})

router.get('/applications/:id', (req, res) => {
    Student.find({ _id: req.params.id }).then(result => res.json(result)).catch(() => {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: HttpStatusText.INTERNAL_SERVER_ERROR });
    })
})

router.delete('/applications/:id', (req, res) => {
    Student.deleteOne({ _id: req.params.id }).then(result => res.json(result)).catch(() => {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: HttpStatusText.INTERNAL_SERVER_ERROR });
    })
})

router.post('/search-applications', (req, res) => {

    const { key, value } = req.body;

    Student.find({ [key]: { $regex: value } }).then(result => res.json(result)).catch(() => {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: HttpStatusText.INTERNAL_SERVER_ERROR });
    })
})


module.exports = router;