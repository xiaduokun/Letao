// 入口函数
$(function() {

    // 定义全局变量
    var page = 1;
    var pageSize = 5;
    // 1. 页面一加载就初始化渲染一次
    render();


    // 2. 点击添加分类按钮，
    $(".btn_add").on("click", function() {
        // 2.1  显示模态框
        $("#addModal").modal("show");

        // 2.2 发送ajax请求， 从后台获取一级分类数据
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            // 这里的参数值是写死的， 权宜之计， 亮点！
            // 因为没有专门返回出一级分类中所有数据的接口， 所以我们把查询一级分类的接口拿过来用， 改造了一下
            // 查询第一页，一页最多显示100条数据
            data: {
                page: 1,
                pageSize: 100
            },
            success: function(info) {
                // console.log(info);
                var html = template("tpl", info);
                $(".dropdown-menu").html(html);
            }
        })
    })

    // 3. 点击哪个ul中动态生成的li,那么就将这个li中的a中的categoryId存储在name="categoryId"这个hidden input中,并且让ul显示这个li的文本
    $(".dropdown-menu").on("click", "a", function() {
        $(".categoryId").val($(this).data("id"));
        $(".dropdown-text").text($(this).text());

        // 5.2 修改category的校验状态,注意updateStatus中不是写类选择器,是校验字段
        $("form").data("bootstrapValidator").updateStatus("categoryId", "VALID");
    })

    // 4. 图片上传
        // 4.1 引包
        // 4.2 给input:file指定name="fileupload" data-url上传图片的路径 multiple
        // 4.3 调用fileupload方法  -->然后我们选择一张图片之后, 什么都不用做.通过network就可以看到自动有ajax请求发出了
        // 具体到这个项目中就是因为我们电脑本身就是服务器, 我们可以在upload文件夹中看到我们刚上传的图片
    // 这个插件的作用即使一个, 就是在我们通过input:file选中一张图片之后, 自动帮助我们发送ajax请求
    $("#fileupload").fileupload({
        //dataType:"json",//这个可以不写
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        // done这个回调函数在上传结束之后执行
        done:function (e, data) {
            // console.log(data.result);
            // 获取图片地址,
            // 显示图片
            $(".show-pic").attr("src", data.result.picAddr);
            //将图片地址给隐藏的表单.brandLogo
            $(".brandLogo").val(data.result.picAddr);

            // 5.2 修改brandLogo的校验状态,让校验通过
            $("form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    });

    // 5. 表单校验
    $("form").bootstrapValidator({
        // 指定不校验类型, 默认为excluded:[":disabled",":hidden" not(:"visiable")]
        excluded: [],
        fields: {
            brandName: {
                validators: {
                    notEmpty: {
                        message: "二级分类的名称不能为空"
                    }
                }
            },
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类名称"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传品牌图片"
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

    // 6. 表单校验成功事件， 阻止表单默认提交， 改用ajax提交
    $("form").on("success.form.bv", function(e) {
        e.preventDefault();

        // 发送ajax
        $.ajax({
            type: "post",
            url: "/category/addSecondCategory",
            // data: {
            //     categoryName: categoryName
            // }, 这样写还需要事先获取categoryName的值
            data: $("form").serialize(),
            success: function(info) {
                console.log(info);
                if(info.success) {
                    $("#addModal").modal("hide");
                    page=1;
                    render();
                    $("form").data("bootstrapValidator").resetForm(true);

                    $(".dropdown-text").text("请选择一级分类");
                    $(".show-pic").attr("src", "images/none.png");
                
                }
            }
        })
    })



function render() {
    $.ajax({
        type: "get",
        url: "/category/querySecondCategoryPaging",
        data: {
            page:page,
            pageSize: pageSize
        }, 
        success: function(info) {
            console.log(info);
            var html = template("tpl3", info);
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