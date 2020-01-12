<template>
  <div class="Login">
    <div class="title">
      <p class="content">请确保对所有输入使用适当的类型属性（例如，电子邮件用于电子邮件地址或数字信息的数字），以利用较新的输入控件，如电子邮件验证、数字选择等。</p>
    </div>
    <div class="input_container">
      <p>账号</p>
      <el-input placeholder="请输入名称"
                v-model="name"
                clearable />
    </div>
    <div class="input_container">
      <p>密码</p>
      <el-input placeholder="请输入密码"
                v-model="password" />
    </div>
    <div class="input_container">
      <p>确认密码</p>
      <el-input placeholder="请再次输入密码"
                v-model="password_again" />
    </div>
    <div class="input_container">
      <p>email</p>
      <el-input placeholder="请输入邮箱"
                v-model="email" />
    </div>
    <div class="input_container">
      <p>电话号码</p>
      <el-input placeholder="请输入电话号码"
                v-model="telephone" />
    </div>
    <div class="input_container">
      <p>验证码</p>
      <el-input class="verification_code"
                placeholder="请输入验证码"
                v-model="verification" />
      <el-button class="send_verification_code"
                 type="primary"
                 @click="send ">发送</el-button>
    </div>
    <div class="input_container">
      <el-button class="btn_login register"
                 type="primary"
                 @click="register">注册</el-button>
    </div>
  </div>
</template>
<script>
import asyncValidator from 'async-validator';
import { uuid } from '../lib/math';

const descriptor = {
  name: {
    type: "string",
    required: true,
    message: "账号名必须大于8位",
    validator: (rule, value) => {
      if (value.length < 8) {
        return false;
      }

      return true;
    }
  },
  verification: {
    type: "string",
    required: true,
    message: "验证码不正确",
    validator: (rule, value) => {
      if (window.verification_code !== value) {
        return false;
      }

      return true;
    }
  },
  email: {
    type: "string",
    required: true,
    message: "email格式不正确",
    validator: (rule, value) => {
      if (!(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(value)) {
        return false;
      }
      return true;
    }
  },
  telephone: {
    type: "string",
    required: true,
    message: "电话号码不正确",
    validator: (rule, value) => {
      if (!(/^[1][3,4,5,6,7,8,9][0-9]{9}$/).test(value)) {
        return false;
      }

      return true;
    }
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
  },
};
export default {
  data: function () {
    return {
      name: '',
      password: '',
      password_again: '',
      email: '',
      telephone: '',
      verification: '',
    }
  },
  methods: {
    register () {
      const validator = new asyncValidator(descriptor);
      if (this.password !== this.password_again) {
        this.$notify.error({
          title: '错误',
          message: `密码与确认密码不一致`,
          duration: 0
        });
        return;
      }

      validator.validate({
        name: this.name,
        password: this.password,
        verification: this.verification,
        email: this.email,
        telephone: this.telephone
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
          };

          this.$notify.success({
            title: '成功',
            message: '账号密码验证成功'
          });
        }
      )
    },
    send () {
      window.verification_code = uuid(6);
      console.log(window.verification_code);
    }
  }
}
</script>

<style>
.Login .register {
  margin-top: 16px;
}
.Login .input_container .verification_code {
  width: 285px;
  margin-right: 15px;
}
.Login .input_container .send_verification_code {
  width: 70px;
  height: 40px;
  position: relative;
  top: -1px;
}
</style>