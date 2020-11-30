import Vue from 'vue'
import Router from 'vue-router'
import conf from '@/conf.js'

Vue.use(Router);
//按需加载,当渲染其他页面时才加载其组件,并缓存,减少首屏加载时间
const Index = resolve => require(['@/views/Index.vue'], resolve)
const Category = resolve => require(['@/views/Category.vue'], resolve)
const CategoryMain = resolve => require(['@/components/category/main.vue'], resolve)
const Car = resolve => require(['@/views/Car.vue'],resolve)
const User = resolve => require(['@/views/User.vue'], resolve)
const Detail = resolve => require(['@/views/Detail.vue'], resolve)
const Search = resolve => require(['@/views/Search.vue'], resolve)
const Pay = resolve => require(['@/components/car/pay/pay.vue'], resolve)
const Login = resolve => require(['@/views/login.vue'], resolve)
const List = resolve => require(['@/views/List.vue'], resolve)
const Reg = resolve => require(['@/views/reg.vue'], resolve)
const Order = resolve => require(['@/views/Order.vue'], resolve)
const Im = resolve => require(['@/views/im.vue'], resolve)
const ImList = resolve => require(['@/views/im_list.vue'], resolve)
const Fenxiao = resolve => require(['@/views/Fenxiao.vue'], resolve)
const GuanZhu = resolve => require(['@/views/Guanzhu.vue'], resolve)


const HomePage = resolve => require(['@/views/travel/index.vue'], resolve)//发现
const Circuit = resolve => require(['@/views/travel/circuit.vue'], resolve)//线路
const Track = resolve => require(['@/views/travel/track.vue'], resolve)//足迹
const TrackDetail = resolve => require(['@/views/travel/track_detail.vue'], resolve)//足迹详情
const Comment = resolve => require(['@/views/travel/comment.vue'], resolve)//发表评论
const DayJourney = resolve => require(['@/views/travel/day_journey.vue'], resolve)//发布线路
const CircuitSearch = resolve => require(['@/views/travel/circuit_search.vue'], resolve)//线路搜索
const ReleaseJourney = resolve => require(['@/views/travel/release_journey.vue'], resolve)//发布行程
const RankEdit = resolve => require(['@/views/travel/rank_edit.vue'], resolve)//排序编辑
const TitleEdit = resolve => require(['@/views/travel/title_edit.vue'], resolve)//线路标题编辑
const DescriptionEdit = resolve => require(['@/views/travel/description_edit.vue'], resolve)//线路描述编辑
const TrafficEdit = resolve => require(['@/views/travel/traffic_edit.vue'], resolve)//线路描述编辑
const Active = resolve => require(['@/views/travel/active.vue'], resolve)//线路描述编辑
const ShopDetail = resolve => require(['@/views/travel/shop_detail.vue'], resolve)//店铺详情
const ShopDetailEvaluate = resolve => require(['@/views/travel/shop_detail_evaluate.vue'], resolve)//线路描述编辑
const CircuitDetail = resolve => require(['@/views/travel/circuit_detail.vue'], resolve)//线路详情
const CardDetail = resolve => require(['@/views/travel/card_detail.vue'], resolve)//门票详情
const ShopNewDetail = resolve => require(['@/views/travel/shop_new_detail.vue'], resolve)//店铺详情（新版）
const City = resolve => require(['@/views/travel/city.vue'], resolve)//地址
const EditAnnouncements = resolve => require(['@/views/travel/edit_announcements.vue'], resolve)//注意事项
const Map = resolve => require(['@/views/travel/map.vue'], resolve)//地图
const releaseJourneyEdit = resolve => require(['@/views/travel/release_journey_edit.vue'], resolve)//编辑行程
const releaseJourneyList = resolve => require(['@/views/travel/release_journey_list.vue'], resolve)//个人中心线路列表
const dayJourneyEdit = resolve => require(['@/views/travel/day_journey_edit.vue'], resolve)//个人中心编辑线路
const parFor = resolve => require(['@/views/travel/par_for.vue'], resolve)//支付
const store = resolve => require(['@/views/travel/store.vue'], resolve)//商家详情
const commentTrack = resolve => require(['@/views/travel/comment_track.vue'], resolve)//到此一游
const activeUs = resolve => require(['@/views/travel/active_us.vue'], resolve)//橡果互动
const userCode = resolve => require(['@/views/travel/userCode.vue'], resolve)//智能验票

// 新增
const shopCar = resolve => require(['@/views/shop/shopCar.vue'], resolve)//购物车
const shopDetails = resolve => require(['@/views/shop/details.vue'], resolve)//商品详情
const shoppingCar = resolve => require(['@/views/shop/car.vue'], resolve)//购物车
const shoppingBuy = resolve => require(['@/views/shop/buy.vue'], resolve)//确认订单
const mineNew = resolve => require(['@/views/shop/mine.vue'], resolve)//我的

export default new Router({
  //mode: 'history',//abstract
 // scrollBehavior (to, from, savedPosition) {
 //   return { x: 0, y: 0 }
  //},
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition
    }
    return {x: 0, y: 0}
},

  routes: [{
      path: '/',
      name: '线路',
      meta: { keepAlive: true},
      // component: Index,
      component: Circuit,
      // Circuit
    }, {
      path: '/category',
      name: '菜谱',
      meta: { keepAlive: true},
      redirect: '/category/all',
      component: Category,
      children: [{
        path: '/category/:tab',
        name: '菜谱',
        meta: { keepAlive: true},
        component:CategoryMain
      }]
    }, {
      path: '/reg',
      name: '注册',
      component: Reg
    }, {
      path: '/Guanzhu',
      name: '公众号',
      component: GuanZhu
    }, {
      path: '/Fenxiao',
      name: '分销',
      component: Fenxiao
    }, {
      path: '/car',
      name: '购物车',
      component: Car
    }, {
      path: '/car/pay',
      name: '支付',
      component: Pay
    }, {
      path: '/order',
      name: '订单',
      component: Order
    }, {
      path: '/list',
      name: '产品列表',
      meta: { keepAlive: true},
      component: List
    },
    {
      path: '/user',
      name: '用户',
      component: User,
      meta: {
           requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
       },
    }, {
      path: '/detail',
      //meta: { keepAlive: true},
      name: '商品详情',
      component: Detail
    }, {
      path: '/search',
      name: '搜索',
      component: Search
    },{
      path: '/login',
      name: '登录',
      component: Login
    },{
      path: '/imlist',
      name: '通讯',
      component: ImList
    },{
      path: '/im',
      name: '通讯',
      component: Im
    },{
      path: '/index',
      name: '发现',
      meta: { keepAlive: true},
      component: HomePage
    },{
      path: '/circuit',
      name: '线路',
      meta: { keepAlive: true},
      component: Circuit
    },{
      path: '/track',
      name: '享迹',
      component: Track,
      meta: { keepAlive: true},
    },
    {
      path: '/track_detail',
      name: '享迹',
      component: TrackDetail
    },
    {
      path: '/comment',
      name: '发表评论',
      component: Comment
    },
    {
      path: '/day_journey',
      name: '发布线路',
      component: DayJourney
    },
    {
      path: '/circuit_search',
      name: '线路搜索',
      component: CircuitSearch
    },
    {
      path: '/release_journey',
      name: '发布行程',
      component: ReleaseJourney
    },
    {
      path: '/rank_edit',
      name: '排序',
      component: RankEdit
    },
    {
      path: '/title_edit',
      name: '线路标题',
      component: TitleEdit
    },
    {
      path: '/description_edit',
      name: '线路描述',
      component: DescriptionEdit
    },
    {
      path: '/traffic_edit',
      name: '交通信息',
      component: TrafficEdit
    },
    {
      path: '/active',
      name: '橡果互动',
      meta: { keepAlive: true},
      component: Active
    },
    {
      path: '/shop_detail',
      name: '详情',
      component: ShopDetail
    },
    {
      path: '/shop_detail_evaluate',
      name: '评论详情',
      component: ShopDetailEvaluate
    },
    {
      path: '/circuit_detail',
      name: '线路详情',
      component: CircuitDetail,
      // meta: { keepAlive: true},
    },
    {
      path: '/card_detail',
      name: '线路详情',
      component: CardDetail
    },
    {
      path: '/shop_new_detail',
      name: '详情',
      component: ShopNewDetail
    },
    {
      path: '/city',
      name: '城市索引',
      component: City
    },
    {
      path: '/edit_announcements',
      name: '注意事项',
      component: EditAnnouncements
    },
    {
      path: '/map',
      name: '地图',
      component: Map
    },
    {
      path: '/release_journey_list',
      name: '个人中心线路列表',
      component: releaseJourneyList
    },
    {
      path: '/release_journey_edit',
      name: '编辑行程',
      component: releaseJourneyEdit
    },
    {
      path: '/day_journey_edit',
      name: '编辑线路',
      component: dayJourneyEdit
    },
    {
      path: '/par_for',
      name: '支付',
      component: parFor
    },
    {
      path: '/store',
      name: '商家详情',
      component: store,
      meta: { keepAlive: true},
    },
    {
      path: '/comment_track',
      name: '到此一游',
      component: commentTrack
    },
    {
      path: '/active_us',
      name: '橡果互动',
      component: activeUs
    },
    {
      path: '/userCode',
      name: '智能验票',
      component: userCode
    },
    {
      path:'/shopCar',
      name:'购物',
      component:shopCar
    },
    {
      path:'/shop/details',
      name:'购物详情',
      component:shopDetails
    },
    {
      path:'/shop/car',
      name:'购物车',
      component:shoppingCar
    },
    {
      path:'/shop/buy',
      name:'确认订单',
      component:shoppingBuy
    },
    {
      path:'/shop/mine',
      name:'我的',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
      },
      component:mineNew
    }
    

  ],


})
