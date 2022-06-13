<template>
  <div>
    <div class="home">
      <h1>创建任务</h1>
      <task-form ref="task" v-on:submit="onSubmit"></task-form>
      <el-dialog title="提示" :visible.sync="dialogVisible">
        <span>推送任务成功</span>
        <span slot="footer" class="dialog-footer">
          <el-button
            @click="
              dialogVisible = false;
              skip();
            "
            >查看任务列表</el-button
          >
          <el-button type="primary" @click="empty()">继续创建</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import taskForm from "@/components/taskFormComponent.vue";
import {
  taskCreateApi,
  taskReleaseApi,
  getUserListApi,
  taskListApi,
} from "@/api/api";
export default {
  data() {
    return {
      dialogVisible: false,
      users: [],
      params: [],
    };
  },
  components: {
    taskForm,
  },
  created() {
    this.getUserList();
  },
  methods: {
    skip() {
      this.$router.push("taskList");
    },
    empty() {
      this.$refs.task.form = {};
      this.dialogVisible = false;
    },

    async taskList() {
      let { pageSize, pageNum } = this;
      let res = await taskListApi({
        pageSize,
        pageNum,
      });
      this.tableData = res.data.data.rows;
      this.totalCount = res.data.data.count;
    },
    async getUserList() {
      let res = await getUserListApi({ pagination: false });
      console.log(res);
      this.users = res.data.data.data.rows;
      console.log(this.users);
    },
    async getTask(taskId) {
      let res = await taskReleaseApi({
        userIds: this.params,
        taskId,
      });

      if (res.data.status == 1) {
        this.taskList();
      }
    },
    async onSubmit(form) {
      if (form.name == "") {
        this.$message({
          type: "warning",
          message: "任务名称不能为空",
        });
      }
      this.params = form.userIds;
      form.duration = parseInt(form.duration);
      let { name, level, desc, duration } = form;
      let res = await taskCreateApi({
        name,
        level: level ? 1 : 0,
        desc,
        duration,
      });
      // console.log(res);
      let taskcreateId = res.data.data[0].id;
      if (res.data.status == 1) {
        this.$message({
          type: "success",
          message: "创建成功",
        });
        this.getTask(taskcreateId);
        this.dialogVisible = true;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  width: 40%;
  & h1 {
    margin: 10px;
  }
}
</style>