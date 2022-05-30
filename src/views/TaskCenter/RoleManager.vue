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
            <div class="col-blue align-center">
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
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>默认</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">所有者</el-menu-item>
                  <el-menu-item index="1-2">管理员</el-menu-item>
                  <el-menu-item index="1-3">部门主管</el-menu-item>
                  <el-menu-item index="1-4">成员</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>职务</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1">所有者</el-menu-item>
                  <el-menu-item index="2-2">管理员</el-menu-item>
                  <el-menu-item index="2-3">部门主管</el-menu-item>
                  <el-menu-item index="2-4">成员</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>总监</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="3-1">所有者</el-menu-item>
                  <el-menu-item index="3-2">管理员</el-menu-item>
                  <el-menu-item index="3-3">部门主管</el-menu-item>
                  <el-menu-item index="3-4">成员</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>区域</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="4-1">所有者</el-menu-item>
                  <el-menu-item index="4-2">管理员</el-menu-item>
                  <el-menu-item index="4-3">部门主管</el-menu-item>
                  <el-menu-item index="4-4">成员</el-menu-item>
                </el-menu-item-group>
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
              <el-tab-pane label="角色成员" name="first" class="tabs-style"
                >adfasdasd</el-tab-pane
              >
              <el-tab-pane label="功能权限" name="second" class="tabs-style">
                <div class="second-tab-pane">
                  <div class="nav">
                    <div class="flex-just-cont-start">
                      <input type="checkBox" />
                      <div class="item ml-5">消息</div>
                    </div>
                    <div class="grid-layout pd-20">
                      <div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="nav">
                    <div class="flex-just-cont-start">
                      <input type="checkBox" />
                      <div class="item ml-5">消息</div>
                    </div>
                    <div class="grid-layout pd-20">
                      <div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="nav">
                    <div class="flex-just-cont-start">
                      <input type="checkBox" />
                      <div class="item ml-5">消息</div>
                    </div>
                    <div class="grid-layout pd-20">
                      <div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="nav">
                    <div class="flex-just-cont-start">
                      <input type="checkBox" />
                      <div class="item ml-5">消息</div>
                    </div>
                    <div class="grid-layout pd-20">
                      <div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                        <div class="flex-center">
                          <input type="checkBox" />
                          <div class="item ml-5">消息</div>
                        </div>
                      </div>
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
export default {
  data() {
    return {
      activeName: "",
    };
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
</style>