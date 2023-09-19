const express = require('express')
const router = express.Router()
const tasksController = require('../controllers/taskController')
const taskController = require('../controllers/taskController')

//List all tasks
router.get('/', tasksController.getAllTasks)

//Create new task
router.post('/new',taskController.createTask)

//Get task by id
router.get('/:id', taskController.getTaskById)

//Update a task
router.put('/:id', taskController.updateTask)

//Delete a task
router.delete('/:id', taskController.deleteTask)

module.exports = router