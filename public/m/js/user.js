

$(function() {
    $.ajax({
        type: "get",
        url: "/user/queryUserMessage",
        success: function(info) {
            console.log(info);

            if(info.error) {
                location.href = "login.html";
            }

            // 注意不要使用info.success 因为info中没有success!!!
            $(".userinfo").html(template("tpl", info));

        }
    })

    // 给.btn-logout注册点击事件
    $(".btn-logout").on("click", function() {
        $.ajax({
            type: "get",
            url: "/user/logout",
            success: function(info) {
                console.log(info);
                if(info.success) {
                    location.href="login.html";
                }
            }
        })
    })
})