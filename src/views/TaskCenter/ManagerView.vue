<template>
  <div class="wrap">
    <div class="custom-tree-container">
      <h1 class="pl-20 title">权限配置</h1>
      <div class="pl-20">
        <el-button type="primary" plain @click="append(data)"
          >创建root权限</el-button
        >
      </div>
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
              <el-button type="text" size="mini" @click="() => append(data)">
                添加
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="() => remove(data)"
                v-if="!data.children.length"
              >
                删除
              </el-button>
              <el-button type="text" size="mini" @click="() => update(data)">
                修改
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
      <el-dialog title="创建权限" :visible.sync="dialogVisible">
        <el-form :model="form">
          <el-form-item label="标题" :label-width="formLabelWidth">
            <el-input v-model="form.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型" :label-width="formLabelWidth">
            <el-select v-model="form.type" placeholder="请选择类型">
              <el-option label="左侧栏" value="1"></el-option>
              <el-option label="页面" value="2"></el-option>
              <el-option label="功能" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="permissionCreate()"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <el-dialog title="修改权限" :visible.sync="dialogUpdateVisible">
        <el-form :model="updateForm">
          <el-form-item label="标题" :label-width="formLabelWidth">
            <el-input v-model="updateForm.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型" :label-width="formLabelWidth">
            <el-select v-model="updateForm.type" placeholder="请选择活动区域">
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :value="item.id"
              >
                {{ item.label }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item label="所在目录" :label-width="formLabelWidth">
            <el-select v-model="updateForm.pid" placeholder="请选择活动区域">
              <el-option
                v-for="item in selectData"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogUpdateVisible = false">取 消</el-button>
          <el-button type="primary" @click="permissionUpdate">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  permissionListApi,
  permissionCreateApi,
  permissionDeleteApi,
  permissionUpdateApi,
} from "@/api/api";
export default {
  data() {
    return {
      data: [],
      form: {
        // title: "",
        // type: "",
        id: null,
        title: "",
        type: 1,
        pid: null,
      },
      typeList: [
        {
          id: 1,
          label: "左侧栏",
        },
        {
          id: 2,
          label: "页面",
        },
        {
          id: 3,
          label: "功能",
        },
      ],
      dialogVisible: false,
      formLabelWidth: "120px",
      updateForm: {
        title: "",
        type: "",
        pid: "",
      },
      id: "",
      selectData: [],
      dialogUpdateVisible: false,
    };
  },
  created() {
    this.getPromissionList();
  },
  methods: {
    //权限列表
    async getPromissionList() {
      let res = await permissionListApi({ pagination: false });
      let list = res.data.data.rows;
      this.selectData = res.data.data.rows;
      console.log(this.selectData);
      list.forEach(
        (item) =>
          (item.children = list.filter((childItem) => childItem.pid == item.id))
      );
      this.data = list.filter((item) => !item.pid);
    },
    //添加
    append(data) {
      this.form.id = data.id;
      this.dialogVisible = true;
    },
    //创建
    async permissionCreate() {
      let res = await permissionCreateApi({
        title: this.form.title,
        type: this.form.type,
        pid: this.form.id,
      });
      console.log(res);
      this.dialogVisible = false;
      this.form = {};
      this.getPromissionList();
    },
    //删除
    remove(data) {
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
    //拿到删除数据
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
    //删除接口
    async getPermissionDelete(id) {
      let res = await permissionDeleteApi({
        id,
      });
      if (res.data.status == 1) {
        this.getPromissionList();
      }
    },
    //修改提示框
    update(data) {
      this.id = data.id;
      this.updateForm = data;
      this.dialogUpdateVisible = true;
    },
    //修改接口
    async permissionUpdate() {
      let res = await permissionUpdateApi({
        title: this.updateForm.title,
        type: this.updateForm.type,
        pid: this.updateForm.pid,
        id: this.id,
      });
      console.log(res);
      this.dialogUpdateVisible = false;
      this.getPromissionList();
    },
  },
};
</script>

<style scoped lang="scss">
.wrap {
  background-color: white;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.block {
  width: 500px;
}
.title {
  color: black;
}
.el-button {
  margin-bottom: 10px;
}
</style>