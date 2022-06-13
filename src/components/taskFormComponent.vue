<template>
  <div class="task-create">
    <el-form ref="form" :model="form" label-width="70px" class="form">
      <el-form-item label="任务名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="任务时长">
        <div class="align-center">
          <el-input
            class="time"
            type="text"
            step="2"
            @blur="inputChange"
            v-model="form.duration"
          ></el-input>
          <span>小时</span>
        </div>
      </el-form-item>
      <el-form-item label="任务说明">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="执行人">
        <el-select v-model="form.userIds" multiple placeholder="请选择">
          <el-option
            :label="user.name"
            v-for="user in users"
            :value="user.id"
            :key="user.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否紧急">
        <el-switch v-model="form.level"></el-switch>
      </el-form-item>
    </el-form>
    <div class="btns pl-20">
      <div></div>
      <div class="btn">
        <el-button type="success" @click="onSubmit(), (dialogVisible = true)"
          >确定</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getUserListApi, TaskDetailApi } from "@/api/api";
export default {
  data() {
    return {
      form: {},
      users: [],
      dialogVisible: false,
    };
  },
  props: ["data"], //父组件传过来的data
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.data != undefined) {
        let { taskName, desc, duration, level } = this.data;
        this.form = {
          name: taskName,
          desc,
          duration,
          level: level == 1 ? true : false,
        };
        this.getTaskDetail();
      } else {
        this.getUserList();
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    empty() {
      this.form.name = "";
      this.form.duration = "";
      this.form.desc = "";
      this.form.userIds = "";
      this.form.level = false;
    },
    skip() {
      this.$router.push({
        name: "tasklist",
      });
    },
    async onSubmit() {
      this.$emit("submit", this.form);
    },

    async getTaskDetail() {
      let [userList, taskDetail] = await Promise.all([
        getUserListApi({ pagination: false }),
        TaskDetailApi({ taskId: this.data.id }),
      ]);

      userList = userList.data.data.data.rows;
      let receivedData = taskDetail.data.data.receivedData;

      console.log("----------------------");
      console.log(userList); //全部人
      console.log(receivedData); //领取过任务的人

      var unCheckedUsers = JSON.parse(JSON.stringify(userList));
      receivedData.forEach((users) => {
        unCheckedUsers = unCheckedUsers.filter(
          (item) => users.userId != item.id
        );
      });
      console.log(unCheckedUsers); //未领取任务的人
      this.users = unCheckedUsers;
    },
    async getUserList() {
      let res = await getUserListApi();
      console.log(res);
      this.users = res.data.data.data.rows;
      console.log(this.users);
    },
  },
};
</script>

<style lang="scss" scoped>
.time {
  width: 40%;
}
</style>