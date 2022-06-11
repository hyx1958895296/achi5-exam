<template>
  <div>
    <div class="home">
      <h1>创建任务</h1>
      <task-form ref="task" v-on:submit="onSubmit"></task-form>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
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
import { taskCreateApi } from "@/api/api";
export default {
  data() {
    return {
      dialogVisible: false,
    };
  },
  components: {
    taskForm,
  },
  methods: {
    skip() {
      this.$router.push("taskList");
    },
    empty() {
      this.$refs.task.form = {};
      this.dialogVisible = false;
    },
    async onSubmit(form) {
      form.duration = parseInt(form.duration);
      let { name, level, desc, duration } = form;
      let res = await taskCreateApi({
        name,
        level: level ? 1 : 0,
        desc,
        duration,
      });
      if (res.data.status == 1) {
        this.$message({
          type: "success",
          message: "创建成功",
        });
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