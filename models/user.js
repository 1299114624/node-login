const mongoose = require('mongoose');

//创建用户的数据库表格
const schema = mongoose.Schema({
    username:String,
    password:String
})

//创建操作数据库表格的模型
const User = mongoose.model('user',schema);

//module.exports = {};
//是否存在该用户名的用户
module.exports.isExistUserByName = function(username){
    
    return new Promise((resolve,reject)=>{
        //查询数据库
        User.findOne({username}).then((result)=>{
            if(result){
                //存在
                reject();
            }else{
                //不存在
                resolve();
            }
        })
    })
}
//新增用户数据到数据库中
module.exports.saveUserInfo = function(username,password){
    return new Promise((resolve,reject)=>{
        let userInfo = new User({
            username,
            password
        });
        userInfo.save((error,newInfo)=>{
            if(error){
                //保存数据失败
                reject();
            }else{
                //保存成功,注册成功
                resolve();
            }
        })
    })
}
//login判断用户密码是否存在
module.exports.isCorrectPassword= function(username,password){
    return new Promise((resolve,reject)=>{
        //查询数据库
        User.findOne({username,password},(error,result)=>{
            if(!error && result){
                //存在
                resolve(result._id);
            }else{
                //不存在
                reject();
            }
        })
    })
}

//查询是否存在该ID
module.exports.isExistUserByID = function(id){
    return new Promise((resolve,reject)=>{
        User.findById(id,(error,result)=>{
            if(!error && result){
                //存在该id的用户
                resolve(result)
            }else{
                //不存在
                reject()
            }
        })
    })
}