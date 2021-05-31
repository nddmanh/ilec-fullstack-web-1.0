const express = require('express')
const app = express()
const router = express.Router();
var fs = require('fs');

//Check Unique By Id
function checkUniqueById(Student, id) {
    let i = 0;
    Student.forEach( student => {
        if ( id === student.id) {
            i = i + 1;
        } 
    });

    if (i === 0) {
        return true;
    } else {
        return false;
    }
}

// Check email
function checkEmail (Student) {
    let arr = Student.email.split('');

    let i = 0;
    arr.forEach( item => {
        if (item === "@") {
            i++;
        }
    });

    if (i === 0) {
        return false;
    } else {
        return true;
    }
}

// Check name
function checkName (Student) {
    let arr = Student.name.split('');

    let i = 0;
    arr.forEach( item => {
        if (parseInt(item) === NaN) {
            i++;
        }
    });

    if (i === 0) {
        return true;
    } else {
        return false;
    }
}

fs.readFile('./students.json', 'utf8', function (error, data) {
    if(error) {
        throw error;
    } 

    let student = JSON.parse(data) ;
    let Student = student.students;

    //GET
    router.get('/students', function (req, res) {
        res.json(student.students);
    });

    //POST
    router.post('/students', function (req, res) {
        if(checkUniqueById(Student, req.body.id ) === true) {
            if(checkEmail(req.body) === true ) {
                if(checkName(req.body) === true) {
                    Student.push(req.body);

                    fs.writeFile('./students.json', JSON.stringify(student), function (error, data) {
                        if(!error) {
                            console.log("DONE");
                        } 
                    })
                } else {
                    console.log("Name is false!");
                }
            } else {
                console.log("Email not true!");
            }
        } else {
            console.log("ID is not Unique!");
        }

        res.status(200).send(req.body);
    });
  
    //PUT
    router.put('/students/:id', function (req, res) {
        const studentId = req.params.id;
        const newStudent = req.body;
        // if (newStudent.id === studentId) {
            Student = Student.map(function(item) {
                if (item.id === studentId) {
                    return newStudent;
                }
            
                return item;
            });

            student.students = Student;
            res.send(newStudent);

            fs.writeFile('./students.json', JSON.stringify(student), function (error, data) {
                if(!error) {
                    console.log("DONE");
                } 
            })
        // } else {

        // }
        
    });
    
    //DELETE
    router.delete('/students/:id', function (req, res) {
        const studentId = req.params.id;

        Student = Student.filter(function(item) {
            return item.id !== studentId;
        });
    
        student.students = Student;
        res.send(student);

        fs.writeFile('./students.json', JSON.stringify(student), function (error, data) {
            if(!error) {
                console.log("DONE");
            } 
        })
    });
})

app.use(express.json());
app.use(router);

app.listen(3000)