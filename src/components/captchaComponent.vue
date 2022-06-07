<template>
  <div class="mt-10 verification">
    <el-input v-model="captcha" @change="changeCaptcha"></el-input>
    <img @click="getCaptcha()" :src="captchaSrc" alt="" />
  </div>
</template>

<script>
import { getCaptchaApi } from "@/api/api";
export default {
  data() {
    return {
      captchaSrc: "/api/captcha",
      captcha: "",
    };
  },
  methods: {
    getCaptcha() {
      //这里面有一个缓存的概念
      this.captchaSrc = getCaptchaApi();
    },
    changeCaptcha() {
      this.$emit("change-captch", this.captcha);
    },
  },
};
</script>

<style>
</style>