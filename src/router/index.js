import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'views/Home/Home'
import utils from 'utils'
import { Toast } from 'vant'
// 重写路由push方法,阻止重复点击报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'Home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('views/Category/Category'),
    meta: {
      keepAlive: true,
    },
    children: [
      {
        path: 'categoryInfo',
        name: 'CategoryInfo',
        component: () => import('../views/Category/Router/CategoryInfo'),
        meta: {},
      },
    ],
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('views/Search/Search'),
    meta: {
      keepAlive: true,
    },
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('views/Cart/Cart'),
    meta: {
      keepAlive: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('views/Login/Login'),
    meta: {},
  },
  // 待做
  {
    path: '/order',
    name: 'Order',
    component: () => import('views/Order/Order'),
    meta: { isLogin: true, keepAlive: true },
    children: [
      {
        path: 'cashier',
        name: 'CashierOrder',
        component: () => import('views/Order/Router/CashierOrder'),
        meta: { isLogin: true },
      },
      {
        path: 'paySuccess',
        name: 'PaySuccess',
        component: () => import('views/Order/Router/PaySuccess'),
        meta: { isLogin: true },
      },
    ],
  },
  // 待做
  {
    path: '/info/:id',
    name: 'Info',
    component: () => import('views/Info/Info'),
    meta: {},
  },
  // 待完善
  {
    path: '/map',
    name: 'Map',
    component: () => import('../views/Home/Map/Maps'),
    meta: {},
  },
  // 待完善
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('views/Profile/Profile'),
    meta: {},
    children: [
      {
        path: 'order',
        name: 'PofileOrder',
        component: () => import('views/Profile/Router/Order/Order'),
        meta: {},
      },
      {
        path: 'address',
        name: 'PofileAddress',
        component: () => import('views/Profile/Router/Address/Address'),
        meta: {
          isLogin: true,
        },
        children: [
          {
            path: 'addAddress',
            name: 'AddAddress',
            component: () =>
              import('../views/Profile/Router/Address/Add/AddAddress'),
            meta: {
              isLogin: true,
              keepAlive: false,
            },
          },
          {
            path: 'editAddress',
            name: 'EditAddress',
            component: () =>
              import('../views/Profile/Router/Address/Edit/EditAddress'),
            meta: {
              isLogin: true,
            },
          },
        ],
      },
    ],
  },
]
const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  // 检查页面是否需要登录
  if (to.meta.isLogin) {
    if (!Object.keys(utils.GetToken()).length) {
      Toast.fail('请先登陆')
      // next({ path: '/login', params: { redirect: to.fullPath } })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
