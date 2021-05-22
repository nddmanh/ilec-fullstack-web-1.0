var fs = require('fs');

// fs.readFile('./student.json', 'utf8', function (error, data) {
//     if(error) {
//         throw error;
//     } 

//     let student = JSON.parse(data) ;
//     student.name = "Duc Manh";

//     fs.writeFile('./student2.json', JSON.stringify(student), function (error, data) {
//         if(!error) {
//             console.log("DONE");
//         } 
//     })
// })

fs.readFile('./input.txt', 'utf8', function (error, data) {
    if(error) {
        throw error;
    } 

    // let input = JSON.parse(data) ;
    
    console.log(data);

    // fs.writeFile('./output.txt', JSON.stringify(input), function (error, data) {
    //     if(!error) {
    //         console.log("DONE");
    //     } 
    // })
})

// var data = fs.readFileSync('./note.txt', 'utf-8');
// console.log(data);
// console.log('DONE!!');