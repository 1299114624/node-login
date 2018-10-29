const express = require('express');
const Cookies = require('cookies');
const user = require('../models/user');

const router = express.Router();

//请求首页
router.get('/',(req,res)=>{
    //判断用户是否登录,从cookies取id
    let cookies = new Cookies(req,res);
    let id = cookies.get('USERID');
    if(id){
        //查询数据库是否存在该账号
        user.isExistUserByID(id)
        .then((result)=>{
            //登陆了
            res.render('index',{
                user:result.username
            });
        })
        .catch(()=>{
            //id是伪造的
            res.redirect('/login');
        })
    }
    else{
        //没有登录,跳转登录
        res.redirect('/login');
    }
})

//请求注册页面
router.get('/register',(req,res)=>{
    res.render('register');
})

//请求登陆页面
router.get('/login',(req,res)=>{
    res.render('login');
})

//响应退出页面
router.get('/logout',(req,res)=>{
    let cookies = new Cookies(req,res);
    //清除cookies,退出
    cookies.set('USERID',null);
    //跳转到登陆页面
    res.redirect('/login');
})

module.exports = router;