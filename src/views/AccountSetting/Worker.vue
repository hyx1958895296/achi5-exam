<template>
  <div class="main">
    <div class="aside">
      <div class="calendar">
        <div class="col-font_black">日历</div>
        <el-calendar first-day-of-week:7 v-model="value"></el-calendar>
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
        <div class="col-font_black">
          <span class="title col-font_black"> Team Chat </span>
          <span class="fz-12">(当前在线人数：{{ PeopleContent }}人)</span>
        </div>

        <div class="container">
          <div
            v-for="(list, index) in textArr"
            :key="index"
            class="item"
            ref="scoll"
          >
            <div class="item-left" v-if="list.avatarName != obj.avatarName">
              <span class="mr-10 avatar-name">{{
                list.avatarName | name
              }}</span>
              <span>{{ list.avatorName }}</span>
              <span class="if-item">{{ list.msg }}</span>
            </div>
            <div class="item-right" v-else>
              <span class="ml-10 avatar-name">{{
                list.avatarName | name
              }}</span>
              <span class="if-item">{{ list.msg }}</span>
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
      PeopleContent: "",
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
    keyDown(e) {
      // 回车则执行登录方法 enter键的ASCII是13
      if (e.keyCode === 13) {
        this.sendSocketMsg(); //登录方法
      }
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
  },
  filters: {
    name(val) {
      var name = String(val);
      return name.substring(0, 1);
    },
  },
  destroyed() {
    this.$socket.emit("removeUser", {
      userId: 1,
      avatarName: "欧阳修",
    });
    window.removeEventListener("keydown", this.keyDown, false);
  },
  sockets: {
    connect: function () {
      //建立连接后调用的函数
      console.log("socket connected...");
    },
    // message 是服务端返回的信息
    receiveMsg: function (message) {
      console.log("服务的返回的信息", message);
      this.textArr.push(message);
      this.$nextTick(() => {
        var msg = this.$refs.scoll;
        msg[msg.length - 1].scrollIntoView(false);
      });
    },
    userCount: function (message) {
      console.log("服务的返回的信息", message);
      this.PeopleContent = message;
      console.log("一共有" + message + "人");
    },
    // 断开时调用的函数
    disconnect: function () {
      console.log("disconnect!");
    },
  },
  mounted() {
    //绑定监听事件
    window.addEventListener("keydown", this.keyDown);
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
  padding: 0 20px;
  background-color: #ffff;
}

.main .aside {
  display: grid;
  grid-template-rows: 1.5fr 0.7fr;
}

.task {
  display: flex;
}

.task-list-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
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
  font-size: 80px;
  display: flex;
  align-items: flex-end;
}

.long-polling {
  display: grid;
  grid-template-columns: 1fr 380px 0fr;
  padding: 14px;
  gap: 0px 20px;
  background-color: #58419c;
  border-radius: 10px;
  align-items: start;
  justify-content: center;
}
.long-polling-left_icon {
  padding: 6px;
  background-color: #7b65b7;
  font-size: 40px;
  width: 43px;
}

.main > .container {
  display: grid;
  grid-template-rows: 165px auto;
  padding: 0px 0px 0 20px;
}

.main .footer {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: rgb(250, 250, 252);
}

.chat {
  height: 95%;
  overflow: hidden;
  position: relative;
  background-color: #fafafc;
}

.if-item {
  padding: 10px;
  color: #fff;
  background-color: rgb(46, 202, 52);
  border-radius: 10px;
  word-break: break-all;
}

.item-right {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin-right: 15px;
  margin-top: 10px;
  margin-right: 5px;
}

.item-left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 0 0 15px;
  margin-left: 5px;
}

.avatar-name {
  width: 30px;
  height: 30px;
  padding: 4px;
  text-align: center;
  line-height: 30px;
  border-radius: 20px;
  background-color: #71aefe;
  color: #fff;
}

.send {
  padding: 5px;
  font-size: 25px;
}

.chat .container {
  position: absolute;
  left: 0;
  bottom: 0;
  overflow-y: scroll;
  width: 100%;
  height: 90%;
  padding-bottom: 40px;
}
::v-deep .el-calendar-day {
  height: 48px;
  text-align: center;
}
::v-deep .el-calendar__body {
  padding: 0px;
}
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
</style>