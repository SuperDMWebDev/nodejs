const fs=require('fs');
const rs=fs.createReadStream('./files/starter.txt',{encoding:'utf8'});
const ws=fs.createWriteStream('./files/reply1.txt',{encoding:'utf8'})
rs.on('data',(e)=>{
    ws.write(e);
})
// or use rs.pipe(ws)
// su dung existsSync de check neu 1 folder da ton tai hay chua
// vi du fs.existsSync('./new) kiem tra thu muc new da ton tai hay chua
//mkdir tao thu muc, rkdir huy thu muc 