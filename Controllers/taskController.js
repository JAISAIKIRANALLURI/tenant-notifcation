const Task = require('../models/Task');
const emailService = require('../utils/emailService');

class TaskController {
    // Create a new task
    async createTask(req, res) {
        try {
            const task = new Task({
                title: req.body.title,
                description: req.body.description,
                dueDate: new Date(req.body.dueDate),
                participants: req.body.participants
            });

            await task.save();

            // Send immediate notification if task is due soon (within 24 hours)
            const timeUntilDue = task.dueDate.getTime() - Date.now();
            if (timeUntilDue <= 24 * 60 * 60 * 1000) {
                await emailService.sendTaskReminder(task);
                task.notificationSent = true;
                await task.save();
            }

            res.status(201).json(task);
        } catch (error) {
            res.status(400).json({
                error: 'Error creating task',
                details: error.message
            });
        }
    }

    // Get all tasks
    async getAllTasks(req, res) {
        try {
            const tasks = await Task.find()
                .sort({ createdAt: -1 });
            res.json(tasks);
        } catch (error) {
            res.status(500).json({
                error: 'Error fetching tasks',
                details: error.message
            });
        }
    }
}

module.exports = new TaskController();
