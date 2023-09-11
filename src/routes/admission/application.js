const express = require('express');
const router = express.Router();
const Student = require('../../models/admission/application');
const emailValidator = require("email-validator");
const { HttpStatusCodes, HttpStatusText } = require('../../utils/http-status');

// Create a new student application
router.post('/create-application', async (req, res) => {
    try {
        const {
            first_name,
            last_name,
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
            parent_number,
            parent_email,
            payment_date,
            payment_mode,
            challan_no,
        } = req.body;

        const student = new Student({
            first_name,
            last_name,
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
            parent_number,
            parent_email,
            payment_date,
            payment_mode,
            challan_no,
        });

        if (email && !emailValidator.validate(email)) return res.json({ error: "Student email is not valid" })
        if (parent_email && !emailValidator.validate(parent_email)) return res.json({ error: "Parent Email is not valid" })

        const savedStudent = await student.save();

        res.status(201).json({ message: 'Student application created successfully', data: savedStudent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the student application' });
    }
});

router.get('/applications', (req, res) => {
    Student.find({}).then(result => res.json(result)).catch(() => {
        res.statusCode(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: HttpStatusText.INTERNAL_SERVER_ERROR });
    })
})

router.delete('/applications', (req, res) => {
    Student.deleteMany({}).then(result => res.json(result)).catch(() => {
        res.statusCode(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: HttpStatusText.INTERNAL_SERVER_ERROR });
    })
})

module.exports = router;
