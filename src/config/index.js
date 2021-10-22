export default {
  dev: {
    http: {
      // baseURL: 'http://localhost:3000/api/json',

      baseURL: 'http://118.31.188.127:802/api/json',

      timeout: 3000,
      apiList: {
        Login: '/user/login',
        Register: '/user/register',
        // 公共
        PublicNav: `/category/nav`,
        PublicSearchList: `/category/searchList`,
        PublicSearchRecommend: `/category/searchRecommend`,
        PublicLikeList: `/category/likeList`,
        // 首页
        HomeSpecialArea: `/category/specialArea`,
        HomeTabsAllItem: `/category/tabsAllItem`,
        HomeTabsDinnerItem: `/category/tabsDinnerItem`,
        HomeTabsQualityItem: `/category/tabsQualityItem`,
        HomeTabspopularItem: `/category/tabspopularItem`,
        // 分类
        CategoryList: `/category/categoryList`,
        CategoryListItem: `/category/categoryListItem`,
        // 购物车
        CartAllGoods: `/cart/allGoods`,
        CartAddGoods: `/cart/addGoods`,
        CartDelGoods: `/cart/delGoods`,
        CartUpdateGoods: `/cart/updateGoods`,
        // 地址
        AllAddress: `/address/allAddress`,
        AddAddress: `/address/addAddress`,
        EditAddress: `/address/editAddress`,
        DelAddress: `/address/delAddress`,
        // 订单
        OrderList: `/order/orderList`, //付款商品列表
        OrderCreate: `/order/orderCreate`,

        Payment: `/order/payment`,
        // CheckPayment: `/order/checkPayment`,

        // porfile-订单列表
        OrderAll: `/order/orderAll`,
        DelOrders: `/order/delOrders`,
      },
    },
    token: 'token',
    historyUser: 'historyUser',
    historySearch: 'historySearchTags',

    amapKey: 'f304fd0f433cd47cc98cbac7817fc97d',
    public: {
      tabbarItems: [
        {
          name: '首页',
          from: 'Home',
          active: require('img/tabbar/home_selected.png'),
          inactive: require('img/tabbar/home_default.png'),
        },
        {
          name: '分类',
          from: 'Category',
          active: require('img/tabbar/category_selected.png'),
          inactive: require('img/tabbar/category_default.png'),
        },
        // {
        //   name: '吃什么',
        //   from: 'Eat',
        //   active: require('img/tabbar/eat_selected.png'),
        //   inactive: require('img/tabbar/eat_default.png'),
        // },
        {
          name: '购物车',
          from: 'Cart',
          active: require('img/tabbar/shoppingcart_selected.png'),
          inactive: require('img/tabbar/shoppingcart_default.png'),
        },
        {
          name: '我的',
          from: 'Profile',
          active: require('img/tabbar/mine_selected.png'),
          inactive: require('img/tabbar/mine_default.png'),
        },
      ],
    },
    HomeInfo: {
      carousel: [
        {
          id: 1,
          name: '双12年终狂欢-上海江苏-老版轮播-1210',
          icon_url: 'https://img.ddimg.mobi/0ec4a32cbd84b1575892960355.jpg',
          bg_img: '',
        },
        {
          id: 2,
          name: '双12年终榜单-上海江苏-老版轮播-1209',
          icon_url: 'https://img.ddimg.mobi/d3d83d40395221575808767181.jpg',
          bg_img: '',
        },
        {
          id: 3,
          name: '西鲜记羊肉专题老banner12.9-12.15',
          icon_url: 'https://img.ddimg.mobi/1bb411f2cd09d1575815053778.jpg',
          bg_img: 'https://img.ddimg.mobi/f11c8249d63561572418243165.jpg',
        },
        {
          id: 4,
          name: '冬日煲汤_上海江苏_老轮播_12.09',
          icon_url: 'https://img.ddimg.mobi/b7efb94de888d1575820057576.jpg',
          bg_img: '',
        },
        {
          id: 5,
          name: '红美人_华东_老轮播_12.10',
          icon_url: 'https://img.ddimg.mobi/eb669d9799b8f1575907727553.jpg',
          bg_img: 'https://img.ddimg.mobi/f11c8249d63561572418243165.jpg',
        },
        {
          id: 6,
          name: '百款零食_华东_老轮播_12.02',
          icon_url: 'https://img.ddimg.mobi/168bff87979f11575943593312.jpg',
          bg_img: 'https://img.ddimg.mobi/f11c8249d63561572418243165.jpg',
        },
      ],
      advertise: [
        {
          id: 1,
          name: '最快二十九分分钟送达',
          url: require('img/icon/transport.png'), //引入外部图片时需要require先加载一次
        },
        { id: 2, name: '0元起送 0元配送', url: require('img/icon/money.png') },
        { id: 3, name: '安心退', url: require('img/icon/seal.png') },
      ],
      banner: 'http://518taole.7-orange.cn/homead2.gif',
      tabs: [
        { id: 1, title: '全部', reqName: `ReqHomeTabsAllItem` },
        { id: 2, title: '晚上吃什么', reqName: `ReqHomeTabsDinnerItem` },
        { id: 3, title: '人气', reqName: `ReqHomeTabsQualityItem` },
        { id: 4, title: '心选', reqName: `ReqHomeTabspopularItem` },
      ],
    },
  },
}
