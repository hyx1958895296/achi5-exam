<template>
  <div class="jqb">
    <div class="header">
      <div class="applicable-test align-center">
        <div class="title mr-15">所属题型</div>
        <div class="types flex">
          <div class="type active">全部(1000)</div>
          <div class="type">单选题(144)</div>
          <div class="type">多选题(144)</div>
          <div class="type">判断题(75)</div>
          <div class="type">排序题(14)</div>
          <div class="type">填空题(36)</div>
          <div class="type">简答题(45)</div>
        </div>
      </div>
      <div class="applicable-test align-center">
        <div class="title mr-15">难易程度</div>
        <div class="types flex">
          <div class="type active">全部</div>
          <div class="type">简单</div>
          <div class="type">普通</div>
          <div class="type">困难</div>
        </div>
      </div>
      <div class="btn">
        <div>
          <el-button
            type="primary"
            size="small"
            class="btn-first bg-col blue-col"
            @click="showDialog"
            >添加习题</el-button
          >
          <el-button
            type="primary"
            size="small"
            class="btn-second bg-col blue-col"
            >批量导入</el-button
          >
          <el-button
            type="primary"
            size="small"
            class="btn-thired bg-col blue-col"
            >加入公共习题库</el-button
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
    <el-dialog
      title="新增题目"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      class="dialog"
    >
      <div class="form">
        <div class="item">
          <label>
            <span class="c-ff4400">*</span>
            <span>题目标题</span>
          </label>
          <el-input
            v-model="form.title"
            placeholder="请输入题目标题"
          ></el-input>
        </div>
        <div
          class="item"
          v-for="(option, index) in questionOptions"
          :key="option.id"
        >
          <label>
            <span v-if="index <= 1" class="c-ff4400">*</span>
            <span>{{ option.label }}</span>
          </label>
          <el-input
            v-model="option.value"
            :placeholder="option.placeholder"
          ></el-input>
          <div>
            <span
              @click="addQuestionOptions"
              v-if="index == questionOptions.length - 1 && index < 3"
              class="btn el-icon-circle-plus-outline"
            ></span>
            <span
              @click="removeQuestionOptions"
              v-if="index > 1 && index == questionOptions.length - 1"
              class="btn el-icon-remove-outline"
            ></span>
          </div>
        </div>
        <div class="item">
          <label>
            <span class="c-ff4400">*</span>
            <span>答案：</span>
          </label>
          <el-select v-model="answer" placeholder="请选择">
            <el-option
              v-for="item in questionOptions"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <label>
            <span class="c-ff4400">*</span>
            <span>难易程度</span>
          </label>
          <el-select v-model="form.level" placeholder="请选择">
            <el-option
              v-for="item in levelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addCancle">取 消</el-button>
        <el-button type="primary" @click="createQuestion">确 定</el-button>
      </span>
    </el-dialog>
    <div class="main">
      <div class="shiti mt-20" v-for="item in data" :key="item.id">
        <div class="topic">
          <div
            v-if="
              updatedata == 1
                ? formatDate(item.updatedAt)
                : formatDate(item.createdAt)
            "
          >
            创建时间：{{ formatDate(item.createdAt) }}
          </div>
          <div class="topic_btn">
            <el-button type="danger" size="mini">{{
              getTypeName(item.type)
            }}</el-button>
            <el-button type="success" size="mini">{{
              getLevelName(item.level)
            }}</el-button>
          </div>
          <div class="number-use">
            <div>满分：100</div>
            <div class="ml-10">使用次数：18次</div>
          </div>
          <div class="topic_btns">
            <i class="el-icon-edit" @click="showDialog(item)"></i>
            <div
              class="el-icon-delete ml-15"
              @click="openDeletePopup(item)"
            ></div>
          </div>
        </div>
        <div class="shiti-title">
          <el-checkbox v-model="checked" class="topic-first">
            {{ item.title }}</el-checkbox
          >
          <div class="topic-first-answer">
            <div class="answer-radio-a">
              <input type="radio" disabled v-model="item.answer" />
              {{ item.questionA }}
            </div>
            <div class="answer-radio-b">
              <input type="radio" disabled v-model="item.answer" />
              {{ item.questionB }}
            </div>
            <div class="answer-radio-c">
              <input
                v-if="item.questionC"
                type="radio"
                disabled
                v-model="item.answer"
              />
              {{ item.questionC }}
            </div>
            <div class="answer-radio-d">
              <input
                v-if="item.questionD"
                type="radio"
                disabled
                v-model="item.answer"
              />
              {{ item.questionD }}
            </div>
          </div>
          <div class="right-answer">答案：{{ item.answer }}</div>
          <div class="question-bottom">
            <div class="analysis">
              <div class="line-dashed">
                ---------------------------------------------------------------------------------------------------------------------------------------------
              </div>
              <div>所属知识点：知识点一、知识点二、知识点三</div>
              <div>解析：这是解析字段</div>
            </div>
          </div>
        </div>
      </div>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import formatDate from "@/mixins/formatDate";
import {
  addTopicApi,
  queryQuestionApi,
  updataQuestionApi,
  deleteQuestionApi,
} from "@/api/api";
export default {
  mixins: [formatDate],
  data() {
    return {
      selectedDate: {}, //代表的是我选中的那一行
      dialogVisible: false,
      inputVisible: false,
      inputValue: "",
      input2: "",
      pageNum: 1,
      totalCount: 0,
      checked: false,
      radio1: "",
      radio2: "",
      radio3: "",
      radio4: "",
      levelOptions: [
        {
          value: 1,
          label: "简单",
        },
        {
          value: 2,
          label: "普通",
        },
        {
          value: 3,
          label: "困难",
        },
      ],
      options: [
        {
          value: "A",
          label: "选项A",
        },
        {
          value: "B",
          label: "选项B",
        },
        {
          value: "C",
          label: "选项C",
        },
        {
          value: "D",
          label: "选项D",
        },
      ],
      questionOptions: [],
      value: "",
      query: {
        type: "",
        title: "",
        questionA: "",
        questionB: "",
        questionC: "",
        questionD: "",
        createdAt: "",
      },
      updateDialogFormVisible: false,
      updateForm: {
        id: "",
        updateType: 1,
        updateTitle: "",
        updateQuestionA: "",
        updateQuestionB: "",
        updateQuestionC: "",
        updateQuestionD: "",
        updateAnswer: "",
        updateLevel: 1,
      },
      updateFormLabelWidth: "120px",
      data: [],
      updatedata: null,
      form: {},
      questionOptionsTemp: [
        {
          id: 1,
          key: "A",
          label: "选项A",
          value: "",
          placeholder: "请输入选项A的值",
        },
        {
          id: 2,
          key: "B",
          label: "选项B",
          value: "",
          placeholder: "请输入选项B的值",
        },
        {
          id: 3,
          key: "C",
          label: "选项C",
          value: "",
          placeholder: "非必填，请输入选项C的值",
        },
        {
          id: 4,
          key: "D",
          label: "选项D",
          value: "",
          placeholder: "非必填，请输入选项D的值",
        },
      ],
      answer: "",
      isCreateEvent: true,
    };
  },
  watch: {
    questionOptions(newValue) {
      let res = newValue.find((item) => item.key == this.answer);
      this.answer = !res ? "" : res.key;
    },
  },
  created() {
    this.initFormPrams();
    this.queryQuestion();
  },
  methods: {
    removeQuestionOptions() {
      this.questionOptions.pop();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.queryQuestion();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.queryQuestion();
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    //查询
    async queryQuestion() {
      const { pageSize, pageNum } = this;
      let queryResult = await queryQuestionApi({
        type: 1,
        pageSize,
        pageNum,
      });
      this.data = queryResult.data.data.rows;
      this.totalCount = queryResult.data.data.count;
    },
    getTypeName(type) {
      switch (type) {
        case 1:
          return "单";
        case 2:
          return "多";
      }
    },
    getLevelName(level) {
      switch (level) {
        case 1:
          return "简单";
        case 2:
          return "普通";
        case 3:
          return "困难";
      }
    },
    // 修改
    async updateQuestion(data) {
      this.updatedata = 1;
      let updateResult = await updataQuestionApi({
        id: this.updateForm.id,
        type: data.type,
        title: this.updateForm.updateTitle,
        questionA: this.updateForm.updateQuestionA,
        questionB: this.updateForm.updateQuestionB,
        questionC: this.updateForm.updateQuestionC,
        questionD: this.updateForm.updateQuestionD,
        answer: this.updateForm.updateAnswer,
        level: 1,
      });
      if (updateResult.data.status == 1) {
        this.queryQuestion();
      }
      console.log(updateResult);
    },
    formatFormPrams() {
      // this.form.answer = this.answer;
      let res = {};
      res.type = this.form.type;
      res.title = this.form.title;
      this.questionOptions.forEach((item) => {
        res["question" + item.key] = item.value;
      });
      res.answer = this.answer;
      res.level = this.form.level;
      if (!this.isCreateEvent) res.id = this.selectedDate.id;
      return res;
    },
    addQuestionOptions() {
      let option = JSON.parse(JSON.stringify(this.questionOptionsTemp));
      this.questionOptions.push(option[this.questionOptions.length]);
    },
    addCancle() {
      this.dialogVisible = false;
      this.initFormPrams();
    },
    initFormPrams() {
      this.form = {
        type: 1,
        title: "",
        answer: "",
        level: "",
      };
      // this.questionOptions.forEach((ele) => {
      //   ele.value = "";
      // });
      this.questionOptions = JSON.parse(
        JSON.stringify(this.questionOptionsTemp)
      ).slice(0, 2);
      this.answer = "";
    },
    addValueDate(params) {
      let res = true;
      let rule = {
        type: 1,
        title: "题目标题",
        questionA: "选项A",
        questionB: "选项B",
        questionC: "选项C",
        questionD: "选项D",
        answer: "答案",
        level: "难度",
      };
      console.log("我是废物");
      console.log(params);
      for (let key in params) {
        console.log(key);
        console.log("这是key");
        console.log(rule[key]);
        if (!params[key]) {
          this.$message({
            type: "warning",
            message: rule[key] + "不能为空",
          });
          res = false;
          break;
        }
      }
      return res;
    },
    //添加
    async createQuestion() {
      const params = this.formatFormPrams();
      let valueDate = this.addValueDate(params);
      if (!params.questionC) {
        params.questionC = "";
      }
      if (!params.questionD) {
        params.questionD = "";
      }
      if (!valueDate) return;
      let successMsg = "";
      let res;

      if (this.isCreateEvent) {
        res = await addTopicApi(params);
        successMsg = "创建成功";
      } else {
        res = await updataQuestionApi(params);
        successMsg = "修改成功";
        this.queryQuestion();
      }
      if (res.data.status == 1) {
        this.queryQuestion();
        this.$message({
          type: "success",
          message: successMsg,
        });
        this.dialogVisible = false;
        this.initFormPrams();
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    showDialog(data) {
      this.dialogVisible = true;
      let isCreateEvent = data instanceof PointerEvent;
      if (isCreateEvent) {
        console.log("创建");
        this.isCreateEvent = true;
      } else {
        console.log("编辑");
        this.selectedDate = data;
        this.isCreateEvent = false;
        this.form.title = data.title;
        let questionOptions = JSON.parse(
          JSON.stringify(this.questionOptionsTemp)
        );
        questionOptions[0].value = data.questionA;
        questionOptions[1].value = data.questionB;
        questionOptions[2].value = data.questionC;
        questionOptions[3].value = data.questionD;
        this.questionOptions = questionOptions.filter((item) => item.value);
        this.answer = data.answer;
        this.form.level = data.level;
      }
    },
    // 删除
    async deleteQuestion(data) {
      let deleteResult = await deleteQuestionApi({
        id: data.id,
        type: data.type,
      });
      console.log(deleteResult);
      if (deleteResult.data.status == 1) {
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.queryQuestion();
      } else {
        this.$message({
          type: "warning",
          message: "res.data.msg",
        });
      }
    },
    //删除
    openDeletePopup(data) {
      // console.log(data);
      this.$confirm("您确认永久删除该题目？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteQuestion(data);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.jqb {
  background-color: #fff;
  & .header {
    background-color: #f9f9f9;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px 0px;
    & .title {
      font-weight: bold;
      color: #000;
      font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
        "Lucida Sans", Arial, sans-serif;
    }
    & .types {
      gap: 0 10px;
      color: #ccc;
      & .type {
        padding: 4px 10px;
        border-radius: 15px;
        border: 1px solid #b7b7b7;
      }
    }
    & .active {
      color: #f25342;
      border: 1px solid #f25342;
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
      border-radius: 10px;
      & .topic {
        padding: 16px;
        display: grid;
        grid-template-columns: 1.8fr 1.5fr 1.8fr 1fr;
        justify-content: center;
        align-items: center;
        & .topic_btn {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        & .topic_btns {
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
        & .topic-first {
          font-weight: 900;
        }
        & .topic-first-answer {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          align-items: center;
          justify-items: center;
          font-weight: 900;
        }
        & .question-bottom {
          color: #e2e5ea;
          // display: grid;
          // grid-template-rows: 1fr 1fr;
          // & .analysis{
          //   & .line-dashed{
          //   }
          // }
          // }
        }
        & .pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }
  & .pagination {
    padding: 15px 0px;
  }
  & .dialog {
    & ::v-deep .el-dialog {
      width: 440px !important;
    }
    & .form {
      display: flex;
      flex-direction: column;
      gap: 20px 0;
      padding: 20px;
      & .item {
        display: grid;
        grid-template-columns: 70px 240px 50px;
        gap: 0 10px;
        align-items: center;
        & label {
          text-align: right;
        }
        & .btn {
          padding: 4px;
          display: inline-block;
        }
      }
    }
  }
}
</style>