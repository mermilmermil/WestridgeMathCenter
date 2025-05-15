import express from 'express';
import { assignmentCsvToJson, loadDahl, loadFellow, loadHome, loadStudent, loadTeacher } from '../controllers/exampleController.js';

const router = express.Router();
router.get('/', loadHome)

router.get('/fellow', loadFellow);
router.get('/Ms-Dahl', loadDahl);
router.get('/student', loadStudent);
router.get('/teacher', loadTeacher); //change this to a different name

router.get('/populate', assignmentCsvToJson)



export default router;