
$(function() {
    
    // 功能一 获取地址栏上的id,发送ajax,从后台获取数据, 渲染到页面上
    var id = getSearch().id;
    // console.log(id);
    $.ajax({
        type: "get",
        url: "/product/queryProductDetail",
        data: {
            id: id
        },
        success: function(info) {
            console.log(info);
            $(".mui-scroll").html(template("tpl", info));

            // 初始化轮播图
            mui('.mui-scroll-wrapper').scroll({
                // 不显示滚动条
                indicators:false
            });

            // 获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
            });

            //初始化数字输入框
            mui(".mui-numbox").numbox();
        }
    })

    // 功能二 将商品到添加购物车
    // 1. 给proSize中的span注册点击事件(委托)
    $(".mui-scroll").on("click", ".proSize span", function() {
        // console.log(111);
        $(this).addClass("active").siblings().removeClass("active");
    })

    

    // 3. 给.cart注册点击事件,发送ajax
    $(".btn-cart").on("click", function() {
        // 0. 获取size 与 num
        var size = $(".proSize span.active").text();
        var num = $(".mui-numbox-input").val();
        // 1. 校验
        if(!size) {
            mui.toast("亲, 请选择商品尺码");
            return;
        }
        $.ajax({
            type: "post",
            url: "/cart/addCart",
            data: {
                productId: id,
                num: num,
                size: size
            },
            success: function(info) {
                console.log(info);
                if(info.error) {
                    mui.confirm("亲, 您目前仍"+info.message+"是否前往登录?", "温馨提示",["否", "是"], function(e) {
                        if(e.index==1) {
                            // 如果想跳转到登录页面之后还能回就需要多拼接一个当前地址,当做参数传到地址栏
                            location.href="login.html?retUrl="+location.href;
                            return;
                        }
                    });
                }
                
                if(info.success) {
                    mui.confirm("亲, 添加购物车成功!"+info.message+"是否前往登录?", "温馨提示",["继续浏览", "去购物车"], function(e) {
                        if(e.index ==1) {
                            location.href="cart.html";
                        }
                    });

                }

            }
        });
    })
})