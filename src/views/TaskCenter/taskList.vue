<template>
  <div class="create-task">
    <h1 class="title-1">任务列表</h1>
    <div class="wrap mt-20 table">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="id" align="center" width="70">
        </el-table-column>
        <el-table-column prop="taskName" label="任务名称" width="80">
        </el-table-column>
        <el-table-column label="是否紧急" align="center" width="80">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level == 1" type="danger">紧急</el-tag>
            <el-tag v-else>普通</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="任务时长" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.duration }}小时</span>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" align="center">
        </el-table-column>
        <el-table-column label="任务描述" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.desc">{{ scope.row.desc }}</div>
            <div v-else class="c-909090">暂无描述</div>
          </template>
        </el-table-column>
        <el-table-column label="是否领取" align="center" width="80">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.isReceived == 1"
              >已领取</el-tag
            >
            <el-tag type="warning" v-else>未领取</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="320">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleEdit(scope.$index, scope.row)"
              size="small"
            >
              编辑任务
            </el-button>
            <el-button type="text" size="small"> </el-button>
            <el-button
              type="text"
              size="small"
              v-show="scope.row.isReceived == 0"
              @click="getTask(scope.row.id)"
              >领取任务
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </div>
    <el-dialog
      title="修改任务"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <task-form
        :data="selectData"
        ref="update"
        v-on:submit="onSubmit"
      ></task-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  taskListApi,
  taskReleaseApi,
  TaskUpdateApi,
  getUserListApi,
} from "@/api/api";
import taskForm from "@/components/taskFormComponent.vue";
import formatDate from "@/mixins/formatDate";
export default {
  components: {
    taskForm,
  },
  mixins: [formatDate],
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      totalCount: 0,
      dialogVisible: false,
      selectData: "",
      userIdAll: [],
      params: [],
      taskId:""
    };
  },
  created() {
    this.taskList();
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.selectData = row;
      this.getTask(row.id);
      this.dialogVisible = true;
      this.$nextTick(function () {
        this.$refs.update.init();
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
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
      this.params = form.userIds;
      let id = this.selectData.id;
      let option = this.$refs.update.form;
      console.log(this.$refs.update);
      let res = await TaskUpdateApi({
        id: id,
        name: option.name,
        desc: option.desc,
        duration: option.duration,
        level: option.level,
      });
      if (res.data.status == 1) {
        this.$message({
          type: "success",
          message: "修改成功",
        });
        this.dialogVisible = false;
        this.taskList();
      }
      console.log(res);
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  color: #606266;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.operation {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  justify-content: center;
}
</style>