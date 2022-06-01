<template>
  <div class="login flex-center">
    <div class="popup flex-center">
      <div class="logo flex-column">
        <div class="icon-logo shadow">H5</div>
        <p class="sub-title mt-20">achi5</p>
        <p class="desc">DITIZITING INDUSTRLAL SERVICES</p>
      </div>
      <div class="form">
        <div>
          <div class="label">USERNAME</div>
          <el-input v-model="username" clearable></el-input>
        </div>
        <div class="mt-10">
          <div class="label">PASSWORD</div>
          <el-input v-model="password" clearable show-password></el-input>
        </div>
        <captchaComponent  @change-captch="changeVal"></captchaComponent>
        <div class="flex-between jump mt-10">
          <div class="lost-password">忘记密码</div>
          <div class="sign-in" @click="navigator('register')">
            没有账号？创建一个
          </div>
        </div>
        <el-button class="login-color mt-30" type="primary" @click="submit">
          LGO IN</el-button
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login {
  height: 100vh;
  background-color: #f5f8fd;
  & .popup {
    width: 800px;
    display: grid;
    grid-template-columns: 2.8fr 3fr;
    border: 14px solid #1e80e1;
    padding: 40px;
    color: #0c80e7;
    font-size: 12px;
    gap: 0 30px;
    & .logo {
      height: 478px;
      background-color: #1e80e1;
      transform: skewX(-10deg) translateX(40px);
      z-index: 100;
      color: #fff;
      & .icon-logo {
        padding: 20px;
        font-size: 60px;
        box-sizing: border-box;
        transform: skewX(10deg);
      }
      & .sub-title {
        font-size: 40px;
      }
      & .desc {
        font-size: 12px;
      }
    }
    & .form {
      min-height: 50%;
      padding: 20px;
      padding-left: 100px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;
      & .label {
        padding: 10px 0;
      }
      & .login-color {
        background-color: #61c6d0;
        color: #e8ffff;
      }
      & .verification {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      & .jump {
        & .lost-password {
          cursor: pointer;
        }
        & .sign-in {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
<script>
//登录 功能中的工作流程
//用户点击登录按钮
//校验input框里的值是否符合要求
//如果符合要求，就调用服务端接口
//服务端如果校验成功
//就会给你返回一个token

//如果前端校验不成功，就提示用户对应的一个消息
//比如：用户名输入不符合规范；密码长度在6~15位；

// axios的安装

//常用的axios方法
// axios.get();
// axios.post();
// 什么时候使用get？什么时候使用post？
// 看接口文档
// 接口是什么类型：get, post
// 第一个参数   接口名
// 第二个参数   服务端要的数据（json数据或数组）

//接口文档
//在工作中，是服务端写的一个接口文档，在GitHub中wiki下面写接口文档
//接口文档   会告诉你  访问的地址  访问类型   写接口的目的  入参  出参

//跨域
//协议  域名  端口号  有任何一个不相同，就认为是跨域
// http://www.baidu.com
//协议：http
//域名：www.baidu.com
//端口号：8080

//如果网址的端口号是80的话可以不写
//http://www.baidu.com:8080/user/login

//跨域是在浏览器中http中的一个协议；
//目前在这个市场上，几乎所有的项目是前后端分离
//前端是前端的项目，后端的项目是后端的项目
//100%会造成跨域
//如果是生产环境，服务端解决这个问题

//在开发时，都是前端自己解决
//解决方法：vue.config.js   来解决跨域问题

//验证码：

//注意：如果说接口中以get方式请求，一般情况下，如果这个接口返回的是一个文件，或者是一个图片
//文件是  css   js   html   txt  exls  png
//通常都是get请求
//我们不需要用axios
//直接写一个图片就可以

// 总结：验证码，图片，静态资源文件可以直接调用，而不需要用到axios.get('/captcha').then(res)

//解决验证码不会自动刷新的问题
//点击验证码更新验证码
//把验证码的src变成一个变量
//src地址变了，然后就会重新拿到验证码
import captchaComponent from "@/components/captchaComponent.vue";
import { loginApi } from "@/api/api";
import { encrypt } from "@/assets/utils/util";
export default {
  data() {
    return {
      username: "",
      password: "",
      captcha: "",
      captchaSrc: "/api/captcha",
    };
  },
  methods: {
    //检查用户名和密码，如果校验成功，返回true，检验失败，返回false
    changeVal(val){
      this.captcha = val;
    },
    getValidateResult() {
      var res = {
        result: true,
      };
      //用户名密码不能为空
      if (this.username == "") {
        this.$message();
        res.result = false;
        res.message = { type: "warning", message: "用户名不能为空" };
      } else if (this.password == "") {
        res.result = false;
        res.message = { type: "warning", message: "密码不能为空" };
      }
      if (!res.result) this.$message(res.message);

      return res.result;
    },

    keyDown(e) {
      // 回车则执行登录方法 enter键的ASCII是13
      if (e.keyCode === 13) {
        this.submit(); //登录方法
      }
    },
    async submit() {
      //校验input框里的值是否符合要求
      var isValidate = this.getValidateResult();
      if (!isValidate) return;

      const { username, password, captcha } = this;
      let res = await loginApi({
        username: this.username,
        password: encrypt(this.password),
        captcha: this.captcha,
      });
      //登录成功
      if (res.data.status == 1) {
        this.$message({
          message: "登录成功",
          type: "success",
        });
        sessionStorage.setItem("token", res.data.data);
        this.$router.push("/home");
      } else {
        //登录失败
        this.$message({
          type: "warning",
          message: "res.data.msg",
        });
        // this.getCaptcha();
      }
    },
    navigator(name) {
      if (this.$router.currentRoute.name == name) return;
      this.$router.push({
        name: name,
      });
    },
  },
  components: {
    captchaComponent,
  },

  mounted() {
    //绑定监听事件
    window.addEventListener("keydown", this.keyDown);
  },
  destroyed() {
    //销毁事件
    window.removeEventListener("keydown", this.keyDown, false);
  },
};
</script>
