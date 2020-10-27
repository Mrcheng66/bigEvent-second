$(function () {
    // console.log('hello');
    $('#toLoad').on('click',function () {
        $('.form_login').show()
        $('.form_reg').hide()
    })
    $('#toReg').on('click',function () {
        $('.form_login').hide()
        $('.form_reg').show()
    })
    // 表单验证
    var form = layui.form
    var layer = layui.layer
    // console.log(form);
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        repwd: function(value) {
            var val = $('.form_reg input[name=password]').val()
            if(value !== val) {
                return "请保持两次密码一致"
            }
        }
    })
    //注册表单信息
    $('#regForm').on('submit',function(e) {
        e.preventDefault()
        var data = $(this).serialize()
        //发送ajax请求
        $.ajax({
            type:'post',
            url:'http://ajax.frontend.itheima.net/api/reguser',
            data:data,
            success:function (res) {
                console.log(res);
                if(res.status !== 0) {
                    return  layer.msg('注册失败')
                }
                layer.msg('注册成功,请登录')
                //清空注册表单数据,并跳转到登录页面
                $('#regForm')[0].reset()
                $('#toLoad').click()
            }
        })
    })
   //登录表单信息
   $('#loginForm').on('submit',function (e) {
       e.preventDefault()
        var data = $(this).serialize()
        $.ajax({
            url:'http://ajax.frontend.itheima.net/api/login',
            type:'post',
            data:data,
            success:function (res) {
                // console.log(res);
                // 通过接口文档得到访问后台后 需要res中的token 所以讲其中的值存储下来
                if(res.status !==0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                localStorage.setItem('token',res.token);
                location.href='/index.html';
            }
        })
   })
})