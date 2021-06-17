import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import(/* webpackChunkName: "home" */'@/views/home/index'),
        name: 'Home',
        meta: { title: '首页' }
      }
    ]
  },
  {
    path: '/meetingList',
    component: Layout,
    redirect: '/meetingList/index',
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "meeting-list" */'@/views/meeting-list/index'),
        name: 'meetingList',
        meta: { title: '会议列表' }
      }
    ]
  },
  {
    path: '/siteList',
    component: Layout,
    redirect: '/siteList/index',
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "site-list" */'@/views/site-list/index'),
        name: 'siteList',
        meta: { title: '场地列表' }
      }
    ]
  },
  {
    path: '/fullAgenda',
    component: Layout,
    redirect: '/fullAgenda/index',
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "full-agenda" */'@/views/full-agenda/index'),
        name: 'fullAgenda',
        meta: { title: '全部会议议程' }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    name: 'Login',
    hidden: true,
    meta: { title: '登录' }
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    name: '404',
    hidden: true,
    meta: { title: '404页面' }
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }

]
const createRouter = () =>
  new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
