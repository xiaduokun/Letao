$(function () {

    // 定义两个全局变量page, pageSize
    var page = 1;
    var pageSize = 5;

    // 1. 页面一加载的时候就初始化调用一下
    render();

    // 2. 给启用禁用按钮注册点击事件, 让模态框显示出来
    $("tbody").on("click", ".btn", function() {
        // console.log(111);
        $("#userModal").modal("show");
        
        // console.log(data.id)  直接这么写是拿不到自定义属性data-id的,会报错说data.id未定义
        // 这样才能获取id     !!!重要要记住!!! 这是jquery中去自定义属性的方法!
        var id = $(this).parent().data("id");
        // console.log(id);

        // 取isDelete的值, Q:如果是绿色, 那么它的isDelete的值是0, 为什么这里写1???
        var isDelete = $(this).hasClass("btn-success")?1:0;
        
        console.log(isDelete);

        // 3 给模态框中的确认按钮注册点击事件, 向后台发送数据, 更新被点击的数据,接口是update-user
    $(".btn_confirm").off().on("click", function() {
        $.ajax({
            type: "post",
            url: "/user/updateUser",
            data: {
                id: id,
                isDelete: isDelete
            },
            success: function(info) {
                // console.log(info);
                if(info.success) {
                    // 隐藏模态框
                    $("#userModal").modal("hide");
                    render();
                }         
            }
        })
    })
    }) 

    

   

    function render() {
        // user.html这个页面一加载进来就应该发送ajax请求给后台,返回后台的数据
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                // 让数据和模板进行绑定, 模板中就能直接使用info中的所有属性
                var html = template("tpl", info);
                $("tbody").html(html);


                // 分页一般都是写在ajax的success函数中的
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //指定bootstrap的版本
                    currentPage: page,
                    totalPages: Math.ceil(info.total / info.size),
                    size: "small",

                     // 页码被点击时候重新渲染   这个很巧妙啊!!!
                    onPageClicked: function (a, b, c, p) {
                        // console.log(p); 打印出来这个p就是被点击的那个页码
                        page = p;
                        render();//函数中调用函数自己
                    }
                })
            }
        });
    }






})