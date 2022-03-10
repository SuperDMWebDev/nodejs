const os=require('os');
const path=require('path');
const math=require('./math.js');
const fs=require('fs');
const fsPromises=require('fs').promises;

// console.log('Hello world');
// console.log(os.type());
// console.log(os.version());
// console.log(os.homedir());

// console.log(__dirname);
// console.log(__filename);
// console.log(path.basename(__filename));
// console.log(path.dirname(__filename));
// console.log(path.extname(__filename));


// console.log(path.parse(__filename));
// console.log(math.add(2,3));
const fileOps=async()=>{
    try{
        const data= await fsPromises.readFile(path.join(__dirname,'files','starter.txt'),'utf8');
        console.log(data);
        await fsPromises.writeFile(path.join(__dirname,'files','promiseData.txt'),data);
        await fsPromises.appendFile(path.join(__dirname,'files','promiseData.txt'),data);
    }catch(err)
    {
        console.log(err);   
    }
}
// fs.readFile(path.join(__dirname,'files','starter.txt'),'utf8', (err,data)=>{
//     if(err) throw err;
//     console.log(data);
// })
// fs.writeFile(path.join(__dirname,'files','reply.txt'),'Nice yo meet you',(err)=>{
//     if(err) throw err;
//     console.log('Write complete');
// })
fileOps();
process.on('uncaughtException',err=>{
    console.log(err);
    process.exit(1);
})