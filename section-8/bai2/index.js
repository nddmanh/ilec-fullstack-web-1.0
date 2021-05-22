var fs = require ('fs');
let content = process.argv.slice(3);

function writeFile(path, content) {
    var newContent = content.join(" ");

    fs.writeFile( path, newContent, function (error, data) {
        if(!error) {
            console.log("DONE!!");
        } 
    })
}

writeFile(process.argv[2],content);

// các chạy:  node index.js text.txt This is the content of text.txt