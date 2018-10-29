const express = require('express');
const bodyParser = require('body-parser');
const user = require('../models/user');
const Cookies = require('cookies');


const router = express.Router();

router.use(bodyParser.urlencoded({extended:false}));

//注册ajax请求
router.post('/register',(req,res)=>{
    //取得请求参数
    let {username,password} = req.body;
    console.log('接收的请求参数为: ');
    console.log(req.body);
    //判断该用户是否存在
    user.isExistUserByName(username)
    .then(()=>{
        //存在,响应客户端,该用户已存在
        user.saveUserInfo(username,password).then(()=>{
            //注册成功
            res.json({
                status:0,
                msg:'注册成功'
            })
        })
        .catch(()=>{
            //注册失败
            res.json({
                status: 1,
                msg: '注册失败，数据库错误'
            })
        })
    })
    .catch(()=>{
        //不存在,将数据保存到数据库中,完成注册,响应客户端
        res.json({
            status: 2,
            msg: '该用户名已存在'
        })
    });
})

//登陆ajax请求
router.post("/login",(req,res)=>{
    //取得请求参数
    let {username,password} = req.body;
    //查询是否存在用户且密码正确
    user.isCorrectPassword(username,password)
    //响应客户端
    .then((id)=>{
        //保存登陆成功状态在客户端中
        let cookies = new Cookies(req,res);
        //用户ID+加密
        cookies.set('USERID',id)
        //响应客户端
        res.json({
            status:0,
            msg:'登陆成功'
        })
    })
    .catch(()=>{
        res.json({
            status:1,
            msg:'登陆失败,账户或密码错误'
        })
    })
    
})

module.exports = router;