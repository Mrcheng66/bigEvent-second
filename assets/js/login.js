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
    console.log(form);
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
                    return alert(res.message)
                }
                alert(res.message)
            }
        })
    })
   
})