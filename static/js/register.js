$('#confirm').on('click',function(){

    //取得用户输入的数据
    var user = $('.user').val();
    var psd = $('.psd').val();
    var rePsd = $('.re-psd').val();

    //对数据的判断
    if(!user || !psd || !rePsd){
        alert('输入不能为空');
        return;
    }
    else if(psd !== rePsd){
        alert('两次密码不一致');
        return;
    }

    // 发送注册账号的请求
    $.ajax({
        url:'/api/register',
        data:{
            username:user,
            password:psd
        },
        method:'POST',
        success:function(data){
            console.log('注册请求成功');
            console.log(data);
            if(data.status === 0){
                //跳转到登陆
                window.location.href = '/login';
            }else{
                alert(data.msg);
            }
        },
        fail:function(error){
            console.log('请求失败');
        }
    })
})