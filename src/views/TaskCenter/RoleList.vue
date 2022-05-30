<template>
  <div class="task-list">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="id" width="70">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色的名字" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.roleName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分组的id" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.groupId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="210">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.createdAt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="210">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.updatedAt }}</span>
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
import { RoleListApi } from "@/api/api";
export default {
  data() {
    return {
      tableData: [],
      pageNum: 1,
      totalCount: 0,
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
      this.roleList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.roleList();
    },
    async roleList() {
      const { pageSize, pageNum } = this;
      let res = await RoleListApi({
        pagination: true,
        pageSize,
        pageNum,
      });
      this.tableData = res.data.data.rows;
      this.totalCount = res.data.data.count;
      console.log(this.tableData);
      console.log(res);
    },
  },
  created() {
    this.roleList();
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