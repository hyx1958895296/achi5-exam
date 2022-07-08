<template>
  <div class="about">
    <div class="header">
      <div class="applicable-test">
        <span>适用考试：</span>
        <el-tag
          v-for="nav in tags"
          :key="nav.name"
          :type="nav.type"
          effect="plain"
        >
          {{ nav.name }}
        </el-tag>
      </div>
      <div class="examination-paper mt-15">
        <span class="examination-paper-text">试卷形式:</span>
        <el-tag
          class="examination-paper-el-tag"
          v-for="item in items"
          :key="item.label"
          :type="item.type"
          effect="plain"
        >
          {{ item.label }}
        </el-tag>
      </div>
      <div class="btn mt-15">
        <div>
          <el-button
            type="primary"
            size="small"
            class="btn-first bg-col blue-col"
            >策略组卷</el-button
          >
          <el-button
            type="primary"
            size="small"
            class="btn-second bg-col blue-col"
            >手动组卷</el-button
          >
          <el-button
            type="primary"
            size="small"
            class="btn-thired bg-col blue-col"
            >导入试卷</el-button
          >
        </div>
        <div class="input">
          <el-input
            placeholder="请输入内容"
            suffix-icon="el-icon-search"
            v-model="input2"
            size="small"
            class="inp"
          >
          </el-input>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="shiti">
        <div class="topic">
          <div>
            创建时间：2022-08-11 18:30:33
          </div>
          <div class="topic_btn">
            <el-button type="danger" size="mini">危险按钮</el-button>
            <el-button type="success" size="mini">成功按钮</el-button>
          </div>
          <div class="number-use">
            <div>满分：100</div>
            <div class="ml-10">使用次数：18次</div>
          </div>
          <div class="topic_btns">
            <div class="el-icon-delete"></div>
            <div class="el-icon-delete"></div>
            <div class="el-icon-delete"></div>
          </div>
        </div>
        <div class="shiti-title">1.java程序设计其中考试试题</div>
      </div>
      <div class="shiti mt-20"></div>
      <div class="shiti mt-20"></div>
      <div class="shiti mt-20"></div>
      <div class="shiti mt-20"></div>
      <div class="shiti mt-20"></div>
      <div class="pagination mt-10">
        <div></div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="6"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.about {
  background-color: #ffffff;
  & .header {
    background-color: #f9f9f9;
    padding: 20px;
    & .examination-paper {
      & .examination-paper-text {
        padding-right: 12px;
      }
    }
    & .btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      & .bg-col {
        background-color: #0069dd;
      }
      & .blue-col {
        color: #c2daf7;
      }
      & .input {
        & .inp {
          height: 40px;
        }
      }
    }
  }
  & .main {
    padding: 20px 20px;
    & .shiti {
      border: solid 2px #e2e5ea;
      height: 100px;
      border-radius: 10px;
      & .topic {
        padding: 16px;
        display: grid;
        grid-template-columns: 1.2fr 1.5fr 1.8fr 1fr;
        justify-content: center;
        align-items: center;
        & .topic_btn{
          display: flex;
          justify-content: center;
          align-items: center;
        }
        & .topic_btns{
          display: flex;
          justify-content: flex-end;
        }
        & .number-use {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
      }
      & .shiti-title {
        color: #6f6f6f;
        font-size: 18px;
        font-weight: 900;
        padding-left: 16px;
        margin-bottom: 16px;
      }
    }
    & .pagination {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      tags: [
        { name: "全部", type: "danger" },
        { name: "其中考试", type: "danger" },
        { name: "期末考试", type: "danger" },
        { name: "其他考试", type: "danger" },
      ],
      inputVisible: false,
      inputValue: "",
      items: [
        { type: "danger", label: "全部" },
        { type: "danger", label: "考生问卷" },
        { type: "danger", label: "随机排序" },
        { type: "danger", label: "考生答卷" },
      ],
      input2: "",
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
};
</script>
