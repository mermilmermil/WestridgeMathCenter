import CalDate from '../models/CalDate.js';
import fs from 'fs'
import path from 'path'
import Constants from '../models/Constants.js';

const rotationDays = ["1","2","3","4","5","6"]

export const loadHome = async (req, res) => {
  try {
    
    res.render('index');
  } catch (err) {
    console.log(err)
    res.status(500).send( err);
  }
};

export const loadFellow = async (req, res) => {
  try {
    // const today = new Date()
    const today = new Date("2025-5-1")
    today.setHours(0,0,0,0)

    const min = req.query.min || today
    const max = req.query.max || new Date("4000")
    const rot = req.query.rotation 
    
    const days = rotationDays.includes(rot) ? await CalDate.find({ date: { $gte: min, $lt: max}, timeRotation: `${rot}-lunch`}) : await CalDate.find({ date: { $gte: min, $lt: max}});
    
    res.render('fellow', { days });
  } catch (err) {
    console.log(err)
    res.status(500).send( err);
  }
};

export const loadDahl = async (req, res) => {
  try {
    //const examples = await Example.find();
    res.render('msDahl');
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

export const loadStudent = async (req, res) => {
  try {
    // const today = new Date()
    const today = new Date("2025-5-1")
    today.setHours(0,0,0,0)


    const min = req.query.min || ""
    const max = req.query.max || ""
    
    const rot = req.query.timeRotation || "all"
    const subj = req.query.subject
    const fellow = req.query.fellow || "all"
    

    const constants = await Constants.findOne(); // just one doc

    const allFellows = constants.fellows
    const allSubjects = constants.subjects
    const allTimeRotations = constants.timeRotations

    // Build Mongo query
    const query = {
      subjects: subj || "",
    };
    if (fellow !== "all") {query.available = fellow}
    if (rot !== "all") {query.timeRotation = rot}
    
    if (min !== "") {query.date = { $gte: min}}
    if (max !== "") {query.date = { $lte: max}}
    if (min !== "" && max !== "") {query.date = { $gte: min, $lte: max}}
    // if (subj !== "all") query.subjects = subj;   // assuming subjects is an array
    // if (fellow !== "all") query.available = fellow; // assuming available is an array

    // Fetch filtered appointments
    const days = await CalDate.find(query).sort({ date: 1})
    // console.log(days)
    res.render('student', { days, allFellows, allSubjects, allTimeRotations, selected: { min, max, rot, subj, fellow }});
  } catch (err) {
    res.status(500).send('Server Error ' + err);
  }
};

export const loadTeacher = async (req, res) => {
  try {
    // const today = new Date()
    // maybe cutoff 8:40
    const today = new Date("2025-5-13")
    today.setHours(0,0,0,0)

    const min = req.query.min || today
    const max = req.query.max || new Date("4000")
    const rot = req.query.rotation 
    
    const days = rotationDays.includes(rot) ? await CalDate.find({ date: { $gte: min, $lt: max}, timeRotation: rot}) : await CalDate.find({ date: { $gte: min, $lt: max}});
    
    res.render('teacher', { days });
  } catch (err) {
    res.status(500).send(err);
    
  }
}; 

export const teacherAbsent = async (req, res) => {
  try {
    
    console.log(req.params)
    const idFellow = req.params.idFellow
    const id = idFellow
    console.log(id)

    const fellow = req.params.idName
    let day = await CalDate.findById(id)
    console.log(day)

    const availArray = day.available
    console.log(availArray)
    if (availArray.length > 0) {
      const index = availArray.indexOf(fellow)
      console.log("h" + index)
      const updatedAvail = availArray.splice(index, 1)
      
      console.log(availArray)

      
      let absentArray = day.absent
      absentArray.push(updatedAvail[0])

      console.log( absentArray)
      const updatedDay = await CalDate.updateOne(
        {_id: id},
        {$set: { available: availArray, absent: absentArray}}
      )
      
      // await updatedDay.save()
      res.redirect('/teacher')
    }
    else {
      res.send("how did you get here?")
    }
    
  } catch (err) {
    res.status(500).send(err);
    
  }
}; 

export const fellowAbsent = async (req, res) => {
  try {
    
    console.log(req.params)
    const idFellow = req.params.idFellow
    const id = idFellow
    console.log(id)

    const fellow = req.params.idName
    let day = await CalDate.findById(id)
    console.log(day)

    const availArray = day.available
    console.log(availArray)
    if (availArray.length > 0) {
      const index = availArray.indexOf(fellow)
      console.log("h" + index)
      const updatedAvail = availArray.splice(index, 1)
      
      console.log(availArray)

      
      let absentArray = day.absent
      absentArray.push(updatedAvail[0])

      console.log( absentArray)
      const updatedDay = await CalDate.updateOne(
        {_id: id},
        {$set: { available: availArray, absent: absentArray}}
      )
      
      // await updatedDay.save()
      res.redirect('/fellow')
    }
    else {
      res.send("how did you get here?")
    }
    
  } catch (err) {
    res.status(500).send(err);
    
  }
}; 

export const delAbsent = async (req, res) => {
  try {
    
    console.log(req.params)
    const idFellow = req.params.idFellow
    const id = idFellow
    console.log(id)

    const fellow = req.params.idName
    let day = await CalDate.findById(id)
    console.log(day)

    let absentArray = day.absent
    console.log(absentArray)

    const index = absentArray.indexOf(fellow)
    console.log("h" + index)
    const removedAbs = absentArray.splice(index, 1)
    console.log(removedAbs)
    
    const availArray = day.available
    availArray.push(removedAbs[0])

    console.log( absentArray)
    const updatedDay = await CalDate.updateOne(
      {_id: id},
      {$set: { available: availArray, absent: absentArray}}
    )
    
    // await updatedDay.save()
    res.redirect('/teacher')
  } catch (err) {
    res.status(500).send(err);
    
  }
}; 

export const scheduleMeeting = async (req, res) => {
  try {
    console.log(req.body)
    const id = req.body.id
    console.log(id)

    const fellow = req.body.fellow
    let day = await CalDate.findById(id)
    console.log(day)

    const availArray = day.available
    console.log(availArray)
    if (availArray.length > 0) {
      const index = availArray.indexOf(fellow)
      console.log("h" + index)
      const updatedAvail = availArray.splice(index, 1)
      
      console.log(availArray)

      
      let meetingArray = day.meeting
      meetingArray.push({fellow: updatedAvail[0], student: req.body.student, studentEmail: req.body.studentEmail, details: req.body.details})
      
      console.log(meetingArray)
      const updatedDay = await CalDate.updateOne(
        {_id: id},
        {$set: { available: availArray, meeting: meetingArray}}
      )
      
      // await updatedDay.save()
      // res.redirect('/student')
      res.send(updatedDay)
      // res.send(meetingArray)
    }
    else {
      res.send("how did you get here?")
    }
    
    // res.redirect('student')
  } catch (err) {
    res.status(500).send('Server Error\n' + err);
  }
};


const assignmentToDate = async (req, res, assignments) => {
  try {
  const result = []
  console.log('start assignment to date')
  const filePath = path.join("./data", 'rotation-days.csv'); 
  fs.readFile(filePath, 'utf8', async (err, data) => {
    // Day,Date
    
      const lines = data.split('\n')
      const headers = lines[0].split(",") //in case you want to make it more efficient
      
      
      for  (let i = 1; i < lines.length; i++) {
      // { timeRotation, fellows, Subjects, Faculty  }
      // { date, timeRotation, available, subject, faculty} 
        const currLine = lines[i].split(',')
        const currDate = new Date(currLine[1])
        const currRot = currLine[0]
        const currWeekDay = currDate.toLocaleDateString('en-US', { weekday: 'long' });
        console.log("current week day is " + currWeekDay)
        assignments.forEach(e => {
          const day = e.timeRotation.split('-')[0]
          console.log(day)
          console.log(currRot)
          if (rotationDays.includes(day)){
            
            if (currRot === day){
              console.log(e.subjects)
              const newDate = new CalDate({
                date: currDate,
                timeRotation: e.timeRotation,
                available: e.fellows,
                absent: [],
                meeting: [],
                subjects: e.subjects,
                faculty: e.faculty
              })
              console.log(newDate)
               newDate.save()
            }

            
          }
          else {
            console.log(currWeekDay)
            if (day === currWeekDay)  {

              const newDate = new CalDate({
                date: currDate,
                timeRotation: e.timeRotation,
                available: e.fellows,
                absent: [],
                meeting: [],
                subjects: e.subjects,
                faculty: e.faculty
              })
              console.log(newDate)
               newDate.save()
            }
          }

          
        });
  
        result.push({
          date: currDate
          
        })
      }
      
      
    
    });
    // set ALLSUBJECTS
    
    res.send(result)
  }catch(err){
    console.log("there was an error")
    res.status(500).send(`Server Error \n ${err}`);
  }
}

export const assignmentCsvToJson = async (req, res) => {
  try {
    const why = await CalDate.deleteMany({})

      // Shift,Fellows,Faculty,Subjects
      // Day, Date
    const result = [] 
    const filePath = path.join("./data", 'center-assignments.csv'); 
    fs.readFile(filePath, 'utf8', async (err, data) => {
      if (err) {
        return res.send("Failed to read the file: \n" + err);
        
      } 
      const lines = data.split('\n')
      const headers = lines[0].split(",") //in case you want to make it more efficient
      
      
      for  (let i = 1; i < lines.length; i++) {
      // { timeRotation, fellows, Date(), Subjects, Faculty  }
        
        const currLine = lines[i].split(',')
        let fellows = currLine[1].split('"')[1].split(';')
        
        fellows = fellows.map(e => {
          
          const firstName = e.split(' ')[0]
          const lastName = e.split(' ')[1]
          return  `${lastName}, ${firstName}`
        })

        
        let currSubjects = currLine[3].split(';')
        if (currSubjects.length > 1) {
          currSubjects = currLine[3].split('"')[1].split(';')
        }
        else {
          currSubjects = currLine[3].split('"')[1]
          currSubjects = [currSubjects]
        }
        const currObj = {
          timeRotation: currLine[0],
          fellows: fellows,
          subjects: currSubjects,
          faculty: currLine[2],


        }
        console.log(currObj)
        result.push(currObj)
        
        
      }
      console.log("start set constants")
      const fakeAllSubjects = []
      result.forEach((day) => {
        let currSubjs = day.subjects
        if (currSubjs.length > 1){
          currSubjs.forEach((e) => {
            fakeAllSubjects.push(e)
        })
        }

      })
      // SET CONSTANTS
      const ALLSUBJECTS = [...new Set(fakeAllSubjects)]
      console.log("all subjects: "+ALLSUBJECTS)

      const fakeAllFellows = []
      result.forEach((day) => {
      let currSubjs = day.fellows
      currSubjs.forEach((e) => {
        fakeAllFellows.push(e)
      })

      })
      const ALLFELLOWS = [...new Set(fakeAllFellows)]
      console.log(ALLFELLOWS)

      const fakeAllTimes = []
      result.forEach((day) => {
      
        let currTimes = day.timeRotation
        
        fakeAllTimes.push(currTimes)
        

      })
      const ALLTIMES = [...new Set(fakeAllTimes)]
      console.log(ALLTIMES)

      await Constants.deleteMany({}); // clear old values
      await Constants.create({
        subjects: ALLSUBJECTS,
        fellows: ALLFELLOWS,
        timeRotations: ALLTIMES
      });

      console.log("Saved constants to Mongo");

      const answer = await assignmentToDate(req, res, result)
      console.log(answer)
      // return res.send(answer)
    });

  } catch (err) {
    console.log(err)
    res.status(500).send(`Server Error \n ${err}`);
  }
};

