const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // // check the url 
    // if(req.url === '/'){
    //     //read the index file inside our public folder
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'),
    //     (err, content)=> {
    //         // check for error
    //         if (err) throw err;
    //         // write status + content type to headers
    //         res.writeHead(200, { 'Content-Type': 'Text/html'})
    //         // upload the contexts of index.html
    //         res.end(content);
    //     })
        
    // }

    // if(req.url === '/api/users'){
    //     const users = [
    //         { name: 'Bob Smith', age: 40},
    //         { name: 'John Doe', age: 30}
    //     ];
    //     res.writeHead(200, { 'Content-Type': 'application/json'});
    //     res.end(JSON.stringify(users));

        
    // }



    // Build File path 
    let filepath = path.join(__dirname, 'public', req.url === '/' ? 
    'index.html' : req.url);


    // Extension of the file 
    let extname = path.extname(filepath);

    // Initial content type 
    let contentType = 'text/html';

    // Check ext and set content type 
    switch(extname) {
        case'.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
             break;
             
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }


    // Read File 
    fs.readFile(filepath, (err, content) => {
        if(err){
            // if not found, load the 404 file
            if(err.code == 'ENOENT'){
                // page is not found
                fs.readFile(path.join(__dirname, 
                    'public', '404.html'), 
                    (err, content) => {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(content, 'utf8');

                })

            }
            else {
                // Some server error 
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        }
        else{
            // Success
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf8');

        }
    })





});

const PORT = process.env.PORT || 8000; 

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));