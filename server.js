const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
require('dotenv').config();

const taskRoutes = require('./routes/taskRoutes');
const Task = require('./models/Task');
const emailService = require('./utils/emailService');

const app = express();

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Routes
// app.use('/api/tasks', taskRoutes);

// Add this to your server.js

app.post('/api/create-test-task', async (req, res) => {
    try {
        const dueDate = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
        
        const task = new Task({
            title: "Test Notification",
            description: "This is a test task to check email notifications",
            dueDate: dueDate,
            participants: ['jayasaikiran97@gmail.com'], // Replace with your email
            notificationSent: false
        });

        await task.save();
        res.json({ 
            message: 'Test task created successfully', 
            task: task 
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Error creating test task', 
            details: error.message 
        });
    }
});

//Schedule task notifications
// Schedule to run every 5 minutes
cron.schedule('*/5 * * * *', async () => {
    console.log('Cron job running at:', new Date().toLocaleString());
    try {
        const tasks = await Task.find({
            notificationSent: false,
            dueDate: { $lte: new Date(Date.now() + 24 * 60 * 60 * 1000) }
        });

        console.log(`Found ${tasks.length} tasks to process`);

        for (const task of tasks) {
            console.log(`Attempting to send email for task: ${task.title}`);
                const emailSent = await emailService.sendTaskReminder(task);
            if (emailSent) {
                task.notificationSent = true;
                await task.save();
                console.log(`✓ Email sent successfully for task: ${task.title}`);
            } else {
                console.log(`✗ Failed to send email for task: ${task.title}`);
            }
        }
    } catch (error) {
        console.error('Error in notification cron job:', error);
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});