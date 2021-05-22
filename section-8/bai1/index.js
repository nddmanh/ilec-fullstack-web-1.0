var fs = require ('fs');

function readFile(path) {
    fs.readFile( path, 'utf8', function (error, data) {
        if(error) {
            throw error;
        }
        console.log(data);
    })
}

readFile(process.argv[2]);

// cách chạy: node index.js ./note.txt