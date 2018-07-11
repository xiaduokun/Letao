



$(document).ajaxStart(function() {
    NProgress.start();
});

$(document).ajaxStart(function() {

    // 因为我们的后台接口是本地的, 所以数据瞬间就取回来了, 所以速度很快, 为了能更明显的看到这个进度条,使用定时器耽误一下
    setTimeout(function() {}, 2000);
    NProgress.done();
})