<template>
  <span>
    <van-cell :title="title" @click.native="showClick">
      <div class="cellValue">
        <span class="value">
          <span class="van-cell__value" v-show="value.length == 0">{{placeholder}}</span>
          {{value}}
          <span class="password-input__cursor" v-show="show"></span>
        </span>
        <span class="clear" v-show="showClear">
          <van-icon name="clear" @click="clearBtn" />
        </span>
      </div>
    </van-cell>
    <van-number-keyboard
      :show="show"
      :extra-key="extraKey"
      :close-button-text="closeButtonText"
      @blur="blurEvent"
      @input="onInput"
      @delete="onDelete"
    />
  </span>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "标题"
    },
    closeButtonText: {
      type: String
    },
    extraKey: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "请输入"
    },
    modelValue: {
      type: [String, Number]
    }
  },
  model: {
    prop: "modelValue",
    event: "returnBack"
  },
  watch: {
    modelValue(newValue) {
      this.value = newValue;
    }
  },
  data() {
    return {
      show: false,
      value: "",
      flag: false
    };
  },
  computed: {
    showClear() {
      if (this.show && this.value.length != 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    blurEvent() {
      if (!this.flag) {
        if (this.show) {
          this.$emit("blur", this.value);
        }
        this.show = false;
      }
    },
    showClick() {
      this.show = true;
      this.flag = true;
      setTimeout(() => {
        this.flag = false;
      }, 0);
    },
    onInput(value) {
      this.value = this.value + value;
      this.$emit("returnBack", this.value);
    },
    onDelete() {
      if (this.value.length <= 0) return;
      this.value = this.value.substr(0, this.value.length - 1);
      this.$emit("returnBack", this.value);
    },
    clearBtn() {
      this.value = "";
      this.$emit("returnBack", this.value);
    }
  }
};
</script>

<style scoped="scoped" lang="less">
.cellValue {
  display: flex;
  justify-content: flex-end;
  height: 100%;
  .value {
    flex: 1;
    position: relative;
    color: #323233;
  }

  .clear {
    display: flex;
    height: 100%;
    width: 24px;
    justify-content: flex-end;
    align-items: center;
    font-size: 16px;
    color: gainsboro;
  }

  .password-input__cursor {
    position: absolute;
    right: 0;
    height: 18px;
    top: 50%;
    margin-top: -9px;
    width: 1px;
    display: block;
    background-color: #000000;
    animation: 1s van-cursor-flicker infinite;
  }
}
</style>
