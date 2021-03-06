//api.js就是存放服务端的接口的
import axios from 'axios';

// 添加请求拦截器
axios.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    config.headers.authorization = sessionStorage.getItem('token');
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
    if (response.data.status == 401) {
        window.location.href = '/'
    }
    // 对响应数据做点什么
    return response;
}, function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


const baseURL = '/api';

const postConfig = {
        baseURL,
        headers: {
            contentType: 'application/json',
            authorization: sessionStorage.getItem("token"),
        }
    }
    /**
     * @description 获取用户信息
     * @returns 
     */
export const getUserInfoApi = function(payload = {}) {
        return axios.post('/user/info', payload, postConfig);
    }
    /**
     * @description 获取用户信息列表
     * @returns 
     */
export const getUserListApi = function(payload = {}) {
        return axios.post('/user/list', payload, postConfig);
    }
    /**
     * @description 登录接口
     * @param  payload <object> <username,password,captcha>
     * @param  payload.username   用户名
     * @param  payload.password   密码
     * @param  payload.captcha   验证码
     * @returns 
     */
export const loginApi = function(payload = {}) {
    return axios.post("/user/login", payload, postConfig);
}

/**
 * @description 注册接口
 */
export const registerApi = function(payload = {}) {
        return axios.post("/user/register", payload, postConfig);
    }
    /**
     * @description 退出登陆接口
     * @param {*} payload 
     * @returns 
     */
export const logoutApi = function(payload = {}) {
        return axios.post("/user/logout", payload, postConfig);
    }
    /**
     * @description 验证码接口
     */
export const getCaptchaApi = function() {
        return `${baseURL}/captcha?` + Math.random();
    }
    /**
     * @description  添加题目
     * @param {*} payload 
     * @returns 
     */
export const addTopicApi = function(payload = {}) {
        return axios.post("/question/create", payload, postConfig);
    }
    /**
     * @description  查询题目
     * @param {*} payload 
     * @returns 
     */
export const queryQuestionApi = function(payload = {}) {
        return axios.post("/question/list", payload, postConfig);
    }
    /**
     * @description  修改题目
     * @param {*} payload 
     * @returns 
     */
export const updataQuestionApi = function(payload = {}) {
        return axios.post("/question/update", payload, postConfig);
    }
    /**
     * @description  删除题目
     * @param {*} payload 
     * @returns 
     */
export const deleteQuestionApi = function(payload = {}) {
        return axios.post("/question/delete", payload, postConfig);
    }
    /**
     * @description  修改个人信息接口
     * @param {*}  payload.phone 手机号
     * @param {*}  payload.email 邮箱
     * @param {*}  payload.sex 性别
     * @param {*}  payload.avatarName 昵称
     * @param {*}  payload.name 真实姓名
     * @param {*}  payload.provinceNo 省编号
     * @param {*}  payload.cityNo 市编号
     * @param {*}  payload.areaNo 区编号
     * @param {*}  payload.townNo 镇编号
     * @param {*}  payload.desc 个人介绍
     * @returns 
     */
export const updateUserInfoApi = function(payload = {}) {
        return axios.post("/user/update", payload, postConfig);
    }
    /**
     * @description  创建任务接口
     * @param {*} payload.name  任务名称  <String>
     * @param {*} payload.desc  任务描述  <String>
     * @param {*} payload.duration  任务时长    <number>
     * @param {*} payload.level  任务等级   <number>
     * @returns 
     */
export const taskCreateApi = function(payload = {}) {
    return axios.post("/task/create", payload, postConfig);
}

/**
 * @description  发布任务接口
 * @param {*} payload.userId  用户id  如果给多个人发送任务，可以传数组，数组中是每一个人的id； 
 * @param {*} payload.taskId  任务id
 * @returns 
 */
export const taskReleaseApi = function(payload = {}) {
    return axios.post("/task/release", payload, postConfig);
}

/**
 * @description  查询任务接口
 * @param {*} payload.pagination   是否需要分页  是  true  否  false   非必填
 * @param {*} payload.pageSize   每页获取几条数据  如果不传 默认是获取10条；非必填
 * @param {*} payload.pageNum  想获取第几页的数据  如果不传 默认是第1页；非必填
 * @returns 
 */
export const taskListApi = function(payload = {}) {
        return axios.post("/task/list", payload, postConfig);
    }
    /**
     * @description  角色列表接口
     * @param {*} payload.pagination   是否需要分页  是  true  否  false   非必填
     * @param {*} payload.pageSize   每页获取几条数据  如果不传 默认是获取10条；非必填
     * @param {*} payload.pageNum  想获取第几页的数据  如果不传 默认是第1页；非必填
     * @returns 
     */
export const RoleListApi = function(payload = {}) {
        return axios.post("/role/list", payload, postConfig);
    }
    /**
     * @description  查看任务详情接口
     * @param {*} payload.taskId  任务id
     * @returns 
     */
export const TaskDetailApi = function(payload = {}) {
        return axios.post("/task/detail", payload, postConfig);
    }
    /**
     * 编辑任务接口
     * @param {*} payload.id       任务id
     * @param     payload.name     任务名称
     * @param     payload.desc     任务描述
     * @param     payload.duration 任务时长
     * @param     payload.level    任务等级  1：紧急  0：普通任务    任务描述
     * @returns 
     */
export const TaskUpdateApi = function(payload = {}) {
        return axios.post('/task/update', payload, postConfig)
    }
    /**
     * @description  创建角色接口
     * @param {*} payload.idroleName    //角色名字 
     * @param     payload.groupId  //分组id  非必填
     * @returns 
     */
export const CreateRoleApi = function(payload = {}) {
        return axios.post("/role/create", payload, postConfig);
    }
    /**
     * @description  创建角色组接口
     * @param    payload.groupName  :<string>, //分组名字
     * @returns 
     */
export const CreateRoleGroupApi = function(payload = {}) {
        return axios.post("/roleGroup/create", payload, postConfig);
    }
    /**
     * @description  角色列表接口
     * @param {*} payload.pagination   是否需要分页  是  true  否  false   非必填
     * @param {*} payload.pageSize   每页获取几条数据  如果不传 默认是获取10条；非必填
     * @param {*} payload.pageNum  想获取第几页的数据  如果不传 默认是第1页；非必填
     * @returns 
     */
export const RoleGroupListApi = function(payload = {}) {
        return axios.post("/roleGroup/list", payload, postConfig);
    }
    /**
     * @description  创建评论接口
     * @param {*} payload.commentContent:<string>, //要评论的内容
     * @param {*} payload.taskId:<number> //要评论任务的id
     * @param {*} payload.userId:<number> //评论的用户id  是谁评论的
     * @returns 
     */
export const CreateComment = function(payload = {}) {
        return axios.post("/comment/create", payload, postConfig);
    }
    /**
     * @description  获取评论列表接口
     * @param {*} payload.pagination   是否需要分页  是  true  否  false   非必填
     * @param {*} payload.pageSize   每页获取几条数据  如果不传 默认是获取10条；非必填
     * @param {*} payload.pageNum  想获取第几页的数据  如果不传 默认是第1页；非必填
     * @returns 
     */
export const CommentList = function(payload = {}) {
        return axios.post("/comment/list", payload, postConfig);
    }
    /**
     * @description  获取权限列表接口
     * @param {*} payload.pagination   是否需要分页  是  true  否  false   非必填
     * @param {*} payload.pageSize   每页获取几条数据  如果不传 默认是获取10条；非必填
     * @param {*} payload.pageNum  想获取第几页的数据  如果不传 默认是第1页；非必填
     * @returns 
     */
export const permissionListApi = function(payload = {}) {
        return axios.post("/permission/list", payload, postConfig);
    }
    /**
     * @description  创建权限接口
     * @param {*} payload.title  <string>    标题
     * @param {*} payload.type   <number>   类型   1代表左侧栏  2代表页面  3代表功能
     * @param {*} payload.pid    <number>    pid如果为空就是最大的一级  如果等于某项的id就是它的子级
     * @returns 
     */
export const permissionCreateApi = function(payload = {}) {
        return axios.post("/permission/create", payload, postConfig);
    }
    /**
     * @description  删除权限接口
     * @param {*} payload.id  <arr>  // 必填项 权限的id  如果有子级 就把子级跟父级的id都传过来 是一个数组
     * @returns 
     */
export const permissionDeleteApi = function(payload = {}) {
        return axios.post("/permission/delete", payload, postConfig);
    }
    /**
     * @description  修改权限接口
     * @param {*} payload.id     <number>    id
     * @param {*} payload.title  <string>    标题
     * @param {*} payload.type   <number>    类型   1代表左侧栏  2代表页面  3代表功能
     * @param {*} payload.pid    <number>    pid如果为空就是最大的一级  如果等于某项的id就是它的子级
     * @returns 
     */
export const permissionUpdateApi = function(payload = {}) {
        return axios.post("/permission/update", payload, postConfig);
    }
    /**
     * @description  创建权限 
     * @param {*} payload.title      [<string>], //选择的那个功能权限名称
     * @param {*} payload.rId        <number>  //角色的id
     * @returns 
     */
export const getRolePromissionCreateApi = function(payload = {}) {
        return axios.post("/rolePermission/create", payload, postConfig);
    }
    /**
     * @description  获取功能权限列表 
     * @param {*} payload.pagination   是否需要分页  是  true  否  false   非必填
     * @param {*} payload.pageSize   每页获取几条数据  如果不传 默认是获取10条；非必填
     * @param {*} payload.pageNum  想获取第几页的数据  如果不传 默认是第1页；非必填
     * @returns 
     */
export const getRolePromissionListApi = function(payload = {}) {
        return axios.post("/rolePermission/list", payload, postConfig);
    }
    /**
     * 上传功能
     */
export const uploadImageApi = function(payload = {}) {
        return axios.post("/upload/image", payload, postConfig);
    }
    /**
     * 
     */
export const avatarListApi = function(payload = {}) {
    return axios.post("/avatar/list", payload, postConfig);
}