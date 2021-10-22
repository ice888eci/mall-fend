<template>
  <van-field
    :ref="type"
    v-model="currentValue"
    :type="current.type"
    :label="current.label"
    :required="current.required"
    :placeholder="current.placeholder"
    :error-message="current.errorMessage"
    @focus="onFocus"
    @blur="onBlur"
    @input="onInput"
  >
    <template #extra>
      <div class="field-icon">
        <img src="~svg/success.svg" v-show="currentIcon == `success`" />
        <img src="~svg/fail.svg" v-show="currentIcon == `fail`" />
        <span>{{ currentLevel }}</span>
      </div>
    </template>
  </van-field>
</template>

<script>
export default {
  name: "field",
  data() {
    return {
      currentValue: "",
      currentLevel: "",
      currentIcon: "",
      info: {
        tel: {
          type: "tel",
          label: "手机号",
          required: true,
          placeholder: "请输入手机号",
          rule: /^(86)?1[3-9]\d{9}$/,
          errorMessage: "",
          bakErrorMessage: "手机号格式错误",
        },
        password: {
          type: "password",
          label: "密码",
          required: true,
          placeholder: "请输入密码",
          rule: /^.{6,18}$/,
          ruleLevel: [
            {
              regexName: "regexNum",
              value: /\d/,
            },
            {
              regexName: "regexLower",
              value: /[a-z]/,
            },
            {
              regexName: "regexUpper",
              value: /[A-Z]/,
            },
            {
              regexName: "regexSpeChar",
              value: /[~!@#$%^&*]/,
            },
          ],
          errorMessage: "",
          bakErrorMessage: "密码格式错误",
          passwordLevel: ["", "强度低", "强度中等", "强度高", "强度极高"],
        },
      },
    };
  },

  computed: {
    current() {
      return this.info[this.type];
    },
    check() {
      return this.current.rule.test(this.currentValue) ? true : false;
    },
  },
  methods: {
    onInput(v) {
      if (v == "") {
        this.current.errorMessage = "";
        return;
      }
      if (this.type == "password") {
        this.currentIcon = "";
        const count = this.checkLevel(v, this.current.ruleLevel);
        this.currentLevel = this.current.passwordLevel[count];
      } else {
        if (this.check) this.currentIcon = "success";
      }
    },
    onFocus() {
      if (this.currentIcon != "success") this.currentIcon = "";
      this.current.errorMessage = "";
    },
    onBlur() {
      this.currentLevel = "";
      if (this.check) {
        this.currentIcon = "success";
        return;
      }
      this.currentIcon = "fail";

      this.current.errorMessage = this.current.bakErrorMessage;
    },

    checkLevel(text, rule) {
      let count = 0;
      rule.forEach((item) => item.value.test(text) && count++);
      return count;
    },
    clearState() {
      this.current.errorMessage = "";
      this.currentIcon = "";
      this.currentLevel = "";
      this.currentValue = "";
    },
  },
  props: {
    type: {
      validator(value) {
        return ["tel", "password"].indexOf(value) > -1;
      },
    },
  },
};
</script>

<style  scoped lang='less'>
.field {
  display: flex;
  &-icon {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    transition: all 1s;
    img {
      width: 20px;
    }
  }
}
/deep/.van-field__label {
  width: 3rem;
}
</style>