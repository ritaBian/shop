var Random = Mock.Random
var index = Mock.mock('http://api.com/index', {
  // "user|5-10": [{
  //   'name': '@cname', //中文名称
  //   'age|1-100': 100, //100以内随机整数  属性值100只用来确定类型
  //   'birthday': '@date("yyyy-MM-dd")', //日期
  //   'city': '@city(true)'//中国城市
  // }],

  "swiper":[],

  'section1':{
    'list|4':[],
    'name':'5555',
    'banner':Random.image('400x100', '#ffcc33', '#FFF', 'png', 's1-banner')
  }
 




});

var detail = Mock.mock('http://api.com/detail', {
  "view|1": [{
    'title|1': ['一加手机5 (A5000) 全网通  移动联通电信4G手机','三星 Galaxy S8 移动联通电信4G手机 ','荣耀9 全网通 标配版 4GB+64GB 移动联通电信4G手机 ','OPPO R11 全网通 手机','小米6 全网通 6GB+128GB 陶瓷尊享版 移动联通电信4G手机 ','新诺基亚（NOKIA）105 移动联通2G手机 老人手机','小辣椒 红辣椒4A 标准版  全网通 移动联通电信4G手机 ','锤子 坚果Pro 全网通 移动联通电信4G手机 ','360手机 N5 全网通 移动联通电信4G手机 ','乐视 S3 爵迹版  移动联通电信4G手机 '
    ],
    'intro':  Random.cparagraph(2),
    'id':'@id',
    'price|99-1000':100,
    'chose|3':[{
      'col|+1':['土豪金','东北银','喜庆红'],
      'size|+1':['128g','64g','32g']
    }]
  }],

  'swiper|2':[{
    'imgSrc':Random.image('400x400', '#ffcc33','#FFF', 'png', ''),
    'id':'@id'
  }],

  'contentImgSrc|8':[{
    'imgSrc':Random.image('600x600', '#5a9e6e','#FFF', 'png', '')
  }]
});
 
var category = Mock.mock('http://api.com/category', {
    'aside|14':[{
      'title':'@cname',
      'list|60':[{
        'title':'@last',
        'imgPath':Random.image('2000x2000','#5169b4','#FFF','png',''),

      }]
    }]
});
 
export {index,detail,category}
