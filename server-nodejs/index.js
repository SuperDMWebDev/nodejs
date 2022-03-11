const logEvents=require('./logEvents');
const http=require('http');
const path= require('path');
const fs=require('fs');
const fsPromises=require('fs').promises;
const EventEmitter=require('events');

//tra ve 1 webser va luu cac phuong thuc dang nhap vao file eventLog.txt

//Intialize object 
const myEmitter = new EventEmitter();

myEmitter.on('log',function(message){
    console.log('message'+message);
    logEvents(message);
});

const PORT=process.env.PORT||3500;
const serveFile=async(filePath,contentType,response)=>{
    console.log('vo ham');
        try{
            const rawData=await fsPromises.readFile(filePath,
                
                !contentType.includes('image')?'utf8':'');
            const data=contentType==='application/json'?JSON.parse(rawData):rawData;
            response.writeHead( filePath.includes('404.html') ? 404 : 200,{'Content-Type':contentType});
            response.end(
                contentType==='application/json'?JSON.stringify(data):data
            );
        }catch(err)
        {
            console.log(err);
        }
}
const server=http.createServer((req,res)=>{
    console.log("req.url+ req.method"+req.url+" "+req.method);
    // thuc hien cac url + method vao event log 
    myEmitter.emit('log',`${req.url}\t${req.method}`);

    const extension=path.extname(req.url);
    
    let contentType;
    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }
  
    // neu ma duong dan co dang / va duoi cuoi cua file 
    let filePath =
        contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname, 'views', req.url, 'index.html')
                : contentType === 'text/html'
                    ? path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url);
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';
    console.log(filePath);
    const fileExists = fs.existsSync(filePath);
    if (fileExists) {
        serveFile(filePath, contentType, res);
    } else {
        switch (path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, { 'Location': '/new-page.html' });
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, { 'Location': '/' });
                res.end();
                break;
            default:
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
        }
    }
})
server.listen(PORT,()=>{
    console.log(`Server running on PORT${PORT}`);
})
//Intialize object 


// setTimeout(()=>{
//     myEmitter.emit('log',1);
// },2000);

