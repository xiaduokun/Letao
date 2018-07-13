

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('left'));

// 指定图表的配置项和数据
var option = {
    title: {
        text: '2018年注册人数'
    },
    tooltip: {},
    legend: {
        data: ['人数']//这个data是个数组, 可以传入多个数组项
    },
    xAxis: {
        data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    yAxis: {},//这一项不用配置
    // 这个series中可以传递多个数组项, 每个数组项是一个对象,
    // 代表一个图,比方说这里再追加一个对象,那么这张图中就有两组状图了
    series: [
        {
            name: '人数',
            type: 'bar',//这个是用来控制柱状图, 条形图, 饼状图的
            data: [1500, 1000, 2500, 2000, 2500, 3000]
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);


// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('right'));

// 指定图表的配置项和数据
option = {
    title: {
        text: '热门品牌销售',
        subtext: '2018年6月',
        x: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['耐克', '阿迪达斯', '李宁', '新百伦', '阿迪王']
    },
    series: [
        {
            name: '销售情况',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                { value: 335, name: '耐克' },
                { value: 310, name: '阿迪达斯' },
                { value: 234, name: '李宁' },
                { value: 135, name: '新百伦' },
                { value: 1548, name: '阿迪王' }
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);