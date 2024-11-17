const express = require('express');
const router = express.Router();
const taskController = require('../Controllers/taskController');

router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);

module.exports = router;