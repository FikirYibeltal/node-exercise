const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

let app=express();

hbs.registerPartials(__dirname+ '/views/partial');
app.set('view engine','hbs');
app.use(express.static(__dirname+ '/public'));
hbs.registerHelper('getCurrentyear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('capitalize',(text)=>{
    return text.toUpperCase();
});
app.use((req,res,next)=>{
    let now=new Date().toString();
    let logFile=`${now} : ${req.method} ${req.url}`;
    console.log(logFile);
    fs.appendFileSync('file.log',logFile+'\n');
    next();
});
app.use((req,res,next)=>{
    res.render('maintenance.hbs');
});
app.get('/',(req,res)=>{
    //res.send('<h1>hello express</h1>');
    // res.send({
    //     name:'fikir',
    //     like:[
    //         'sleeping',
    //         'eating'
    //     ]
    // })
    res.render('home.hbs',{
        title:'about page',
        welcome:'welcome to the home page'
    });
});
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        title:'about page'
    });
});
app.listen(3002,()=>{
    console.log('server is running on port 3002');
});