<template>
  <div class="task-create">
    <div class="header">创建任务</div>
    <div class="main">
      <div class="main-item textalign-r">
        <div>任务名称</div>
        <el-input placeholder="请输入任务名称" v-model="form.name" clearable />
      </div>
      <div class="main-item textalign-r">
        <div>任务时长</div>
        <el-input placeholder="请输入任务时长" v-model="form.input" clearable />
      </div>
      <div class="brief textalign-r">
        <div>任务描述</div>
        <el-input
          type="textarea"
          placeholder="请输入任务描述"
          v-model="form.desc"
          maxlength="30"
          show-word-limit
          class="tarea"
        >
        </el-input>
      </div>
      <div class="main-item textalign-r">
        <div>执行人</div>
        <el-select
          v-model="select"
          multiple
          filterable
          allow-create
          default-first-option
          class="executor"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="main-item textalign-r">
        <div>是否紧急</div>
        <el-switch v-model="form.delivery"></el-switch>
      </div>
    </div>
    <div class="btns">
      <div></div>
      <div class="btn">
        <el-button type="success" @click="showDialog">立即创建</el-button>
        <el-button type="info" class="cancle-btn">取消</el-button>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>创建成功</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancleDialog()">继续创建</el-button>
        <el-button @click="navigator('taskList')">查看我的任务列表</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserListApi, taskCreateApi, taskReleaseApi } from "@/api/api";
export default {
  data() {
    return {
      form: {
        name: "",
        delivery: false,
        input: "",
        desc: "",
      },
      options: [],
      select: [],
      dialogVisible: false,
      value: "",
      realeaseTask: "",
    };
  },
  created() {
    this.getUserList();
    console.log('我是废物');
    this.taskRelease();
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    async getUserList() {
      var pagination = false;
      let res = await getUserListApi({ pagination });
      this.options = res.data.data.data.rows;
      console.log(this.options);
      console.log(res);
    },
    async createTask() {
      this.dialogVisible = true;
      let res = await taskCreateApi({
        name: this.form.name,
        desc: this.form.desc,
        duration: this.form.input,
        level: this.form.delivery,
      });
      if (res.data.status == 1) {
        this.realeaseTask=res.data.data[0].id
        this.taskRelease();
        console.log(this.realeaseTask);
      }
      console.log(res);
    },
    async taskRelease() {
      let taskRelease = await taskReleaseApi({
        userId: this.select,
        taskId: this.realeaseTask,
      });
      this.realeaseTask = taskRelease.data.data.id;
      console.log(this.realeaseTask);
    },
    showDialog() {
      this.dialogVisible = true;
      this.createTask();
    },
    cancleDialog() {
      this.dialogVisible = false;
      this.form = {
        name: "",
        delivery: false,
        input: "",
        desc: "",
      };
      this.select = "";
    },
    navigator(name) {
      if (this.$router.currentRoute.name == name) return;
      this.$router.push({
        name: name,
      });
    },
  },
};
</script>

<style scoped lang='scss'>
.task-create {
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
      & .el-input {
        width: 90%;
      }
      & .flag-emergency {
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
      grid-template-columns: 100px 100px;
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
        border: 2px solid #e8e8e8;
        margin-left: 20px;
      }
    }
  }
}
</style>