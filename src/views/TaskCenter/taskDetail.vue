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
      <div>创建任务人的名称：{{ item.taskName }}</div>
      <div>创建任务时间：{{ item.createdAt }}</div>
      <div class="assign-get-person">
        <div>全部领取过任务的人：</div>
        <div
          class="assign-get-person-list"
          v-for="(list, key) in item.receivedData"
          :key="key"
        >
          {{ list.userName }}
        </div>
      </div>
      <div>全部 只看日志 只看评论</div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
import { TaskDetailApi } from "@/api/api";
export default {
  data() {
    return {
      detailTask: [],
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