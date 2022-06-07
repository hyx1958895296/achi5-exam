<template>
  <div class="task-list">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="任务id" width="70">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="任务名称" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.taskName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建者" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.userName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="紧急程度" width="120">
        <template slot-scope="scope">
          <span style="color: red" v-if="scope.row.level == 1">紧急</span>
          <span style="color: black" v-else>不紧急</span>
        </template>
      </el-table-column>

      <el-table-column label="任务描述" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.desc }}</span>
        </template>
      </el-table-column>

      <el-table-column label="任务领取状态" width="120">
        <template slot-scope="scope">
          <span style="color: red" v-if="scope.row.isReceived == 1"
            >已领取</span
          >
          <span style="color: black" v-else>未领取</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280">
        <template slot-scope="scope">
          <el-button size="mini" @click="TaskDetail(scope.row.id)">任务详情</el-button>
          <el-button size="mini" type="danger">修改任务</el-button>
          <el-button
            size="mini"
            type="danger"
            v-show="scope.row.isReceived == 0"
            @click="getTask(scope.row.id)"
            >领取任务</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[10, 2, 5, 20]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    >
    </el-pagination>
  </div>
</template>
<script>
import {
  taskListApi,
  TaskDetailApi,
  taskReleaseApi,
  getUserInfoApi,
} from "@/api/api";
// import Cache from '@/assets/utils/cache'
// let cache=new Cache();

export default {
  data() {
    return {
      tableData: [],
      pageNum: 1,
      totalCount: 0,
      option: [],
      realeaseTask: "",
      params: [],
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.taskList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.taskList();
    },
    async getUserInfo() {
      let res = await getUserInfoApi();
      this.option = res.data.data.id;
      this.params = [this.option];
    },
    async taskList() {
      const { pageSize, pageNum } = this;
      let res = await taskListApi({
        pagination: true,
        pageSize,
        pageNum,
      });
      this.tableData = res.data.data.rows;
      this.totalCount = res.data.data.count;
    },
    async TaskDetail(taskId) {

      let res = await TaskDetailApi({
        taskId,
      });
      console.log(res);
      sessionStorage.setItem("taskId", taskId);
      this.$router.push("/taskDetail")
    },
    jumpTaskDetail() {
      this.getTask(this.taskId);
      this.$router.push("/taskDetail");
      // this.$navigator("taskDetail");
    },
    async getTask(taskId) {
      let res = await taskReleaseApi({
        userId: this.params,
        taskId,
      });

      if (res.data.status == 1) {
        this.taskList();
      }
    },
  },
  created() {
    this.getUserInfo();
    this.taskList();
  },
};
</script>
<style scoped lang='scss'>
.task-list {
  background-color: #ffff;
  height: 91vh;
  padding: 20px;
  box-sizing: border-box;
}
</style>