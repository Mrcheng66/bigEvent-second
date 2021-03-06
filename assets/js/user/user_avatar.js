$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  //选中图片
  $('#chooseImg').on('click', function () {
    $('#fileImg').click()
  })
  //表单发生改变是触发事件
  $('#fileImg').on('change', function (e) {
    var file = e.target.files[0];
    var newImgURL = URL.createObjectURL(file)
    //插件功能项
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', newImgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })

  //更新图片的功能
  $('#btnUploadAvatar').on('click', function () {
    //将图片转换为base64位字符串
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    console.log(dataURL);
      //发送请求
    $.ajax({
      type: 'post',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL
      },
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message)
        }
        layui.layer.msg('更换头像成功')
        //使用父window上的更新头像的函数
        window.parent.getUserinfo()
      }
    })
  })
})