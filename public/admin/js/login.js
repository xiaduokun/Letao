// 页面入口函数
$(function () {

    // 1. 表单校验 bootstarpValidator这个插件对表单有要求
    // 这个表单必须要有submit按钮, bootstarpValidator这个插件会在表单提交的时候做表单校验
    // 如果验证失败了, 阻止表单提交, 显示错误信息

    // 获取表单元素, 调用bootstarpValidator()这个方法, 传入一个对象
    $("form").bootstrapValidator({
        // 根据表单中的name属性, 配置校验规则
        fields: {
            // username的校验规则
            username: {
                // validators这对象里面写关于username的所有的校验规则,
                // 这些校验规则是bootstrapValidator这个插件中规定好的, 不能自定义
                validators: {
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    stringLength: {
                        min: 3,
                        max: 6,
                        message: "用户名长度必须是3-6位"
                    },
                    
                    // 在使用$("form").data("bootstrapValidator").updateStatus()中只传前两个参数的时候,
                    // 会将这个字段的所有的校验规则显示出来, 但是callback这个校验规则不会出现
                    callback: {
                        message: "用户名不存在"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空"
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "密码长度必须是6-12位"
                    },
                    callback: {
                        message: "密码错误"
                    }
                }
            }
        },
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-thumbs-up',
            invalid: 'glyphicon glyphicon-thumbs-down',
            validating: 'glyphicon glyphicon-refresh'
        },
    })


    // 2.给表单注册校验成功事件
    $("form").on("success.form.bv", function(e) {
        // 添加这个阻止我们点击submit按钮时页面的跳转
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: $("form").serialize(),
            success: function(info) {
                if(info.error === 1000) {
                    $("form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                }else if(info.error === 1001) {
                    $("form").data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                }
                if(info.success) {
                    location.href = "./index.html";
                }
            }
        })
    })


    // 3. 给重置按钮注册点击事件
    $("[type='reset']").on("click", function() {
        $("form").data("bootstrapValidator").resetForm(true);
    })
})