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
        <div class="mt-10 verification">
          <el-input v-model="captcha"></el-input>
          <el-captcha ref="captcha"></el-captcha>
        </div>
        <div class="flex-between jump mt-10">
          <div class="lost-password">忘记密码</div>
          <div class="sign-in" @click="$navigator('register')">
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
import captchaComponent from "@/components/captchaComponent.vue";
import { loginApi, getCaptchaApi } from "@/api/api";
import { encrypt } from "@/assets/utils/util";
export default {
  data() {
    return {
      username: "",
      password: "",
      captcha: "",
    };
  },
  components: {
    "el-captcha": captchaComponent,
  },
  methods: {
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
        username: username,
        password: encrypt(password),
        captcha: captcha,
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
          message: res.data.msg,
        });
        this.getCaptcha();
      }
      this.$refs.captcha.getCaptcha();
    },
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
