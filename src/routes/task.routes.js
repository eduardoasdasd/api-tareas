import { Router } from 'express'
import { getTasks, createTask, getTaskById, updateTask, deleteTask, deleteAllTask } from '../controllers/task.controller'

const router = Router();

router.get('/tasks', getTasks);

router.get('/task/:id', getTaskById);

router.post('/task', createTask);

router.patch('/task/:id', updateTask)

router.delete('/task/:id', deleteTask)

router.delete('/tasks', deleteAllTask)

export default router;