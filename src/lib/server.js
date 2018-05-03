'use strict';

const http=require('http');
const cowsaw=require('cowsay');
const bodyParser=require('./body-parser');

const server=module.exports={};

const app=http.createServer((req,res)=>{
    bodyParser(req)
        .then((parsedRequest)=>{
        if(parsedRequest.method==='GET'&& parsedRequest.url.pathname==='/'){
            res.writeHead(200,{'Content-Type':'text/html'});
            const cowsayText=cowsay.say({text:parsedRequest.url.query.text});
            res.write(`<!DOCTYPE html>
            <html>
              <head>
                <title> cowsay </title>
              </head>
              <body>
               <header>
                 <nav>
                   <ul>
                     <li><a href="/cowsay">cowsay</a></li>
                   </ul>
                 </nav>
               <header>
               <main>
                 <!-- project description -->
               </main>
              </body>
            </html>`)
            res.end()
            return undefined;
        }
        if(parsedRequest.method==='GET'&&parsedRequest.url.pathname==='/cowsay'){
            if(req.query.text===null)
            {req.query.text=faker.fake("{{company.suffixes}}")}
            res.write(`<!DOCTYPE html>
            <html>
              <head>
                <title> cowsay </title>
              </head>
              <body>
                <h1> cowsay </h1>
                <pre>
                  <!-- ${cowsay.say(
                        {text: req.query.text,
                        e:"..",
                        T:'v'})} -->
                </pre>
              </body>
            </html>`)
            res.end();
            return undfined;
        }
        if(parsedRequest.method==='GET'&&parsedRequest.url.pathname==='/api/cowsay'){
            res.writeHead(404,{'Content-Type':'application/json'})
            res.write(JSON.stringify(`"content":"${cowsay.say({text: req.query.text,e:"..",T:'v'})}"`))
        }
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.write('NOT FOUND.');
        res.end();
        return undefined;
        })
        .catch((err) => {
            res.writeHead(400,{'Content-Type':'text/plain'});
            res.write('BAD REQUEST', err);
            res.end();
            return undefined;
        })
});
server.start=(port,callback)=>app.listen(port,callback);
server.stop