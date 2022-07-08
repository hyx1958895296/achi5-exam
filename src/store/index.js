import Vue from 'vue'
import Vuex from 'vuex'

import {
    RoleListApi,
    RoleGroupListApi
} from '../api/api'
import user from '../store/modules/user'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        information: {
            // accountInp: "",
            // nameInp: "",
            // sex: "",
            // phoneInp: "",
            // avatarImg: "",
            // emailInp: "",
            // textarea: "",
            // proviceCode: "",
            // cityCode: "",
            // areaCode: "",
            user,
        }
    },
    getters: {},
    mutations: {
        setUser(ctx, payload) {
            state.information = payload;
        }
    },
    //统一管理这种组件的状态 ，减少项目的复杂性
    //组件  actions的其他作用 
    //服务端的接口返回的数据，不能直接使用
    //需要加工一下才可以用
    //那么我们就可以在vuex中的actions中来使用；

    //总结：咱们用vuex中的actions来实现  自己的异步接口；
    //这个异步接口不是服务端直接提供的
    //而是由我们把服务端的接口数据进行统一处理后得到的
    //这样有一个好处是，如果有一天我们的接口需要用到这种数据结构
    //可以直接调用这个方法

    //这种actions的用法也是为了满足复用性

    actions: {
        /**
         * @description 获取角色组菜单列表
         */
        async getRoleGroupMenuList() {
            let [roleListResult, roleGroupListResult] = await Promise.all([
                RoleListApi(),
                RoleGroupListApi(),
            ]);
            let roleList = roleListResult.data.data.rows;
            let roleGroupList = roleGroupListResult.data.data.rows;
            roleGroupList.forEach((group) => {
                group.key = `group${group.id}`;
                group.children = (() => {
                    let res = [];
                    roleList.forEach((role) => {
                        if (role.groupId == group.id) {
                            role.key = `role${role.id}`;
                            res.push(role);
                        }
                    });
                    return res;
                })();
            });
            return roleGroupList;
        },
    },
    modules: {}
})