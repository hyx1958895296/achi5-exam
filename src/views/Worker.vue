<template>
  <div class="main">
    <div class="aside">
      <div class="calendar">
        <el-calendar first-day-of-week:7 v-model="value"> </el-calendar>
      </div>
      <div class="today-task">
        <div class="col-font_black">今日任务</div>
        <div class="task-list">
          <div class="task-list-content">
            <div>
              <input type="checkbox" />
              <label for="">复选框A</label>
            </div>
            <div class="current-progress">当前进度：0%</div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="notify">
        <div class="col-font_black">Notification</div>
        <div class="long-polling">
          <div class="el-icon-edit-outline long-polling-left_icon"></div>
          <div class="long-polling-content">
            <div class="long-polling-content-text">
              Emily just sent you rask to assign
            </div>
            <div>18 Aug 2020-N0.00 AM</div>
            <div class="long-polling-btn">Assign Now</div>
          </div>
          <div class="el-icon-eleme long-polling-right_icon"></div>
        </div>
      </div>
      <div class="chat">
        <h1 class="title col-font_black">Team Chat</h1>

        <div class="container">
          <div v-for="(list, index) in textArr" :key="index" class="item">
            <div class="item-left" v-if="list.avatarName != obj.avatarName">
              <div>{{ list.avatarName }}</div>
              <div class="if-item">{{ list.msg }}</div>
            </div>
            <div class="item-right" v-else>
              <div>{{ list.avatarName }}</div>
              <div class="if-item">{{ list.msg }}</div>
            </div>
          </div>
        </div>
        <footer class="footer">
          <el-input placeholder="请输入内容" v-model="obj.msg"></el-input>
          <button
            class="el-icon-s-promotion send"
            @click="sendSocketMsg()"
          ></button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfoApi } from "@/api/api";
export default {
  data() {
    return {
      value: "",
      input1: "",
      textArr: [],
      info: {},
      visible: "",
      obj: {
        userId: "",
        type: 1,
        avatarName: "欧阳修",
        msg: "",
      },
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    //进入聊天
    sendSocketMsg() {
      //向服务端发送消息
      this.$socket.emit("sendMsg", this.obj);
      this.obj.msg = "";
    },
    async getInfo() {
      let res = await getUserInfoApi();
      if (res.data.status == 1) {
        this.info = res.data.data[0];
        this.obj.id = this.info.id;
      }
      console.log(res);
      const params = {
        userId: this.info.id,
        avatarName: this.info.avatarName,
      };
      this.$socket.emit("addUser", params);
    },
    destroyed() {
      this.$socket.emit("removeUser", {
        userId: 1,
        avatarName: "欧阳修",
      });
    },
  },
  sockets: {
    UserContent: function () {
      console.log("服务的返回的信息", message);
      this.$socket.emit("userCount");
    },
    connect: function () {
      //建立连接后调用的函数
      console.log("socket connected...");
    },
    // message 是服务端返回的信息
    receiveMsg: function (message) {
      console.log("服务的返回的信息", message);
      this.textArr.push(message);
    },
    // 断开时调用的函数
    disconnect: function () {
      console.log("disconnect!");
    },
  },
};
</script>

<style scoped>
body,
h1 {
  margin: 0;
}

body {
  height: 100vh;
}

.main {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.main .aside {
  display: grid;
  grid-template-rows: 2fr 1fr;
}

.task {
  display: flex;
}

.task-list-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.current-progress {
  color: #71aefe;
}

.long-polling-content {
  display: grid;
  grid-template-rows: 1fr 1fr 0.5fr;
}
.long-polling-content-text {
  color: white;
  font-weight: 600;
  font-size: 20px;
}
.long-polling-btn {
  padding: 6px 12px;
  background-color: #ffc887;
  border-radius: 10px;
  width: 25%;
  color: white;
}

.long-polling-right_icon {
  font-size: 100px;
}

.long-polling {
  display: grid;
  grid-template-columns: 1fr 6fr 2fr;
  padding: 14px;
  background-color: #58419c;
  border-radius: 10px;
  align-items: start;
  justify-content: space-between;
}
.long-polling-left_icon {
  padding: 6px;
  background-color: #7b65b7;
  font-size: 40px;
  width: 43px;
}

.main > .container {
  display: grid;
  grid-template-rows: 200px auto;
}

.main .footer {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  background-color: rgb(250, 250, 252);
}

.chat {
  height: 100%;
  overflow: hidden;
  position: relative;
  background-color: #fafafc;
}

.if-item {
  padding: 10px;
  color: #71aefe;
  background-color: #ccc;
  border-radius: 10px;
  width: 100px;
  word-break: break-all;
  margin: 10px;
}

.item-right {
  display: flex;
  flex-direction: row-reverse;
}

.item-left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.send {
  padding: 5px;
  font-size: 25px;
}

.chat .container {
  position: absolute;
  left: 0;
  bottom: 0;
  height: calc(100% - 40px - 40px);
  overflow-y: scroll;
  width: 100%;
  /* padding: 15px; */
  padding-bottom: 40px;
}
::v-deep .el-calendar-day {
  height: 40px;
  text-align: center;
}
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
</style>