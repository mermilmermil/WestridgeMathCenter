import express from 'express';
import { assignmentCsvToJson, delAbsent, fellowAbsent, loadDahl, loadFellow, loadHome, loadStudent, loadTeacher, teacherAbsent, scheduleMeeting } from '../controllers/exampleController.js';

const router = express.Router();
router.get('/', loadHome)

router.get('/fellow', loadFellow);
router.get('/Ms-Dahl', loadDahl);
router.get('/student', loadStudent);
router.get('/teacher', loadTeacher); //change this to a different name

router.get('/fellow/absent/:idFellow/:idName', fellowAbsent)

router.get('/teacher/absent/:idFellow/:idName', teacherAbsent)
router.get('/teacher/deleteAbs/:idFellow/:idName', delAbsent)

router.get('/scheduleMeeting/:idFellow', scheduleMeeting)

router.get('/populate', assignmentCsvToJson)




export default router;