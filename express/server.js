const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Jobs = require('./models/jobs'); // Correctly import the User model

const app = express();

app.use(express.json());
app.use(cors());

// Route
app.get('/', (req, res) => {
    res.send('Hello NODE API');
});

app.get('/getjobs', async (req, res) => {
    const jobdata= await Jobs.find({}) 
    res.send(jobdata);
});

app.post('/createjobs', async (req, res) => {
    try {
        const body = req.body;
        const newJobs = new Jobs(body);
        await newJobs.save();
        res.status(201).send(newJobs); // Send back the created user
    } catch (error) {
        res.status(500).send({ message: 'Error creating Jobs', error: error.message });
    }
});

// Database connection and server start
mongoose.connect('mongodb+srv://admin:admin123@api-test.sqd5x.mongodb.net/Node-API?retryWrites=true&w=majority&appName=API-TEST')
.then(() => {
    console.log('connected to MongoDB');
    app.listen(4000, () => {
        console.log('Node API app is running on port 4000');
    });
})
.catch((error) => {
    console.log(error);
});

app.get('/staticjobs', (req, res) => {
    res.sendFile(path.join(__dirname, 'jenkins.jobs.json'));
});
