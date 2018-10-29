const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const Cookies = require('cookies');

const mainRouter = require('./routers/mainRouter');
const apiRouter = require('./routers/apiRouter');

const server = express();

//处理cookies
/*
server.use((req,res,next)=>{
    let cookies= new Cookies(req,res);
    //设置cookies给response,客户端就能接收到cookies
    cookies.set('test','hello world');
    //获得cookies
    // let value = cookies.get('test');
    let value = cookies.get('name');
    console.log(value);
    next();
})
*/

//处理静态资源文件的请求
server.use('/public',express.static('./static'));

//处理ajax的请求
server.use('/api',apiRouter);

//配置模板引擎
server.set('view engine','html');
server.engine('html',ejs.__express);

//处理页面请求
server.use('/',mainRouter);


new Promise((resolve,reject)=>{
    //连接数据库
    // >mongod --dbpath=数据库数据的存放路径 --port=27016
    mongoose.connect('mongodb://localhost:27016',{useNewUrlParser:true},(error)=>{
        if(error){
            console.log('连接数据库失败');
        }else{
            console.log('连接数据库成功');
            resolve();
        }
    })
})

.then(()=>{
    //启动服务器
    server.listen(8080,'localhost',(error)=>{
        if(error){
            console.log('服务器启动失败');
        }else{
            console.log('服务器启动成功');
        }
    })
})