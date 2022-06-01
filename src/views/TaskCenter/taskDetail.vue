<template>
  <div class="task-detail">
    <div class="title">任务详情</div>
    <div class="btns">
      <el-button size="medium">中等按钮</el-button>
      <el-button size="medium">中等按钮</el-button>
      <el-button size="medium">中等按钮</el-button>
      <el-button size="medium">中等按钮</el-button>
      <el-button size="medium">中等按钮</el-button>
    </div>
    <div v-for="(item, index) in detailTask" :key="index">
      <div class="pd-20">创建任务的名称：{{ item.taskName }}</div>
      <div class="pd-20">创建任务时间：{{ item.createdAt }}</div>
      <div class="assign-get-person pd-20">
        <div>全部领取过任务的人：</div>
        <div
          class="assign-get-person-list"
          v-for="(list, key) in item.receivedData"
          :key="key"
        >
          {{ list.userName }}
        </div>
      </div>
      <div class="pd-20">全部 只看日志 只看评论</div>
      <div class="pd-20">{{ item.userName }}：{{ item.createdAt }}</div>
      <div class="pd-20">{{ item.userName }}任务发布给了：</div>
      <div class="pd-20" v-for="(nav, index) in item.receivedData" :key="index">
        <div>{{ nav.userName }}</div>
      </div>
      <div class="pd-20">创建成功</div>
    </div>
    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入内容"
      v-model="textarea"
    >
    </el-input>
    <el-button class="mg-20" type="info">信息按钮</el-button>
  </div>
</template>

<script>
import { TaskDetailApi } from "@/api/api";
export default {
  data() {
    return {
      detailTask: [],
      textarea: "",
    };
  },
  methods: {
    async TaskDetail() {
      const taskId = sessionStorage.getItem("taskId");
      let res = await TaskDetailApi({ taskId });
      this.detailTask.push(res.data.data);
      console.log(this.detailTask);
    },
  },
  created() {
    this.TaskDetail();
  },
};
</script>

<style lang="scss" scoped>
.task-detail {
  padding: 20px;
  color: black;
  & .title {
    color: black;
  }
  & .btns {
    padding: 20px 0px 20px 0px;
    border-bottom: 1px solid red;
  }
  & .assign-get-person {
    display: flex;
    & .assign-get-person-list {
      padding-left: 5px;
    }
  }
}
</style>


