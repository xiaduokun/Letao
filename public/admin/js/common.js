



$(document).ajaxStart(function() {
    NProgress.start();
});

$(document).ajaxStart(function() {

    // 因为我们的后台接口是本地的, 所以数据瞬间就取回来了, 所以速度很快, 为了能更明显的看到这个进度条,使用定时器耽误一下
    setTimeout(function() {}, 2000);
    NProgress.done();
});

// 左边栏的二级菜单的显示与隐藏
$(".second").prev().on('click', function() {
    $(this).next().slideToggle();
})

// 侧边栏的显示与隐藏
$(".icon-menu").on('click', function() {
    $(".lt_aside").toggleClass("active");
    $("body").toggleClass("active");
})

// 模态框的显示与隐藏
// 1. 给退出图标注册点击事件
$(".icon-logout").on("click", function() {
    $("#logoutModal").modal("show");
})
// 2. 给退出按钮注册点击事件
$(".btn_logout").on('click', function() {
    // 先发送ajax请求,告诉服务器我要退出, 服务器告诉你退出成功了, 再跳转到loginin页面
    $.ajax({
        type: "get",
        url: "/employee/employeeLogout",
        success: function(info) {
            if(info.success) {
                location.href="login.html";
            }
        }
    });

    // 这个写法和上面的写法是等价的
    // $.get("/employee/employeeLogout", function(info) {
    //     console.log(info);
    // });
})