
//开发环境
baseUrl = 'http://ajax.frontend.itheima.net'
//测试环境
// baseUrl = 'http://ajax.frontend.itheima.net'
// ........
//在发送每个请求之前以及在$ .ajax（）处理它们之前，处理自定义Ajax选项或修改现有选项。
//可以理解为预过滤器
$.ajaxPrefilter(function (para) {
    // 这里的形参 (para)可以理解为发送请求时候发送的信息内容 

    // 拼接对应环境的服务器地址
    para.url = baseUrl + para.url;
    // console.log(para.headers);

    if(para.url.indexOf('/my/') !== -1) {
        para.headers = {
            Authorization:localStorage.getItem('token')
        }
    }
    //全局同一挂载complete 函数
    para.complete = function (res) {
        console.log(res);
        if(res.responseJSON.status ===1 && res.responseJSON.message === '身份认证失败！'){
            // 强制清空 token ,跳转到登录页
            localStorage.removeItem('token')            
            location.href='/login.html'
        }
    }
})