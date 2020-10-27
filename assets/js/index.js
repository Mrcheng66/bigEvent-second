$(function () {
    getUserinfo()
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
        }
    })
}
// 渲染头像的函数
function renderAvatar (user) {
    // 用户名 先昵称再姓名
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    // 渲染用户头像
    if(user.user_pic) {
        //有头像
        $('.layui-nav-img').show().attr('scr',user.user_pic)
        $('.user-avatar').hide()
    }else {
        //没有头像
        var text = name[0].toUpperCase()
        $('.user-avatar').show().html(text)
        $('.layui-nav-img').hide()
    }
}