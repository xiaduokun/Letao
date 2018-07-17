
$(function() {

    var key = getSearch().key;
    var page =1;
    var pageSize = 5;

    // 功能一 页面一加载进来渲染页面

    // 1. 分装好了一个纯前端去地址栏中的参数的函数
    function getSearch() {
        // 要求可以获取地址栏参数, 并且封装一个函数
        // 1. 使用location.search获取到地址栏参数
        var search = location.search;
        console.log(search);

        // 2. 使用decodeURI将获取到的字符串解码
        search = decodeURI(search);
        console.log(search);


        // 3. 使用字符串的slice方法去除?
        search = search.slice(1);
        console.log(search);

        // 4. 使用字符串的split方法将字符串转换为数组
        var arr = search.split("&");
        console.log(arr);

        // 5. 遍历数组,将数组转换成对象
        var obj = {};
        arr.forEach(function (item, index) {
            var k = item.split("=")[0];
            var v = item.split("=")[1];
            obj[k] = v;
        })
        console.log(obj);

        // 6. 将获得的对象返回出去
        return obj;
    }

    // 2. 获取地址栏中的参数key, 将其写入到input, 然后发送ajax请求
    $(".lt_search input").val(key);
    render();
    
    // 将向后台发送ajax请求封装
    function render() {
        var obj= {
            page: page,
            pageSize: pageSize,
            proName: key
        }
        // 考虑要不要给ajax传递第四个参数
        var $checked = $(".lt_sort li.active");
        if( $checked.length ==1 ){
            var type = $checked.data("type");
            var value = $checked.find(".lt_sort_icon").hasClass("fa-angle-down")?2:1;
            obj[type] = value;
            console.log(obj);
        }

        $.ajax({
            type: "get",
            url: "/product/queryProduct",
            data: obj,
            success: function(info) {
                console.log(info);

                $(".product ul").html(template("tpl", info));
            }
        })
    }


    // 功能二 点击搜索,实现页面跳转
    // 1. 给搜索按钮注册点击事件
    // 2. 将搜索框的数据拼接到地址栏, 进行页面跳转
    $(".lt_search button").on("click", function() {
        var val = $(".lt_search input").val();
        location.href = "searchList.html?key="+val; //这就是巧妙之处,跳转页面又自动一加载页面跑到功能一渲染去了
    })



    // 功能三 排序功能
    // 1.样式层面
        // 1.1 点击li, 如果没有.active, 给它加上.active, 移除其他li的.active,并把li中的箭头重置为down
        // 1.2 如果有.active, 切换li中的箭头的方向
    $(".lt_sort li[data-type]").on("click", function() {
        if( $(this).hasClass("active") ) {
            $(this).find(".lt_sort_icon").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
        }else {
            $(this).addClass("active").siblings().removeClass("active");
            $(".lt_sort_icon").removeClass("fa-angle-up").addClass("fa-angle-down");
        }
        render();
    })
})