import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import LoginRegister from '@/pages/LoginRegister'
import learn from '@/pages/learn'
import examine from '@/pages/examine'
import plan from '@/components/plan'

 


const routes = [
    { path: '/', redirect: '/home' },
    { 
        path: '/home',
        component: Home,
        meta: { showFoot: true },
      },
    { 
        path: "/home/search", 
        component: Search,
        meta:{showFoot:true} 
    },
    { 
        path: "/login", 
        component: LoginRegister,
        meta:{showFoot:false}
    },
    { 
        path: "/register", 
        component: LoginRegister,
        meta:{showFoot:false} 
    },
    { 
        path: "/home/:map", 
        name: 'MapPage',
         component: () => import('@/pages/Map/index.vue')
    },
    {
        path:"/home/learn",
        component:learn,
        meta:{showFoot:false} 

    },
    {
        path:"/home/examine",
        component:examine,
        meta:{showFoot:false} 

    },
    {
        path:"/home/plan",
        component:plan,
        meta:{showFoot:false} 
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
      return { top: 0 }  // 路由切换时滚动到顶部
    }
  })
  

export default router
