    let students = [
        {
            "name":"Nguyễn Đức Mạnh",
            "id": "101",
            "phone": "0789307845",
            "class":"12A"
        },
        {
            "name":"Nguyễn Ngọc Ngạn",
            "id": "102",
            "phone": "0123456789",
            "class": "12B"
        },
        {
            "name":"Trần Tấn Lực",
            "id": "103",
            "phone": "0987654321",
            "class": "12B"
        },
        {
            "name":"Nguyễn Đức Nam",
            "id": "104",
            "phone": "06789101112",
            "class": "12A"
        },
        {
            "name":"Lê Hữu Thăng Long",
            "id": "105",
            "phone": "045678191113",
            "class": "12A"
        }
    ];

    let btnSearchById = document.getElementById("btnSearchById");
    let btnEditById = document.getElementById("btnEditById");
    let btnDeleteById = document.getElementById("btnDeleteById");
    let btnUpdate = document.getElementById("btnUpdate");
    let btnCreateStudent = document.getElementById("btnCreateStudent");
    let btnCreate = document.getElementById("btnCreate");

    let inputGet = document.getElementById("inputGet");
    let updateId = document.getElementById("updateId");
    let updateName = document.getElementById("updateName");
    let updatePhone = document.getElementById("updatePhone");
    let updateClass = document.getElementById("updateClass");

    let appear = document.getElementById("appear");
    let formUpdate = document.getElementById("form-update");
    let noti = document.getElementById("noti");
    let headLine = document.getElementById("headLine");
    let downLine = document.getElementById("downLine");
    let inputId = document.getElementById("input-id");

    //Check Unique By Id
    function checkUniqueById(id) {
        let i = 0;
        students.forEach( student => {
            if ( id === student.id) {
                i = i + 1;
            } 
        });
        if (i === 0) {
            return 1;
        } else {
            return 0;
        }
    }

    //Create New Student
    btnCreateStudent.addEventListener("click", (e) => {
        formUpdate.classList.remove("visible");
        headLine.innerHTML = "Thông tin sinh viên mới";
        inputId.classList.remove("visible");
        btnCreate.classList.remove("visible");
        btnUpdate.classList.add("visible");
        appear.classList.remove("visible");
        downLine.classList.remove("up");
        downLine.classList.add("down");
        document.getElementById("inputGet").value = "";
    });

    //BTN Create
    btnCreate.addEventListener("click", (e) => {
        let oneStudent = { };
        if ( document.getElementById("updateId").value === "" ) {
            noti.innerHTML = " ID không được để trống"
        } else {
            if ( checkUniqueById(document.getElementById("updateId").value) === 1 ) {
                oneStudent['id'] = document.getElementById("updateId").value;
                oneStudent['name'] = document.getElementById("updateName").value;
                oneStudent['phone'] = document.getElementById("updatePhone").value;
                oneStudent['class'] = document.getElementById("updateClass").value;
                
                students.push(oneStudent);
                students.forEach(student => {
                    console.log(student);
                });
                noti.innerHTML = " Đã thêm mới sinh viên thành công"
            } else {
                noti.innerHTML = " ID bạn nhập đã bị trùng. Vui lòng nhập lai!"
            }    
        }
        
        appear.classList.remove("visible");
    });

    //Search Student By Id
    btnSearchById.addEventListener('click', (e) => {
        students.forEach(student => {
            if ( document.getElementById("inputGet").value === student.id) {
                document.getElementById("nameStudent").innerHTML = student.name, 
                document.getElementById("idStudent").innerHTML = student.id, 
                document.getElementById("phoneStudent").innerHTML = student.phone, 
                document.getElementById("classStudent").innerHTML = student.class, 

                console.log(student);
                appear.classList.remove("visible");
                noti.classList.add("visible");
            }
            else {
                noti.innerHTML= "Không có sinh viên nào có id như thế!";
            }
        });
    }); 

    //Button Edit
    btnEditById.addEventListener('click', (e) => {
        downLine.classList.add("up");
        downLine.classList.remove("down");
        formUpdate.classList.remove("visible");
        inputId.classList.add("visible");
        btnCreate.classList.add("visible");
        btnUpdate.classList.remove("visible");
        headLine.innerHTML = "Cập nhật thông tin sinh viên";

        students.forEach(student => {
            if ( document.getElementById("idStudent").innerHTML === student.id) {
                document.getElementById("updateName").value = student.name;
                document.getElementById("updatePhone").value = student.phone;
                document.getElementById("updateClass").value = student.class;

                appear.classList.remove("visible");
            }
        });
    });

    //Edit Student By Id
    btnUpdate.addEventListener('click', (e) => {
        students.forEach(student => {
            if ( document.getElementById("inputGet").value === student.id) {
                student['name'] = document.getElementById("updateName").value;
                student['phone'] = document.getElementById("updatePhone").value;
                student['class'] = document.getElementById("updateClass").value;
            }
        });
        inputId.classList.add("visible");
        noti.classList.remove("visible");
        noti.innerHTML= "Đã cập nhật thành công";
    });

    //Delete Student By Id
    btnDeleteById.addEventListener('click', (e) => {
        let index = students.forEach(student => {
            if ( document.getElementById("idStudent").innerHTML === student.id) {
                let i = ( students.indexOf(student) ) ;
                return i;    
            }
            console.log(student);
        });
        delete students[index];
    
        appear.classList.add("visible");
        formUpdate.classList.add("visible");
        noti.classList.remove("visible");
        noti.innerHTML= "Đã xóa thành công";
    });