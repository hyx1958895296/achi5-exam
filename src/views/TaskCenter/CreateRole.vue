<template>
  <div class="create-role">
    <div class="title">创建角色</div>
    <div class="wrap">
      <div class="wrap-top">
        <div class="add-role-parameter">
          <div class="flex-center">
            <div class="mr-20">角色名称</div>
            <div>
              <el-input
                v-model="form.roleName"
                placeholder="请输入角色名称"
              ></el-input>
            </div>
          </div>
          <div class="align-center">
            <div class="mr-20">所属部门</div>
            <el-select v-model="form.department" placeholder="请选择所属部门">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="check-box">
        <el-checkbox v-model="checkbox" size="medium">选择所有权限</el-checkbox>
      </div>
      <div class="signature-management-style">
        <div class="signature-management">
          <div class="signature-management-top bb-1-gray">
            <input type="checkBox" /><span for="" class="ml-5">签名管理</span>
          </div>
          <div class="signature-management-top-children bb-1-gray">
            <div>
              <input type="checkBox" />
              <label for="" class="ml-5">KEY种子写入</label>
            </div>
            <div>
              <input type="checkBox" />
              <label for="" class="ml-5">校验KEY密码</label>
            </div>
            <div>
              <input type="checkBox" />
              <label for="" class="ml-5">修改KEY密码</label>
            </div>
          </div>
          <div class="signature-management-top-children">
            <div>
              <input type="checkBox" />
              <label for="" class="ml-5">签名币种列表</label>
            </div>
            <div>
              <input type="checkBox" />
              <label for="" class="ml-5">新增签名币种</label>
            </div>
            <div>
              <input type="checkBox" />
              <label for="" class="ml-5">编辑签名币种</label>
            </div>
          </div>
        </div>
      </div>
      <div class="mention-money-management-style">
        <div class="signature-management">
          <div class="signature-management-top bb-1-gray">
            <input type="checkBox" /><span for="" class="ml-5">提币管理</span>
          </div>
          <div class="signature-management-top-children bb-1-gray">
            <div>
              <input type="checkBox" />
              <label for="" class="ml-5">提币地址管理</label>
            </div>
          </div>
          <div class="signature-management-top-children">
            <div>
              <input type="checkBox" />
              <label for="" class="ml-5">提笔转账列表</label>
            </div>
            <div>
              <input type="checkBox" />
              <label for="" class="ml-5">手动拉取提币</label>
            </div>
            <div>
              <input type="checkBox" />
              <label for="" class="ml-5">手动签名转账</label>
            </div>
          </div>
        </div>
      </div>
      <div class="mention-money-management-style">
        <div class="signature-management">
          <div class="signature-management-top bb-1-gray">
            <input type="checkBox" /><span for="" class="ml-5">系统管理</span>
          </div>
          <div class="signature-management-top-children bb-1-gray">
            <div>
              <input type="checkBox" />
              <label for="" class="ml-5">组织成员列表</label>
            </div>
            <div>
              <input type="checkBox" />
              <label for="" class="ml-5">成员数据列表</label>
            </div>
            <div>
              <input type="checkBox" />
              <label for="" class="ml-5">新增成员</label>
            </div>
            <div>
              <input type="checkBox" />
              <label for="" class="ml-5">账号开关</label>
            </div>
            <div>
              <input type="checkBox" />
              <label for="" class="ml-5">查看成员</label>
            </div>
            <div>
              <input type="checkBox" />
              <label for="" class="ml-5">编辑成员</label>
            </div>
          </div>
          <div class="signature-management-top-children bb-1-gray">
            <div>
              <input type="checkBox" />
              <label for="" class="ml-5">组织部门管理</label>
            </div>
            <div>
              <input type="checkBox" />
              <label for="" class="ml-5">部门数据列表</label>
            </div>
            <div>
              <input type="checkBox" />
              <label for="" class="ml-5">新增部门</label>
            </div>
            <div>
              <input type="checkBox" />
              <label for="" class="ml-5">查看部门</label>
            </div>
            <div>
              <input type="checkBox" />
              <label for="" class="ml-5">编辑部门</label>
            </div>
          </div>
          <div class="signature-management-top-children bb-1-gray">
            <div>
              <input type="checkBox" />
              <label for="" class="ml-5">角色与权限</label>
            </div>
            <div>
              <input type="checkBox" />
              <label for="" class="ml-5">角色数据列表</label>
            </div>
            <div>
              <input type="checkBox" />
              <label for="" class="ml-5">新增角色权限</label>
            </div>
            <div>
              <input type="checkBox" />
              <label for="" class="ml-5">角色权限开关</label>
            </div>
            <div>
              <input type="checkBox" />
              <label for="" class="ml-5">查看角色权限</label>
            </div>
            <div>
              <input type="checkBox" />
              <label for="" class="ml-5">编辑角色权限</label>
            </div>
          </div>
          <div class="signature-management-top-children">
            <div>
              <input type="checkBox" />
              <label for="" class="ml-5">参数配置</label>
            </div>
          </div>
        </div>
      </div>
      <div class="new-confirm-btn pd-20">
        <el-button size="medium" @click="createRole">确认新增</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { CreateRoleApi } from "@/api/api";
export default {
  data() {
    return {
      form: {
        roleName: "",
        department: "",
      },
      checked: false,
      checkbox:''
    };
  },
  methods: {
    async createRole() {
      let res = await CreateRoleApi({
        roleName: this.form.roleName, //角色名字
        groupId: 1, //分组id  非必填
      });
      console.log(res);
    },
  },
};
</script>

<style scoped lang="scss">
.create-role {
  padding: 20px 20px 20px 20px;
  & .title {
    padding: 0px 20px 0px 0px;
    font-size: 18px;
    color: #2f3543;
    font-weight: 700;
  }
  & .wrap {
    background-color: #fff;
    & .wrap-top {
      margin: 20px 20px 0px 20px;
      border-bottom: 1px solid #e7ecf0;
      & .add-role-parameter {
        padding: 20px 0px 20px 0px;
        width: 50%;
        display: flex;
        justify-content: space-between;
        color: black;
      }
    }
    & .check-box {
      color: black;
      padding: 20px 0px 0px 40px;
    }
    & .signature-management-style {
      color: #000;
      padding: 20px;
      & .signature-management {
        border: 1px solid #e7ecf0;
        & .signature-management-top {
          padding: 20px;
          background-color: #f6fafd;
          color: black;
        }
        & .signature-management-top-children {
          padding: 20px 20px 20px 40px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        }
      }
    }
    & .mention-money-management-style {
      color: #000;
      padding: 0px 20px 20px 20px;
      & .signature-management {
        border: 1px solid #e7ecf0;
        & .signature-management-top {
          padding: 20px;
          background-color: #f6fafd;
          color: black;
        }
        & .signature-management-top-children {
          padding: 20px 20px 20px 40px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        }
      }
    }
    & .new-confirm-btn{
        padding: 0px 20px 20px 20px;
        & .el-button{
            background-color: #2761e7;
            color: #eceefb;
        }
    }
  }
}
.bb-1-gray {
  border-bottom: 1px solid #e7ecf0;
}
.pd-20 {
  padding: 0 20px 20px 20px;
}
</style>