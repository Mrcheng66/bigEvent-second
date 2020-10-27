
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
})