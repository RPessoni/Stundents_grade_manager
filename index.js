import http, { request } from 'http'
import {v4} from 'uuid'
const port = 3000
const grades = [
    {
            studentName:"Rafael",
            subject:"Englis",
            grade:"8",
    },   
];
const serve = http.createServer((request,response) => {
//funções de backend
    const {method,url} = request
    let body = '';
    request.on('data', chuck =>{
        body += chuck.toString();
    })
    request.on('end',()=>{
        if(url ==='/grades' &&  method === 'GET'){
            response.writeHead(200,{'content-type': 'application/jason'});
            response.end(JSON.stringify(grades));
    
        }else if( url ==="/grades" && method ==="POST"){
          const { studentName, subject, grade}  = JSON.parse(body);
          const newGrade = {id: v4(), studentName,subject,grade};
          grades.push(newGrade);
          response.writeHead(201,{'content-type': 'application/jason'})
          response.end(JSON.stringify(newGrade));
        }else{
            response.writeHead(4004,{'content-type': 'application/jason'})
            response.end(JSON.stringify({message:'Route not founf'}))
        }
    })
    
})

serve.listen(port,()=>{
     console.log(`Server Running on port ${port}`);
})