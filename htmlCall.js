
// modüller tanımlanır
var http            = require("http");
var fs              = require('fs');
var qs              = require('querystring');
var StringDecoder   = require('string_decoder');
const path          = require("path")

const pathToPrefix = path.resolve(__dirname, "./index.html");



//server oluşturulur
var server      = http.createServer((req,res)=>{
    //oluşturulan server içerisine aktifleşecek kodlar yazılır
    // url server içerisindeki dizin
    // method form oluşturulurken istenilen yöntemle çağırmak için değişken içerisine çağrılır
    const url   = req.url;
    const method= req.method;
    // istek üzerine çalışacak olan kodların tip ve yazılacak değerler belirtilir.
    res.setHeader('Content-Type', 'text/html');
    if(req.url === '/'){
        
        fs.readFile(pathToPrefix, function(error, file){
            if(error){
                res.setHeader('Content-Type','text/plain');
                res.statusCode      = 404;
                res.statusMessage   = "Not Found";
                return res.end("Dosya Bulunamadı");
            }else{
                res.setHeader('Content-Type','text/html');
                res.statusCode      = 200;
                res.statusMessage   = "Tamam";
                return res.end(file);
            }
        });

    //   return res.end();
    }

    // form gönderildiğinde geçersiz olmaması için ana dizine geri gönderilir.
    if(url ==='/logSend' && method ==='POST'){

        const body =[];
        req.on('data', (chunk) =>{
            body.push(chunk);
            console.log(chunk);

        });
        req.on('end', () =>{
            
            const bodyParsed   = Buffer.concat(body).toString();
            const message      = bodyParsed.split('=')[1];
            console.log(qs.parse(bodyParsed));

            const  newTitle    = "//////////////////////////////////////"
            
            fs.appendFileSync('message.txt', newTitle +'\n\n'+message+'\n\n');
        });

        res.statusCode = 302;
        res.setHeader('Location','/');
        return res.end();
    }
});

//geçerli server portu 
server.listen(3000);
console.log("port:3000 aktif");










