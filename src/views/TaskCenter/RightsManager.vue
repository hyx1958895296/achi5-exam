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
                <el-menu-item-group
                  :index="children.key"
                  v-for="children in item.children"
                  :key="children.key"
                >
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
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
              <el-tab-pane label="角色成员" name="first" class="tabs-style">
                <div class="custom-tree-container">
                  <div class="block">
                    <el-tree
                      :data="data"
                      show-checkbox
                      node-key="id"
                      default-expand-all
                      :expand-on-click-node="false"
                    >
                      <span class="custom-tree-node" slot-scope="{ data }">
                        <span>{{ data.title }}</span>
                        <span>
                          <el-button
                            type="text"
                            size="mini"
                            @click="dialogVisibleTrue(data.id)"
                          >
                            Append
                          </el-button>
                          <el-button
                            type="text"
                            size="mini"
                            @click="remove(data)"
                          >
                            Delete
                          </el-button>
                        </span>
                      </span>
                    </el-tree>
                  </div>
                </div>
              </el-tab-pane>
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
    <el-dialog title="创建权限" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-input v-model="form.type" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="permissionCreate()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  RoleGroupListApi,
  RoleListApi,
  permissionListApi,
  permissionCreateApi,
  permissionDeleteApi,
} from "@/api/api";
export default {
  data() {
    return {
      activeName: "",
      defaultActive: "",
      menu: [],
      data: [],
      id: "",
      ids: [],
      dialogFormVisible: false,
      form: {
        title: "",
        type: "",
      },
      formLabelWidth: "120px",
    };
  },
  created() {
    this.getMenuList();
    this.getPromissionList();
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

    async getPromissionList() {
      let res = await permissionListApi({ pagination: false });
      let list = res.data.data.rows;
      list.forEach(
        (item) =>
          (item.children = list.filter((childItem) => childItem.pid == item.id))
      );
      this.data = list.filter((item) => !item.pid);
      console.log(res);
      // this.ids.push(list.id);
      // if(!list.children ) return
      //   list.children.forEach(item=>{
      //     getPromissionList(item);
      //   })
    },
    dialogVisibleTrue(id) {
      this.id = id;
      this.dialogFormVisible = true;
    },
    async permissionCreate() {
      let res = await permissionCreateApi({
        title: this.form.title,
        type: this.form.type,
        pid: this.pid,
      });
      console.log(res);
      this.dialogFormVisible = false;
      this.getPromissionList();
    },
    remove(data) {
      // console.log(node);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let ids = this.getSelectedIds(data);
          this.getPermissionDelete(ids);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    getSelectedIds(data) {
      let res = [data.id];
      data.children.forEach((item) => {
        if (item.children.length) {
          let ids = this.getSelectedIds(item);
          if (ids.length) res.push(...ids);
        }
        res.push(item.id);
      });
      return res;
    },
    async getPermissionDelete(id) {
      let res = await permissionDeleteApi({
        id,
      });
      if (res.data.status == 1) {
        this.getPromissionList();
      }
    },
    async getMenuList() {
      let [roleListResult, roleGroupListResult] = await Promise.all([
        RoleGroupListApi(),
        RoleListApi(),
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
      console.log(roleGroupList);
      this.menu = roleGroupList;
      // this.defaultActive = roleGroupList[0].children[0].key;
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
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>