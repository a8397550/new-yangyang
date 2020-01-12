<template>
  <div class="Login">
    <div class="Title">
      <p class="Content">请确保对所有输入使用适当的类型属性（例如，电子邮件用于电子邮件地址或数字信息的数字），以利用较新的输入控件，如电子邮件验证、数字选择等。</p>
    </div>
    <div class="Name">
      <p>账号</p>
      <el-input placeholder="请输入名称"
                v-model="name"
                clearable></el-input>
    </div>
    <div class="Password">
      <p>密码</p>
      <el-input placeholder="请输入密码"
                v-model="password"
                show-password></el-input>
      <p>
        <el-checkbox v-model="checkbox">是否保存密码</el-checkbox>
      </p>
    </div>
    <div>
      <el-button type="primary"
                 @click="login">登入</el-button>
    </div>
  </div>
</template>

<script>
import asyncValidator from 'async-validator';

const descriptor = {
  name: {
    type: "string",
    required: true,
    len: 8,
    message: "账号名必须大于8位"
  },
  password: {
    type: "string",
    validator: (rule, value) => {
      // 它至少是有一个，大写字母，小写字母，数字组成的，并且长度大于8
      if (value.length < 8) {
        return false;
      }

      const num = /[0-9]+/;
      const lowerCase = /[a-z]+/;
      const upperCase = /[A-Z]+/;

      if (num.test(value) && lowerCase.test(value) && upperCase.test(value)) {
        return true;
      }

      return false;
    },
    message: '密码长度必须大于8位，并且必须至少是有一个，大写字母，小写字母，数字组成的'
  }
};

export default {
  data () {
    return {
      password: '',
      checkbox: false,
      name: '',
    }
  },
  methods: {
    login () {
      const validator = new asyncValidator(descriptor);

      validator.validate({
        name: this.name,
        password: this.password
      },
        (errors, fields) => {
          if (errors) {
            /**
             * array.push(...arg)
             * array.pop()
             * array.unshift(...arg)
             * array.shift()
             */
            const msg = errors.map((item) => {
              return `<div class="notify-msg">${item.message}</div>`;
            });
            const arr = [];
            errors.forEach((item) => {
              arr.push(item.message);
            });
            this.$notify.error({
              title: '错误',
              dangerouslyUseHTMLString: true,
              message: `<div class="notify-msg-parent">${msg.join('')}</div>`,
              duration: 0
            });

            return;
          }

          this.$notify.success({
            title: '成功',
            message: '账号密码验证成功'
          });
        }
      )
    }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.Login {
  width: 400px;
  height: 385px;
  border: 1px solid #a1a1a1;
}
.notify-msg-parent .notify-msg:last-child {
  margin-bottom: 0px;
}
.notify-msg-parent .notify-msg {
  margin-bottom: 5px;
}
.Login .Title {
  width: 401px;
  height: 79px;
  border-bottom: 1px solid #a1a1a1;
}
.Login .Content {
  text-align: center;
  padding-right: 10px;
  padding-left: 10px;
}

.Login .el-input {
  width: 370px;
}
.Login .el-button {
  float: left;
  margin-left: 15px;
}
.Login .Password {
  overflow: hidden;
}
.Login .Password p {
  float: left;
  padding-left: 20px;
}
.Login .Name p {
  float: left;
  padding-left: 20px;
}
</style>
