$(function() {

    

    // 1. 点击登录按钮, 发送ajax
    $(".btn-login").on("click", function() {
        // 1. 校验
        // 注意表单的数据是每次点击登录按钮的时候才需要获取的!!!
        // 写下外面获取不到?为什么啊???如果值不变的话,点击登录按钮至少会弹出toast啊???
        // -->因为如果把校验这段代码放在外面的话, 在第一次加载页面的时候, 就会执行检验这段语句, 
        // 后面的给btn-login注册点击事件是不执行的
        var username = $(".mui-input-clear").val().trim();
        var password = $(".mui-input-password").val().trim();
        if(!username) {
            mui.toast("请输入用户名");
            return;
        }
        if(!password) {
            mui.toast("请输入密码");
            return;
        }

        $.ajax({
            type: "post",
            url: "/user/login",
            data: {
                username: username,
                password: password
            },
            success: function(info) {
                console.log(info);
                if(info.error) {
                    mui.toast(info.message);
                }
                if(info.success) {
                    var search = location.search;

                    // string.indexOf("substring" =-1) 则说明substring存在于string中
                    if(search.indexOf("?retUrl=") !=-1){
                        var retUrl = search.replace("?retUrl=", "");
                        location.href=retUrl;
                    } else {
                        location.href = "user.html";
                    }
                    
                }
            }
        })
    })
})