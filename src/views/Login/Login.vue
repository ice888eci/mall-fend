<template>
  <div class="login">
    <div class="login-wrapper">
      <div class="login-body">
        <!--    @click="onTabsChange()" -->
        <van-tabs v-model="tabsActive" swipeable animated>
          <van-tab title="登录">
            <van-field
              v-model="login.tel"
              type="tel"
              name="tel"
              label="手机号"
              placeholder="请输入手机号"
              required
              :maxlength="11"
            />
            <van-cell-group v-show="isCaptchaModel">
              <van-field
                v-model="login.captcha"
                clearable
                required
                label="短信验证码"
                placeholder="请输入短信验证码"
              >
                <template #button>
                  <van-button
                    size="small"
                    type="primary"
                    :disabled="!captchaDisable"
                    @click="onSendCaptcha()"
                    :class="[captchaFlag == false ? 'login-loading' : '']"
                    >{{ captchaText }}</van-button
                  >
                </template>
              </van-field>
            </van-cell-group>

            <van-cell-group v-show="!isCaptchaModel">
              <van-field
                v-model="login.pwd"
                type="password"
                name="password"
                label="密码"
                required
                placeholder="请输入密码"
              />
            </van-cell-group>

            <div style="margin-top: 12px">
              <van-button round block type="info" @click="onLogin()">
                登录
              </van-button>
            </div>

            <span class="login-toggle-way" @click="onChangeModel()">
              {{ currentModelText }}
            </span>
          </van-tab>

          <van-tab title="注册">
            <field type="tel" ref="tel" />
            <field type="password" ref="password" />
            <van-field
              v-model="confirmPwd.pwd"
              type="password"
              name="password"
              label="确认密码"
              required
              :error-message="confirmPwd.error"
              placeholder="请输入密码"
              @input="onConfirmPwd"
            />

            <div style="margin: 16px">
              <van-button round block type="info" @click="onRegister()">
                注册
              </van-button>
            </div>
          </van-tab>
        </van-tabs>

        <div class="login-agreement">
          <van-divider
            :style="{
              color: '#1989fa',
              borderColor: '#1989fa',
              padding: '0 16px',
            }"
          >
            温馨提示
          </van-divider>

          <span class="login-agreement-checkbox">
            <van-checkbox v-model="checked" />
            <span style="margin-left: 3px"
              >登录时同意 <a style="color: rgb(25, 137, 250)"> / 用户协议 </a> /
              <a style="color: rgb(25, 137, 250)">隐私策略</a></span
            >
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import field from "./field/field";
export default {
  name: "Login",
  data() {
    return {
      tabsActive: 0,
      isCaptchaModel: true,
      captchaFlag: true,
      captchaText: "发送验证码",
      checked: true,
      login: { tel: "", pwd: "", captcha: "" },
      confirmPwd: { pwd: "", error: "" },
      loginInfo: {
        captcha: {
          tel: { rule: /^1[3-9]\d{9}$/, error: "手机号有误" },
          captcha: { rule: /\d{4}/, error: "验证码是四位数字" },
        },
        nocaptcha: {
          tel: { rule: /^1[3-9]\d{9}$/, error: "手机号有误" },
          pwd: { rule: /^.{6,18}$/, error: "密码有误" },
        },
      },
    };
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (Object.keys(vm.$utils.GetToken()).length) {
        vm.$Toast("您已经登陆过了");
        next({ path: from.fullPath });
      } else {
        next(false);
      }
    });
  },

  computed: {
    currentModelText() {
      return this.isCaptchaModel ? "使用账号密码登陆" : "使用短信验证码登陆";
    },
    captchaDisable() {
      if (this.isCaptchaModel) {
        return this.loginInfo.captcha.tel.rule.test(this.login.tel) && true;
      }
      return false;
    },
  },
  methods: {
    onTabsChange() {},
    onChangeModel() {
      this.isCaptchaModel = !this.isCaptchaModel;
      this.login.pwd = "";
      this.login.captcha = "";
    },
    onSendCaptcha() {
      if (this.captchaFlag) {
        this.captchaFlag = false;
        let time = 5;
        let timer = setInterval(() => {
          this.captchaText = `距离剩余${time}秒`;
          time--;
          if (time < 0) {
            clearInterval(timer);
            this.captchaText = "发送验证码";
            this.captchaFlag = true;
          }
        }, 1000);
      }
    },

    checkLoginAll(info) {
      let values = {};
      for (const [k, v] of Object.entries(info)) {
        if (!v.rule.test(this.login[k])) {
          this.$Toast.fail(v.error);
          return false;
        }
        values[k] = this.login[k];
        console.log(values);
      }
      return values;
    },

    async onLogin() {
      if (!this.checked) {
        this.$Toast.fail("您没勾选协议");
        return;
      }
      if (this.isCaptchaModel) {
        const v = this.checkLoginAll(this.loginInfo.captcha);
        if (v) {
          const res = await this.$api.Login({
            user: v.tel,
            captcha: v.captcha,
          });
        }
      } else {
        const v = this.checkLoginAll(this.loginInfo.nocaptcha);
        if (v) {
          const res = await this.$api.Login({ user: v.tel, pwd: v.pwd });
          if (res.status == 200) {
            this.$Toast.success(res.data.msg);
            // sessionStorage.setItem("uid", res.data.uid);

            this.$utils.SetUser(res.data);

            console.log(this.$utils.GetUser());

            setTimeout(() => this.$router.back(), 1500);
          }
        }
      }
    },

    onConfirmPwd() {
      const val = this.$refs.password.currentValue;
      if (this.confirmPwd.pwd != val) {
        this.confirmPwd.error = "两次密码不一致";
      } else {
        this.confirmPwd.error = "";
      }
    },
    async onRegister() {
      if (!this.checked) {
        this.$Toast.fail("您还没勾选协议");
        return;
      }
      const fieldTel = this.$refs.tel;
      const fieldPassword = this.$refs.password;
      const state = [fieldTel.check, fieldPassword.check].every((v) => v);
      if (state && this.confirmPwd.pwd == fieldPassword.currentValue) {
        let user = fieldTel.currentValue;
        let pwd = fieldPassword.currentValue;
        const res = await this.$api.Register({ user, pwd });
        if (res.status == 200) {
          setTimeout(() => {
            this.login.tel = user;
            fieldTel.clearState();
            fieldPassword.clearState();
            this.tabsActive = 0;
          }, 500);
        }
      } else {
        this.$Toast.fail("请检查您的信息是否正确");
      }
    },
  },

  components: { field },
};
</script>

<style  scoped lang='less'>
.login {
  width: 100%;
  display: flex;
  justify-content: center;
  height: 100vh;
  background-color: #eee;
  &-wrapper {
    position: relative;
    left: 0;
    top: 10%;
    width: 92%;
    height: 65%;
    border-radius: 5%;
    padding: 10px;
    background-color: #fff;
    z-index: 999;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.1);

    .login-body {
      width: 90%;
      margin: 0 auto;
    }
  }
  &-toggle-way {
    margin-top: 10px;
    display: inline-block;
    font-size: 14px;
  }
  &-layout {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
  }

  &-loading {
    border: none;
    opacity: 0.5;
  }
  &-agreement {
    width: 80%;
    font-size: 10px;
    text-align: center;
    position: absolute;
    margin-left: 50%;
    left: 0;
    bottom: 20px;
    transform: translate(-50%);
    &-checkbox {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  /deep/.van-cell {
    padding: 16px 16px;
  }
  /deep/.van-field__label {
    width: 3.5rem;
  }
  /deep/.van-button {
    transition: all 1s;
  }
}
</style>