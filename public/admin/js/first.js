

// 入口函数
$(function() {

    // 定义全局变量
    var page = 1;
    var pageSize = 5;
    // 1. 页面一加载就初始化渲染一次
    render();

    $(".btn_add").on("click", function() {
        $("#addModal").modal("show");
    })

    // 2. 表单校验
    $("form").bootstrapValidator({
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: "一级分类的名称不能为空"
                    }
                }
            }
        },
         //指定校验时的图标显示，默认是bootstrap风格
         feedbackIcons: {
            valid: 'glyphicon glyphicon-thumbs-up',
            invalid: 'glyphicon glyphicon-thumbs-down',
            validating: 'glyphicon glyphicon-refresh'
        }
    })

    // 3. 表单校验成功事件， 阻止表单默认提交， 改用ajax提交
    $("form").on("success.form.bv", function(e) {
        e.preventDefault();

        // 发送ajax
        $.ajax({
            type: "post",
            url: "/category/addTopCategory",
            // data: {
            //     categoryName: categoryName
            // }, 这样写还需要事先获取categoryName的值
            data: $("form").serialize(),
            success: function(info) {
                console.log(info);
                $("#addModal").modal("hide");
                render();
                $("form").data("bootstrapValidator").resetForm(true);
            }
        })
    })



function render() {
    $.ajax({
        type: "get",
        url: "/category/queryTopCategoryPaging",
        data: {
            page:page,
            pageSize: pageSize
        }, 
        success: function(info) {
            console.log(info);
            var html = template("tpl2", info);
            $("tbody").html(html);
    
            // 分页
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
    })
}


})