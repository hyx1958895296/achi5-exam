<template>
  <div class="information-personal">
    <div class="header">基本信息</div>
    <div class="main">
      <div class="main-item textalign-r">
        <div>账号昵称</div>
        <el-input
          placeholder="请输入账号昵称"
          v-model="information.accountInp"
          clearable
        />
      </div>
      <div class="main-item textalign-r">
        <div>真实姓名</div>
        <el-input
          placeholder="请输入真实姓名"
          v-model="information.nameInp"
          clearable
        />
      </div>

      <div class="main-item">
        <div class="textalign-r">性别</div>
        <div>
          <el-radio v-model="information.sex" :label="1">男</el-radio>
          <el-radio v-model="information.sex" :label="0">女</el-radio>
        </div>
      </div>

      <div class="main-item textalign-r">
        <div>手机号</div>
        <el-input
          placeholder="请输入手机号"
          v-model="information.phoneInp"
          clearable
        />
      </div>

      <div class="main-item textalign-r">
        <div>邮箱</div>
        <el-input
          placeholder="请输入邮箱"
          v-model="information.emailInp"
          clearable
        />
      </div>

      <div class="cascade textalign-r">
        <div class="cascade-text">所在地</div>
        <div class="cascade-box">
          <el-select v-model="information.proviceCode" placeholder="请选择省">
            <el-option
              v-for="item in province"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.code
              }}</span>
            </el-option>
          </el-select>
          <el-select v-model="information.cityCode" placeholder="请选择市">
            <el-option
              v-for="item in city"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.code
              }}</span>
            </el-option>
          </el-select>
          <el-select v-model="information.areaCode" placeholder="请选择区">
            <el-option
              v-for="item in area"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.code
              }}</span>
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="brief textalign-r">
        <div>简介</div>
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="information.textarea"
          maxlength="30"
          show-word-limit
          class="tarea"
        >
        </el-input>
      </div>
    </div>
    <div class="btns">
      <div></div>
      <div class="btn">
        <button type="button" class="save-btn" @click="updateUserInfo">
          保存
        </button>
        <button class="cancle-btn">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import citydata from "@/js/citydata.json";
import { updateUserInfoApi, getUserInfoApi } from "@/api/api";
console.log(citydata);
export default {
  data() {
    return {
      information: {
        accountInp: "",
        nameInp: "",
        sex: "",
        phoneInp: "",
        emailInp: "",
        textarea: "",
        proviceCode: "", //省编号
        cityCode: "", //市编号
        areaCode: "", //区编号
      },
      province: citydata, //省列表
      city: [], //市列表
      area: [], //县列表
      value: "",
    };
  },
  watch: {
    "information.proviceCode": function (code) {
      var res = this.province.find((item) => item.code == code);
      this.city = res && res.children ? res.children : [];
    },
    "information.cityCode": function (code) {
      var res = this.city.find((item) => item.code == code);
      this.area = res && res.children ? res.children : [];
    },
  },
  created() {
    this.getUserInfo();
  },

  methods: {
    //修改用户信息
    async updateUserInfo() {
      const params = {
        phone: this.information.phoneInp,
        email: this.information.emailInp,
        sex: this.information.sex,
        avatarName: this.information.accountInp,
        name: this.information.nameInp,
        provinceNo: this.information.proviceCode,
        cityNo: this.information.cityCode,
        areaNo: this.information.areaCode,
        townNo: "",
        desc: this.information.textarea,
      };
      let updateRes = await updateUserInfoApi(params);
      if (updateRes.status == 1) {
        this.$message({
          type: "success",
          message: "修改用户信息成功",
        });
      }
      console.log(updateRes);
    },
    //获取用户信息
    async getUserInfo() {
      let getRes = await getUserInfoApi();
      let data = getRes.data.data[0];
      this.information.accountInp = data.avatarName;
      this.information.nameInp = data.name;
      this.information.sex = data.sex;
      this.information.phoneInp = data.phone;
      this.information.emailInp = data.email;
      this.information.textarea = data.desc;
      this.information.proviceCode = data.provinceNo;
      this.information.cityCode = data.cityNo;
      this.information.areaCode = data.areaNo;
      if (getRes.status == 1) {
        this.$message({
          type: "success",
          message: "获取信息成功",
        });
      }
      console.log(getRes);
    },
  },
};
</script>

<style lang="scss" scoped>
.information-personal {
  background-color: #fff;
  height: calc(85vh);
  & .header {
    font-size: 20px;
    font-weight: 900;
    padding: 20px;
    color: #000;
    border-bottom: 2px solid rgb(247, 247, 247);
  }
  & .main {
    & .main-item {
      margin-top: 20px;
      font-size: 18px;
      color: #000;
      display: grid;
      gap: 20px 10px;
      grid-template-columns: 1fr 6fr;
      align-items: center;
      // text-align: right;
      & .el-input {
        width: 90%;
      }
      & .tarea {
        width: 90%;
      }
      & .sex {
        text-align: left;
      }
    }

    & .cascade {
      display: grid;
      grid-template-columns: 1.11fr 6fr;
      gap: 20px 10px;
      width: 91.5%;
      margin-top: 20px;
      align-items: center;
      & .cascade-text {
        text-align: right;
        font-size: 18px;
        color: #000;
      }
      & .cascade-box {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        justify-content: center;
        gap: 20px 10px;
      }
    }
    & .brief {
      margin-top: 20px;
      font-size: 18px;
      color: #000;
      display: grid;
      gap: 20px 10px;
      grid-template-columns: 1fr 6fr;
      // align-items: center;
      text-align: right;
      & .tarea {
        width: 90%;
      }
    }
  }
  & .btns {
    display: grid;
    gap: 20px 10px;
    grid-template-columns: 1fr 6fr;
    align-items: center;
    & .btn {
      display: grid;
      grid-template-columns: 80px 100px;
      margin-top: 20px;
      width: 90%;
      & .save-btn {
        padding: 8px 0px;
        color: #fdfffc;
        border-radius: 30px;
        border: 0;
        background-color: #1b79ff;
      }
      & .cancle-btn {
        padding: 8px 0px;
        color: #000;
        border-radius: 30px;
        border: 2px solid #e8e8e8;
        background-color: #ffffff;
        margin-left: 20px;
      }
    }
    // &
  }
}
</style>