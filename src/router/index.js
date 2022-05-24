import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import AboutView from '../views/AboutView.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'login',
        component: LoginView,
    },
    {
        path: '/home',
        name: 'home',
        component: () =>
            import ( /* webpackChunkName: "HomeView" */ '../views/HomeView.vue'),
        children: [{
                path: '/about',
                name: 'about',
                component: AboutView
            }, {
                path: '/jsquestionbank',
                name: 'jsquestionbank',
                component: () =>
                    import ( /* webpackChunkName: "jsquestionbank" */ '../views/JsQuestionBank.vue'),
            },
            {
                path: '/personaldetail',
                name: 'personaldetail',
                component: () =>
                    import ( /* webpackChunkName: "personaldetail" */ '../views/PersonalDetail.vue'),
            },
            {
                path: '/worker',
                name: 'worker',
                component: () =>
                    import ( /* webpackChunkName: "worker" */ '../views/Worker.vue'),
            },
            {
                path: '/shengview',
                name: 'shengview',
                component: () =>
                    import ( /* webpackChunkName: "shengview" */ '../views/ShengView.vue'),
            },
        ]
    },
    {
        path: '/register',
        name: 'register',
        component: () =>
            import ( /* webpackChunkName: "register" */ '../views/RegisterView.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router