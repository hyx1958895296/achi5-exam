<template>
  <div class="dq">
    <el-select v-model="value1" placeholder="请选择">
      <el-option
        v-for="item in dzArr"
        :key="item.value"
        :label="item.name"
        :value="item.code"
      >
      </el-option>
    </el-select>
    <el-select v-show="dzArr2.length > 0" v-model="value2" placeholder="请选择">
      <el-option
        v-for="item in dzArr2"
        :key="item.value"
        :label="item.name"
        :value="item.code"
      >
      </el-option>
    </el-select>
    <el-select
      v-show="Array.isArray(dzArr3)"
      v-model="value3"
      placeholder="请选择"
    >
      <el-option
        v-for="item in dzArr3"
        :key="item.value"
        :label="item.name"
        :value="item.code"
      >
      </el-option>
    </el-select>
    <asdfasd></asdfasd>
    <div class="ml-5 bears flex-between">
      <div>熊出没</div>
      <div>神出没</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bears{
  margin-top: 20px;
  width: 150px;
}
</style>

<script>
import data from "@/js/citydata.json";
import asdfasd from "@/components/captchaComponent.vue";
export default {
  data() {
    return {
      dzArr: data, //省
      dzArr2: [], //市
      dzArr3: "", //区
      value1: "",
      value2: "",
      value3: "",
    };
  },
  components: {
    asdfasd,
  },
  methods: {
    checkSheng(code) {
      //dzArr是市的列表
      this.dzArr2 = data.find((item) => {
        return item.code == code;
      }).children;
    },
    checkShi(code) {
      try {
        this.dzArr3 = this.dzArr2.find((item) => {
          return item.code == code;
        }).children;
      } catch (e) {
        this.dzArr3 = this.dzArr2.find((item) => {
          return item.code == code;
        });
      }
    },
  },
  watch: {
    value1: function (val) {
      this.value1 = val;
      this.value2 = "";
      this.checkSheng(val);
    },
    value2: function (val) {
      this.value2 = val;
      this.value3 = "";
      this.checkShi(val);
    },
    value3: function (val) {
      this.value3 = val;
    },
  },
};
</script>