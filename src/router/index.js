import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/user/LoginView.vue'
import AboutView from '../views/questionBank/AboutView.vue'
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
                    import ( /* webpackChunkName: "jsquestionbank" */ '../views/questionBank/JsQuestionBank.vue'),
            },
            {
                path: '/personaldetail',
                name: 'personaldetail',
                component: () =>
                    import ( /* webpackChunkName: "personaldetail" */ '../views/AccountSetting/PersonalDetail.vue'),
            },
            {
                path: '/worker',
                name: 'worker',
                component: () =>
                    import ( /* webpackChunkName: "worker" */ '../views/AccountSetting/Worker.vue'),
            },
            {
                path: '/taskCreate',
                name: 'taskCreate',
                component: () =>
                    import ( /* webpackChunkName: "taskCreate" */ '../views/TaskCenter/taskCreate.vue'),
            },
            {
                path: '/taskList',
                name: 'taskList',
                component: () =>
                    import ( /* webpackChunkName: "taskList" */ '../views/TaskCenter/taskList.vue'),
            },
            {
                path: '/roleList',
                name: 'roleList',
                component: () =>
                    import ( /* webpackChunkName: "roleList" */ '../views/TaskCenter/RoleList.vue'),
            },
            {
                path: '/taskDetail',
                name: 'taskDetail',
                component: () =>
                    import ( /* webpackChunkName: "taskDetail" */ '../views/TaskCenter/taskDetail.vue'),
            },
            {
                path: '/rolemanager',
                name: 'rolemanager',
                component: () =>
                    import ( /* webpackChunkName: "taskDetail" */ '../views/TaskCenter/RightsManager.vue'),
            },
            {
                path: '/createrole',
                name: 'createrole',
                component: () =>
                    import ( /* webpackChunkName: "createrole" */ '../views/TaskCenter/CreateRole.vue'),
            },
            {
                path: '/shengview',
                name: 'shengview',
                component: () =>
                    import ( /* webpackChunkName: "shengview" */ '../views/ShengView.vue'),
            },
            {
                path: '/managerview',
                name: 'managerview',
                component: () =>
                    import ( /* webpackChunkName: "managerview" */ '../views/TaskCenter/ManagerView.vue'),
            },
        ]
    },
    {
        path: '/register',
        name: 'register',
        component: () =>
            import ( /* webpackChunkName: "register" */ '../views/user/RegisterView.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router