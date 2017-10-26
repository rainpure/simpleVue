import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import AdminIndex from './views/AdminIndex.vue'
import NotFound from './views/404.vue'

let routes = [
    // {
    //     path: '/login',
    //     component: Login,
    //     name: '',
    //     hidden: true
    // },
    // {
    //     path: '/password',
    //     component: Password,
    //     name: '',
    //     hidden: true
    // },
    // {
    //     path: '/resetpass',
    //     component: ResetPassword,
    //     name: '',
    //     hidden: true
    // },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '库存管理',
        iconClass: 'el-icon-message',
        leaf: false,//只有一个节点
        children: [
            { path: '/index', component: AdminIndex, meta: { requireAuth: true }, name: '首页' },
            { path: '/4', component: AdminIndex, meta: { requireAuth: true }, name: '设置学期打卡次数' },
        ],
    },
    {
        path: '/x',
        component: Home,
        name: '财务管理',
        iconClass: 'el-icon-menu',
        leaf: false,//只有一个节点
        children: [
            { path: '/2', component: AdminIndex, meta: { requireAuth: true }, name: '首页2' },
            { path: '/3', component: AdminIndex, meta: { requireAuth: true }, name: '22' },
        ],
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];


Vue.use(VueRouter)
const router = new VueRouter({
	routes
})

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.name) {
        document.title = to.name;
    }
    next();
})

export default router;
