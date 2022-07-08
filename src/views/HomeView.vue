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
          <div class="header-right flex">
            <div>
              <span class="address ml-5">武汉市</span>
              <span class="date ml-5">2017-07-20 15:00</span>
              <span class="week ml-5">星期三</span>
              <span class="temperature ml-5">21~22℃</span>
              <span class="weather ml-5">晴</span>
              <span class="wind-power ml-5">风力 112级</span>
              <span class="wind-direction ml-5">风向 北风</span>
            </div>
            <div class="align-center avatar-and-name">
              <el-avatar
                :size="50"
                :src="circleUrl"
                class="avatar ml-20"
              ></el-avatar>
              <span class="username">{{ username }}</span>
            </div>
            <div>
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
        <el-aside style="width: 220px">
          <el-menu
            unique-opened
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
                <el-menu-item index="1-3" @click="$navigator('jsquestionbank')"
                  >JS题库</el-menu-item
                >
                <el-menu-item index="1-4">VUE题库</el-menu-item>
                <el-menu-item index="1-5">react题库</el-menu-item>
                <el-menu-item index="1-6">mini program题库</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">刷题系统</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  index="2-1"
                  @click="$navigator('questionbanklistview')"
                  >题库列表</el-menu-item
                >
                <el-menu-item
                  index="2-2"
                  @click="$navigator('createquestionview')"
                  >创建题</el-menu-item
                >
                <el-menu-item
                  index="2-3"
                  @click="$navigator('deletequestionview')"
                  >删除题</el-menu-item
                >
                <el-menu-item
                  index="2-4"
                  @click="$navigator('updatequestionview')"
                  >修改题</el-menu-item
                >
                <el-menu-item
                  index="2-5"
                  @click="$navigator('questiondetailview')"
                  >题目详情</el-menu-item
                >
                <!-- <el-menu-item index="2-4" @click="$navigator('shengview')"></el-menu-item>
                <el-menu-item index="2-5" @click="$navigator('shengview')"></el-menu-item> -->
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>账号设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1" @click="$navigator('personaldetail')"
                  >个人信息</el-menu-item
                >
                <el-menu-item index="2-2">修改头像</el-menu-item>
                <el-menu-item index="2-3">修改密码</el-menu-item>
                <el-menu-item index="2-4">账号绑定</el-menu-item>
                <el-menu-item index="2-5" @click="$navigator('worker')"
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
                <el-menu-item index="3-2" @click="$navigator('taskCreate')"
                  >创建任务</el-menu-item
                >
                <el-menu-item index="3-3" @click="$navigator('taskList')"
                  >查看任务列表</el-menu-item
                >
                <el-menu-item index="3-4" @click="$navigator('taskDetail')"
                  >任务详情</el-menu-item
                >
                <el-menu-item index="3-5" @click="$navigator('createrole')"
                  >新增角色</el-menu-item
                >
                <el-menu-item index="3-6" @click="$navigator('roleList')"
                  >角色列表</el-menu-item
                >
                <el-menu-item index="3-7" @click="$navigator('rolemanager')"
                  >权限管理</el-menu-item
                >
                <el-menu-item index="3-8" @click="$navigator('managerview')"
                  >Tree属性控件</el-menu-item
                >
                <el-menu-item index="3-9" @click="$navigator('setavatar')"
                  >设置头像</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="4" @click="$navigator('shengview')">
              <i class="el-icon-setting"></i>
              <span slot="title">省市级联</span>
            </el-menu-item>
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
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      min-width: 1150px;
      & .header-title-left {
        font-size: 16px;
        padding: 0 40px;
        & .icon-logo {
          vertical-align: middle;
          padding-right: 10px;
        }
      }
      & .header-right {
        height: 60px;
        & .avatar-and-name {
          width: 150px;
        }
        & .aa {
          display: flex;
          align-items: center;
        }
        & .avatar {
          width: 100px;
          height: 50px;
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
  .clear-style {
    background-color: white;
  }
}
::-webkit-scrollbar {
  width: 0px;
}
</style>

 <script>
import { getUserInfoApi, logoutApi } from "@/api/api";
export default {
  data() {
    return {
      circleUrl:
        "http://unier.oss-cn-beijing.aliyuncs.com/avatar/c5d7dbaf-730f-4b04-9f9d-c78a1c53f98e.png",
      sizeList: ["large", "medium", "small"],
      username: "",
    };
  },

  async created() {
    let res = await getUserInfoApi();
    console.log(res);
    this.username = res.data.data.name;
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
    async loginout() {
      let logOutRes = await logoutApi();
      if (logOutRes.status == 200) {
        sessionStorage.removeItem("token");
        this.$router.push("/");
      }
    },
  },
};
</script>
