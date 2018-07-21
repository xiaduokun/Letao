
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
