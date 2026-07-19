require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, '../')));

// File path for enquiries.json
const enquiriesFile = path.join(__dirname, 'enquiries.json');

// ===============================
// Home Route
// ===============================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// ===============================
// Save Enquiry
// ===============================
app.post('/contact', (req, res) => {

    const enquiry = {
        id: Date.now(),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        course: req.body.course,
        message: req.body.message,
        createdAt: new Date().toISOString()
    };

    let enquiries = [];

    try {

        if (fs.existsSync(enquiriesFile)) {
            const data = fs.readFileSync(enquiriesFile, 'utf8');

            if (data.trim() !== '') {
                enquiries = JSON.parse(data);
            }
        }

        enquiries.push(enquiry);

        fs.writeFileSync(
            enquiriesFile,
            JSON.stringify(enquiries, null, 2)
        );

        console.log("New Enquiry Received:");
        console.log(enquiry);

        res.status(200).json({
            success: true,
            message: "Enquiry submitted successfully!"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to save enquiry."
        });
    }

});

// ===============================
// Get All Enquiries
// ===============================
app.get('/enquiries', (req, res) => {

    try {

        if (!fs.existsSync(enquiriesFile)) {
            return res.json([]);
        }

        const enquiries = JSON.parse(
            fs.readFileSync(enquiriesFile, 'utf8')
        );

        res.json(enquiries);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch enquiries."
        });

    }

});

// ===============================
// Start Server
// ===============================
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});