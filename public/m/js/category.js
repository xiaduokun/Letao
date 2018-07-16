
$(function() {

    // 1. 发送ajax获取一级分类的数据，渲染到左边ul
    $.ajax({
        type: "get",
        url: "/category/queryTopCategory",
        success: function(info) {
            // console.log(info);
            $(".category_left ul").html(template("tpl", info));

            // 获取一级分类的id
            var id = info.rows[0].id;
            console.log(id);

            // 2. 根据拿到的一级分类的id发送ajax请求获取二级分类
            renderSecond(id);
        }
    })

    // 3. 给左边ul中的li注册点击事件, 在li被点击时
        // 1. 获取li的id
        // 2. 给被点击的id加active类, 排他
        // 3. 查询其下的二级分类
        // 4. 发送ajax从后台获取数据,渲染到右侧ul上
    $(".category_left ul").on("click", "li", function() {
        var id = $(this).data("id");
        $(this).addClass("active").siblings().removeClass("active");
        renderSecond(id);
    })


    // 2. 封装查询二级分类中的数据
    function renderSecond(id) {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategory",
            data: {
                id: id
            },
            success: function(info) {
                console.log(info);
                $(".category_right ul").html(template("tpl2", info));   
            }
        })
    }
    
})