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
        <!-- <el-table-column label="操作" align="center">
          <template>
            <div class="operation">
              <el-link type="primary" @click="run(row)"
                >编辑任务</el-link
              >
              <el-link type="primary">发布任务</el-link>
              <el-link type="primary">领取任务</el-link>
              <el-link type="primary">查看详情</el-link>
            </div>
          </template>
        </el-table-column> -->

        <el-table-column label="操作" width="320">
          <template slot-scope="scope">

            <el-button type="text" @click="run(scope.row)" size="small">
              编辑任务
            </el-button>
            <el-dialog
              title="修改任务"
              :visible.sync="dialogVisible"
              width="50%"
              :before-close="handleClose"
            >
              <task-component :data="selectData"></task-component>
            </el-dialog>
            <el-button type="text" size="small">
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="open(scope.row)"
              v-if="scope.row.isReceived != 1"
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
  </div>
</template>

<script>
import { taskListApi, TaskUpdateApi } from "@/api/api";
import TaskComponent from "@/components/TaskComponent.vue";
export default {
  components: {
    TaskComponent,
  },
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      totalCount: 0,
      dialogVisible: false,
      selectData: "",
    };
  },
  created() {
    this.taskList();
  },
  methods: {
    run(row) {
      this.selectData = row; //给selectData赋值
      this.dialogVisible = true;
      // console.log("父组件打印", row);
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
    async taskUpdate() {
      let res = await taskUpdateApi({
        id: 565,
        name: "二臂啊",
        desc: "二臂啊二臂啊二臂啊",
        duration: 3,
        level: 1,
      });
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