<template>
  <div class="wrap">
    <el-container>
      <el-header>
        <div class="align-center header">
          <span class="el-icon-user"></span>
          <div>角色管理</div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="300px">
          <div
            class="aside-top align-center"
            style="border-right: 1px solid #ebeff1"
          >
            <div
              class="col-blue align-center"
              @click="$navigator('createrole')"
            >
              <span class="el-icon-user pl-20"></span>
              <div class="ml-5">新增角色</div>
            </div>
            <div class="col-blue align-center pl-20">
              <span class="el-icon-user"></span>
              <div class="ml-5">新建分组</div>
            </div>
          </div>
          <div class="aside-bottom">
            <el-menu
              :default-active="defaultActive"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-submenu :index="item.key" v-for="item in menu" :key="item.id">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{ item.groupName }}</span>
                </template>
                <el-menu-item
                  :index="children.key"
                  v-for="children in item.children"
                  :key="children.id"
                  >{{ children.roleName }}
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </el-aside>
        <el-main>
          <div class="align-center">
            <div class="col-gray">所有者</div>
            <div class="ml-15">
              系统默认角色，默认具有企业所有功能权限和全部数据可见范围
            </div>
          </div>
          <div class="pd-20">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <div class="pd-20">
                设置角色对应的功能操作，应用管理，后台管理权限
              </div>
              <el-tab-pane label="角色成员" name="first" class="tabs-style">
                sdfjksdjofodjewfed
              </el-tab-pane>
              <el-tab-pane label="功能权限" name="second" class="tabs-style">
                <div class="second-tab-pane">
                  <div class="parent-model flex mt-20">
                    <input type="checkBox" />
                    <div>任务中心</div>
                  </div>
                  <div class="children-modle">
                    <div class="flex mt-10">
                      <input type="checkBox" />
                      <div>我的任务</div>
                    </div>
                    <div class="flex mt-10">
                      <input type="checkBox" />
                      <div>创建任务</div>
                    </div>
                    <div class="flex mt-10">
                      <input type="checkBox" />
                      <div>任务列表</div>
                    </div>
                  </div>
                </div>

                <div class="second-tab-pane">
                  <div class="parent-model flex mt-20">
                    <input type="checkBox" />
                    <div>题库管理</div>
                  </div>
                  <div class="children-modle">
                    <div class="flex mt-10">
                      <input type="checkBox" />
                      <div>js题库</div>
                    </div>
                  </div>
                </div>
                <div class="second-tab-pane">
                  <div class="parent-model flex mt-20">
                    <input type="checkBox" />
                    <div>任务中心</div>
                  </div>
                  <div class="children-modle">
                    <div class="flex mt-10">
                      <input type="checkBox" />
                      <div>我的任务</div>
                    </div>
                    <div class="flex mt-10">
                      <input type="checkBox" />
                      <div>创建任务</div>
                    </div>
                    <div class="flex mt-10">
                      <input type="checkBox" />
                      <div>任务列表</div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane
                label="数据范围"
                name="third"
                class="tabs-style"
              ></el-tab-pane>
            </el-tabs>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { RoleGroupListApi, RoleListApi } from "@/api/api";
export default {
  data() {
    return {
      activeName: "",
      defaultActive: "",
      menu: [],
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    async getMenuList() {
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
      this.menu = roleGroupList;
      this.defaultActive = roleGroupList[0].children[0].key;
    },
  },
};
</script>

<style>
.el-header {
  margin: 0;
  padding: 0;
  height: 0px;
}
.wrap {
  background-color: #fff;
  box-sizing: border-box;
}
.header {
  color: #c5cad1;
  font-size: 20px;
  padding: 20px;
  border-bottom: 1px solid #ebeff1;
}
.aside-top {
  padding: 20px;
}
.aside-bottom {
  height: 100vh;
}
.col-blue {
  color: #4c8edd;
}
.col-gray {
  color: #727f90;
  font-size: 20px;
}
.tabs-style {
  padding: 0px 20px 0px 20px;
  border-left: 2px solid #eef3fc;
  border-right: 2px solid #eef3fc;
  border-top: 2px solid #eef3fc;
  box-sizing: border-box;
}
.nav {
  display: grid;
  grid-template-columns: 1fr 6fr;
  border-bottom: 2px solid #eef3fc;
}
.grid-layout {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-left: 2px solid #eef3fc;
  justify-items: start;
}
.flex-just-cont-start {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.children-modle {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
}
</style>