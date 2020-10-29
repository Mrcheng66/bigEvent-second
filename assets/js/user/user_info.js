$(function () {
    //昵称的字符限制
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间'
            }
        }
    })
})
var layer = layui.layer
var form = layui.form
initUserInfo()
function initUserInfo() {
    //用户信息渲染进表单
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            // layui.layer.msg(res.message)
            //使用layui框架将数据回填进表单
            form.val('getUserInfo', res.data)
        }
    })
}

//更新基本信息
$('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
        type: 'post',
        url: '/my/userinfo',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg(res.message)
            //这个地方属于iframe内置嵌套的html也有自己的window
            //可以通过window.parent找到index.html中的使用的全局函数
            window.parent.getUserinfo()
        }
    })
    $('.layui-form')[0].reset()
})

//重置按钮
$('#btnReset').on('click',function (e) {
    e.preventDefault()
    //调用函数重新将原数据填充进表单
    initUserInfo()
})