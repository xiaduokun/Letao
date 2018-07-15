
mui('.mui-scroll-wrapper').scroll({
  // 不显示滚动条
    indicators:false
});

//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
});

