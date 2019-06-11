var express = require("express");
var app=express();
var bodyParser = require('body-parser');
var request = require("request");

var MongoClient = require("mongodb").MongoClient
var ObjectId = require("mongodb").ObjectID
var url = "mongodb://127.0.0.1:27017"

app.use(bodyParser.json());

/*
app.get("/", (req, res)=>{
    var name=req.query.name, age=req.query.age;
    res.send("Hello, "+name+ "<br>" +"Вам "+age + " лет");
})

app.get("/qwe", (req,res)=>{
    res.json ({A:123, b:654, c:"qwer"})
})*/
//Задание с массивом на 10 каждый умножить 
/*app.get("/", (req, res)=>{
    var a=parseInt(req.query.a, 10), b=parseInt(req.query.b, 10);
    var arrD=[];
    var result=[];
    if (a>=b) {res.send("Введите a меньшее, чем b")}
    else {
        for (var i=0; a+i<=b; i++){
            arrD[i]=a+i;
            for (var j=0; j<10; j++){
            result[j]=arrD[i]*(j+1);
            console.log(result[j]);
            }
        }
      
    }
    
})*/
/*app.get("/user", (req, res)=>{
    var UI=req.query.UI;

    var options = {
      method: 'GET',
      url: 'https://frilancebackend.herokuapp.com/all_users',
      //qs: {a: '3', b: '5'}
    };
    var neededUser;

    request(options, function (error, response, body) {
      if (error) throw error;
      var json=JSON.parse(body);
      var out = [];
      for (var i=0; i<json.length; i++){
        if (json[i].first_name==UI){
            out.push(json[i])
             
      }
    }   
    res.send(out.length!=0 ? out : "No users");
    
    });
    })*/
/*app.post("/", (req,res)=>{
    var a=req.body.a, b=req.body.b;
    var arr1=[];
    var arr3=[];
    var row=[];
    var main = "<table border='1' style='text-align: center'>"

    if (a>=b) {res.send("Введите а меньшее, чем b")}
    else {
        i=0;
        for (;a<=b;a++) {
            main+="<td>"
            for (var j=1;j<=10;j++){
                main+="<td>"+(a*j)+"<td>";
                
            }
            row[i]=arr1;
            main += "</table>";
            arr1=[];
        }
    }
    res.send(main);
})*/
/*
 function check() {
     myvar = 5;
     console.log ("log from the function: myVar= "+ myvar);
 }
check();
console.log("Print out of the function: myVar= " + myvar);
*/

/*app.post('/new', (req,res)=> {
    console.log(req.body);
    res.json({type:"ok"})
})
*/

/*
function checkMyObj (checkProp) {
    if (myObj[checkProp]!=undefined){
        return checkProp + " : " +myObj[checkProp];
    }
    else {
        return "Not Found";
    }
}
    console.log(checkMyObj("123"));
*/


app.listen(1337, () => {
    console.log("Server listening on port 1337")
})
/*const testarr= [1,2,3,4.5,5,6.4,-7,5,6];

const testFun = (arr3) => arr3.filter(ark => Number.isInteger(ark)&& ark>0).map(arn => arn*3)
console.log(testFun(testarr));

const testFun2 = (x, y=1) => {
    const sum=x+y;
    return sum;
}
console.log("2+3= "+testFun2(2,3));
console.log("2+1= "+testFun2(2));

const arSum = (function() {
    return function arSum(...args) {
        //const args = [x,y,z];
        return args.reduce((a,b)=>a+b,0);
    }
})
();
console.log("arSum= "+arSum(1,2,3,4));*/

//домашка по музыке

app.get("/music", (req, res)=>{
    var sTrack=req.query.sTrack;

    var options = {
      method: 'GET',
      url: 'https://apexradiobackend.herokuapp.com/get',
      qs: {'': ['', '']}
    };
    
    request(options, function (error, response, body) {
      if (error) throw error;
      var allMusic=JSON.parse(body);
      var tracks = [];
      for (var i=0; i<allMusic.length; i++){
         // for (var j=0; j<allMusic[i].name.split(" ").length;j++){
            if (allMusic[i].name.indexOf(sTrack)!=-1){
                tracks.push(allMusic[i]);
                
          }
        // }         
      }
      res.send(tracks.length!=0 ? tracks : "Not found");
    });
    })

app.get("/reg", (req,res)=>{
    MongoClient.connect(url,(err,db)=>{
        if (err) throw err;
        var dbo = db.db("lesson")
        dbo.collection("users").findOne({login: req.query.login},(err,check)=> {
            if (err) throw err;
            if (!check){
                var obj={
                    login:req.query.login,
                    password: req.query.password
                }
                dbo.collection("users").insertOne(obj,(err, result)=>{
                    if (err) throw err;
                    if (result){
                        res.json({type: "ok"})
                    }else{
                        res.json({type: "server_err"})
                    }
                })

            }else{
                res.json({type: "just_used"})
            }
        })
    })
})

app.get("/log", (req,res)=>{
    MongoClient.connect(url,(err,db)=>{
        if (err) throw err;
        var dbo = db.db("lesson")
        dbo.collection("users").findOne({login: req.query.login, password: req.query.password},(err,check)=> {
            if (err) throw err;
            if (!check){
                res.json({type:"Not right"})
                    }else{
                        res.json({type: "ok", user: check})
                    }
                })
      
        
    })
})

app.get("/change", (req,res)=>{
    MongoClient.connect(url,(err,db)=>{
        if (err) throw err;
        var dbo = db.db("lesson")
        dbo.collection("users").updateOne({login: req.query.login, password: req.query.password},{$set: {password: req.query.new_password}},(err,check)=> {
            if (err) throw err;
            if (!check){
                res.json({type:"Not right"})
                    }else{
                        res.json({type: "ok", user: check})
                    }
                })
      
        
    })
})