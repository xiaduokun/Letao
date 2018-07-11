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
})