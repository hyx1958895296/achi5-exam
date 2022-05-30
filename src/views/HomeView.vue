<template>
  <!-- git@github.com:hyx1958895296/aich5-vue-cms.git -->
  <div class="home">
    <el-container>
      <el-header>
        <div class="header-content">
          <div class="header-title-left">
            <img src="../assets/menu.png" class="icon-logo" />
            <span>EXAMSYSTEM</span>
          </div>
          <div class="header-right flex-center">
            <div>
              <span class="address ml-5">武汉市</span>
              <span class="date ml-5">2017-07-20 15:00</span>
              <span class="week ml-5">星期三</span>
              <span class="temperature ml-5">21~22℃</span>
              <span class="weather ml-5">晴</span>
              <span class="wind-power ml-5">风力 112级</span>
              <span class="wind-direction ml-5">风向 北风</span>
              <el-avatar
                :size="50"
                :src="circleUrl"
                class="avatar ml-20"
              ></el-avatar>
              <span class="username">{{ username }}</span>
            </div>
            <div class="">
              <img
                src="../assets/exit.png"
                height="30px"
                class="icon-exit ml-20"
              />
              <span class="ml-5" @click="loginout">退出</span>
            </div>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside style="width:220px">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#0b1b34"
            @open="handleOpen"
            @close="handleClose"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>题库管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">HTML题库</el-menu-item>
                <el-menu-item index="1-2">CSS题库</el-menu-item>
                <el-menu-item index="1-3" @click="navigator('jsquestionbank')"
                  >JS题库</el-menu-item
                >
                <el-menu-item index="1-4">VUE题库</el-menu-item>
                <el-menu-item index="1-5">react题库</el-menu-item>
                <el-menu-item index="1-6">mini program题库</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="2" @click="navigator('about')">
              <i class="el-icon-setting"></i>
              <span slot="title">刷题系统</span>
            </el-menu-item>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>账号设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1" @click="navigator('personaldetail')"
                  >个人信息</el-menu-item
                >
                <el-menu-item index="2-2">修改头像</el-menu-item>
                <el-menu-item index="2-3">修改密码</el-menu-item>
                <el-menu-item index="2-4">账号绑定</el-menu-item>
                <el-menu-item index="2-5" @click="navigator('worker')"
                  >聊天页面</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>任务中心</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-2" @click="navigator('taskCreate')"
                  >创建任务</el-menu-item
                >
                <el-menu-item index="3-3" @click="navigator('taskList')"
                  >查看任务列表</el-menu-item
                >
                <el-menu-item index="3-4" @click="navigator('taskDetail')"
                  >任务详情</el-menu-item
                >
                <el-menu-item index="3-5" @click="navigator('createrole')"
                  >创建角色</el-menu-item
                >
                <el-menu-item index="3-6" @click="navigator('roleList')"
                  >角色列表</el-menu-item
                >
                <el-menu-item index="3-7" @click="navigator('rolemanager')"
                  >角色管理</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="clear-style">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.el-container {
  .el-header {
    padding: 0;
    background-color: #438fed;
    color: #f2fff5;
    height: 60px;
    line-height: 60px;
    & .header-content {
      // width: 90%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      & .header-title-left {
        font-size: 16px;
        padding: 0 40px;
        & .icon-logo {
          vertical-align: middle;
          padding-right: 10px;
        }
      }
      & .header-right {
        & .avatar {
          vertical-align: middle;
        }
        & .username {
          padding-left: 10px;
        }
        & .icon-exit {
          vertical-align: middle;
        }
      }
    }
  }

  .el-aside {
    background-color: #0b1b34;
    color: #fcffff;
    text-align: center;
    width: 100px;
    height: calc(100vh - 60px);
  }

  .el-main {
    background-color: #f2f2f2;
    color: #a7a7a7;
    height: calc(100vh - 60px);
    margin: 0 auto;
    padding: 0;
  }
}
</style>

 <script>
import { getUserInfoApi, logoutApi } from "@/api/api";
export default {
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      sizeList: ["large", "medium", "small"],
      username: "",
    };
  },
  async created() {
    let res = await getUserInfoApi();
    this.username = res.data.data[0].phone;
    if (res.data.status == 401) {
      this.$router.push("/login");
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    navigator(name) {
      if (this.$router.currentRoute.name == name) return;
      this.$router.push({
        name: name,
      });
    },
    async loginout() {
      let logOutRes = await logoutApi();
      if (logOutRes.status == 200) {
        sessionStorage.removeItem("token");
        this.navigator("login");
      }
    },
  },
};
</script>
