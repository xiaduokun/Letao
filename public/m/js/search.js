$(function() {


    // 功能一 列表渲染功能 
    // 1. 获取localStorage中的数据, 转换为数组
    // 2. 结合模板引擎, 动态地渲染数据
    // 3. 列表渲染功能也许呀封装, 因为我们后面每次删除数据, 添加数据都要重新渲染  
          //但是这个封装的函数只针对于此页面的这个列表有效,因为函数里的东西都是写死的
    render();


    function render() {
        var arr = getHistory();
        $(".lt_history").html(template("tpl", {list: arr}));
    }

    // 获取数据的操作需要封装
    function getHistory() {
        // 如果没有历史记录, 就返回一个空数组, 不然的话会返回一个null, 如果我们对null使用数组的方法就会报错!
        var result = JSON.parse(localStorage.getItem("xdk")) || [];
        return result;
    }



    // 功能二 清空历史记录
    // 1. 给.btn-empty注册点击事件(事件委托)
    // 2. 清空localStorage中的特定数据
    // 重新渲染历史记录列表
    $(".lt_history").on("click",".btn-empty", function() {

        // mui确认框
        mui.confirm("确认清除所有历史记录吗","温馨提示", ["否", "是"], function(e) {
            if(e.index == 1) {
                localStorage.removeItem("xdk");
                render();
            }
        })
        
    })



    // 功能三 删除某条历史记录
    // 1. 给.mui-icon-closeempty注册点击事件(事件委托)
    // 2. 获取要删除记录的index
    // 3. 获取要删除数组项的数组
    // 4. 删除数组中的对应index的数据
    // 5. 更新数组
    $(".lt_history").on("click",".mui-icon-closeempty", function() {
        // 因为mui确认框中的this会不会指向我们原来没写确认框时this指向的数据,
        // 因为确认框中的this的指向是确认框中的这个回调函数来决定的    
        var that = this;
        // mui确认框
        mui.confirm("确认清除所有历史记录吗","温馨提示", ["否", "是"], function(e) {
            // console.log(e); 
            if(e.index == 1 ) {
                var index = $(that).data("index");
                var arr = getHistory();
                // splice会改变原数组          !!!!!
                arr.splice(index, 1);
                localStorage.setItem("xdk", JSON.stringify(arr));

                render();
            }
        } )

        
    })



    // 功能四 增加功能
    // 1. 给搜索btn注册点击事件
    // 2. 获取搜索input框的value值, 内容为空,直接return
    // 3. 获取到历史记录的数组
    // 4. 判断数组中有没有input.value的值,有就将旧的value值从数组中删去,将重新添加
    // 5. 判断数组的长度是不是大于9, 大于九就将最后一项删除
    // 6. 重新将数组存储到localStorage中
    // 7. 重新渲染
    $(".lt_search button").on("click", function() {
        var val = $(".lt_search input").val().trim();
        if(val == "") {
            // mui提示框
            mui.toast("搜索内容不能为空");
            return;
        }
        var arr = getHistory();
        if(arr.indexOf(val)==-1) {
            if(arr.length > 9) {
                arr.pop();
                arr.unshift(val);
            }else {
                arr.unshift(val);                
            }
        }else {
            arr.splice(arr.indexOf(val), 1);
            arr.unshift(val);                           
        }

        localStorage.setItem("xdk", JSON.stringify(arr));
        render();

        // 在search.html页面点击搜索按钮要跳转到商品列表页面并且拼接着参数,
        //  参数名使我们规定的叫key, 参数值就是input.value
        location.href="searchList.html?key="+val;

    })



})