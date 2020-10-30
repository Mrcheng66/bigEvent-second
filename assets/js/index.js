$(function () {
    getUserinfo()
    //退出功能
    $('#loginOut').on('click',function () {
        // console.log('ok');
        //使用layui的弹出层组件,确认是否退出  确定时候执行这里的回调函数
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //清空本地的token 值,并跳转页面
            localStorage.removeItem('token')            
            location.href='/login.html'
            layer.close(index);
          });
    })
})
// 将渲染头像的类名作为全局函数方便调用
// 先获取用户的基本信息
function getUserinfo() {
    $.ajax({
        url:'/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token')
        // },
        success :function (res) {
            // console.log(res);
            if(res.status !== 0) {
                return  layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        },
    //    complete:function (res) {
    //         console.log(res);
    //         if(res.responseJSON.status ===1 && res.responseJSON.message === '身份认证失败！'){
    //             // 强制清空 token ,跳转到登录页
    //             localStorage.removeItem('token')            
    //             location.href='/login.html'
    //         }
    //     } 
    })
}
// 渲染头像的函数
function renderAvatar (user) {
    // 用户名 先昵称再姓名
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    // 渲染用户头像
    if(user.user_pic !== null) {
        //有头像
        $('.layui-nav-img').show().attr('src',user.user_pic)
        $('.user-avatar').hide()
    }else {
        $('.layui-nav-img').hide()
        //没有头像
        var text = name[0].toUpperCase()
        $('.user-avatar').show().html(text)
        
    }
}