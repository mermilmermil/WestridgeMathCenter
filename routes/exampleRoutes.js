import express from 'express';
import { getExamples, createExample, loadDahl, loadFellow, loadStudent, loadTeacher } from '../controllers/exampleController.js';

const router = express.Router();

router.get('/', getExamples);
router.post('/', createExample);

router.get('/fellow', loadFellow);
router.get('/Ms-Dahl', loadDahl);
router.get('/student', loadStudent);
router.get('/teacher', loadTeacher);



export default router;