
$(function() {

    var key = getSearch().key;
    var page =1;
    var pageSize = 2;

    // 给页面追加一个下拉刷新功能
     mui.init({
        pullRefresh : {
            //下拉刷新容器标识，querySelector能定位的css选择器均可.配置成我们区域滚动的容器即可
            container:".mui-scroll-wrapper",
            down : {
            // height:50,//可选,默认50.触发下拉刷新拖动距离,
            auto: true,//可选,默认false.首次加载自动下拉刷新一次
            // contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
            // contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
            // contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
            
            //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            callback :function() {
                // console.log("hh")
                // 下拉刷新的时候永远显示的是第一页
                page=1;
                render(function(info) {
                     $(".product ul").html(template("tpl", info));

                    // 数据拿到后, 结束下拉刷新,不然下拉刷新状态会一直维持
                    mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
                    // mui(".mui-scroll-wrapper").pullRefresh().Refresh();
                });
            } 
            },
            up: {
                callback: function() {

//这里的page和down中的page是一个, 每次down中都把page设置为1,那他怎么实现查找第三页,第四页...的呢???
                    page++;  
                    render(function(info) {
                        $(".product ul").append(template("tpl", info));;

                        // 数据拿到后, 结束上拉加载,不然上拉加载状态会一直维持   
                        // info代表每次发送请求的时候返回的结果,其中的data是结果集, 如果有一次返回结果为空,这说明没有更多数据了
                        // 此时传true, 这下次再上拉的时候,就不会发送请求了
                        mui(".mui-scroll-wrapper").pullRefresh().endPullupToRefresh(info.data.length === 0);
                    });
                }
            }
        }
    });



    // 功能一 页面一加载进来渲染页面

    // 1. 封装好了一个纯前端去地址栏中的参数的函数
    function getSearch() {
        // 要求可以获取地址栏参数, 并且封装一个函数
        // 1. 使用location.search获取到地址栏参数
        var search = location.search;
        // console.log(search);

        // 2. 使用decodeURI将获取到的字符串解码
        search = decodeURI(search);
        // console.log(search);


        // 3. 使用字符串的slice方法去除?
        search = search.slice(1);
        // console.log(search);

        // 4. 使用字符串的split方法将字符串转换为数组
        var arr = search.split("&");
        // console.log(arr);

        // 5. 遍历数组,将数组转换成对象
        var obj = {};
        arr.forEach(function (item, index) {
            var k = item.split("=")[0];
            var v = item.split("=")[1];
            obj[k] = v;
        })
        // console.log(obj);

        // 6. 将获得的对象返回出去
        return obj;
    }

    // 2. 获取地址栏中的参数key, 将其写入到input, 然后发送ajax请求
    $(".lt_search input").val(key);
    render();
    
    // 将向后台发送ajax请求封装
    function render(callback) {
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
        }

        $.ajax({
            type: "get",
            url: "/product/queryProduct",
            data: obj,
            success: function(info) {
                // 假定获取数据需要一秒钟
                setTimeout(function() {
                   callback(info);
                }, 1000);
            }
        })
    }

    // 将向后台发送ajax请求封装, 这是给上拉加载准备的render
    // function render2() {
    //     var obj= {
    //         page: page,
    //         pageSize: pageSize,
    //         proName: key
    //     }
    //     // 考虑要不要给ajax传递第四个参数
    //     var $checked = $(".lt_sort li.active");
    //     if( $checked.length ==1 ){
    //         var type = $checked.data("type");
    //         var value = $checked.find(".lt_sort_icon").hasClass("fa-angle-down")?2:1;
    //         obj[type] = value;
    //         // console.log(obj);
    //     }

    //     $.ajax({
    //         type: "get",
    //         url: "/product/queryProduct",
    //         data: obj,
    //         success: function(info) {
    //             // console.log(info);
    //             // 假定获取数据需要一秒钟
    //             setTimeout(function() {
    //                 $(".product ul").append(template("tpl", info));;

    //                 // 数据拿到后, 结束上拉加载,不然上拉加载状态会一直维持   
    //                 // info代表每次发送请求的时候返回的结果,其中的data是结果集, 如果有一次返回结果为空,这说明没有更多数据了
    //                 // 此时传true, 这下次再上拉的时候,就不会发送请求了
    //                 mui(".mui-scroll-wrapper").pullRefresh().endPullupToRefresh(info.data.length === 0);              
    //             }, 1000);
    //         }
    //     })
    // }


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

