<template>
  <div class="register flex-center">
    <div class="popup shadow">
      <el-container class="container">
        <el-header class="align-center">
          <div>注册</div>
        </el-header>
        <el-main class="main shadow flex-column">
          <el-steps
            class="steps"
            :active="active"
            finish-status="success"
            align-center
          >
            <el-step title="校验身份"></el-step>
            <el-step title="注册成功"></el-step>
          </el-steps>
          <div v-if="active == 0">
            <el-input
              prefix-icon="el-icon-user-solid"
              class="mt-10"
              placeholder="请输入用户名"
              v-model="username"
              clearable
            ></el-input>

            <el-input
              prefix-icon="el-icon-lock"
              class="mt-10"
              placeholder="请输入密码"
              v-model="password"
              clearable
            ></el-input>

            <el-input
              prefix-icon="el-icon-lock"
              class="mt-10"
              placeholder="请再次输入密码"
              v-model="againPassword"
              clearable
            ></el-input>

            <el-input
              prefix-icon="el-icon-message"
              class="mt-10"
              placeholder="请输入邮箱"
              v-model="email"
              clearable
            ></el-input>

            <el-input
              prefix-icon="el-icon-mobile-phone"
              class="mt-10"
              placeholder="请输入手机号"
              v-model="phone"
              clearable
            ></el-input>

            <el-input
              prefix-icon="el-icon-mobile-phone"
              class="mt-10"
              placeholder="请输入真实名字"
              v-model="name"
              clearable
            ></el-input>
            <div class="mt-10 verification">
              <el-input v-model="captcha"></el-input>
              <el-captcha ref="captcha"></el-captcha>
            </div>
            <el-button @click="regJump" type="primary" class="btn mt-20"
              >注册</el-button
            >
          </div>
          <div class="reg-success" v-else-if="active == 1">
            <i class="el-icon-circle-check icon-success"></i>
            <div>注册成功，将在 {{ time }} 秒后跳转到登录页面</div>
            <el-button type="primary" @click="regJump">确定</el-button>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import { loginApi, registerApi } from "@/api/api";
import { encrypt } from "@/assets/utils/util";
import captchaComponent from "@/components/captchaComponent.vue";
export default {
  data() {
    return {
      active: 0,
      username: "",
      password: "",
      againPassword: "",
      captcha: "",
      email: "",
      phone: "",
      name: "",
      captchaSrc: "/api/captcha",
      centerDialogVisible: false,
      time: 3,
      timmer: null,
    };
  },
  methods: {
    getValidateResult() {
      if (/(\W)/.test(this.username)) {
        this.$message({
          type: "warning",
          message: "用户名只能包含数字字母下滑线",
        });
        return false;
      }
      return true;
    },

    async setTokenBySessionStorage() {
      let loginResult = await loginApi({
        username: this.username,
        password: encrypt(this.password),
        captcha: this.captcha,
      });
      console.log(loginResult.data);
      sessionStorage.setItem("token", loginResult.data.data);
    },

    confirm() {
      if (this.token) {
        this.$router.push({
          name: "home",
        });
      } else {
        this.setTokenBySessionStorage();
      }
    },
    async regJump() {
      var validate = this.getValidateResult();
      if (!validate) return;

      let res = await registerApi({
        username: this.username,
        password: this.password,
        email: this.email,
        phone: this.phone,
        name: this.name,
        captcha: this.captcha,
      });
      console.log(res);
      //注册成功
      if (res.data.status == 1) {
        this.setTokenBySessionStorage();
        this.active = 2;
        //倒计时
        this.timmer = setInterval(() => {
          if (this.time != 1) {
            this.time--;
          } else {
            this.$router.push({
              name: "home",
            });
            clearInterval(this.timmer);
          }
        }, 1000);
      } else {
        //注册失败
        this.$message({
          type: "warning",
          message: res.data.data.msg,
        });
      }
    },
  },
  components: {
    "el-captcha": captchaComponent,
  },
};
</script>

<style scoped lang='scss'>
.register {
  height: 100vh;
  background-color: #fefefe;
  padding: 0 60px;
  & .popup {
    background-color: #f9f9fb;
    border: 10px solid #303030;
    border-radius: 4px;
    min-height: 600px;
    width: 800px;
    padding: 0px 60px;
    box-sizing: border-box;
    & .container {
      height: 100%;
      padding-bottom: 60px;
    }
    & .main {
      height: 100%;
      border: #fff;
      padding: 60px 27%;
      & .verification {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      & .steps {
        width: 100%;
      }
      & .reg-success {
        width: 100%;
        & .icon-success {
          font-size: 100px;
          vertical-align: middle;
        }
      }
      & .btn {
        width: 100%;
        font-size: 18px;
        font-weight: 700;
      }
    }
  }
}
</style>