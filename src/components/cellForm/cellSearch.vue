<template>
  <div class="asearch">
    <div class="assearch-in">
      <van-icon size="16px" name="search" class="icon" />
      <input
        @input="input"
        @click="showIcon"
        @blur="noneIcon"
        :type="type"
        v-model="value"
        :placeholder="placeholder"
      />
      <van-icon
        @click="closeit"
        name="cross"
        :class="['iconcls', isNone?'searchNone':'searchShow']"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["placeholder", "type"],
  data() {
    return {
      value: "",
      isNone: true
    };
  },
  model: {
    prop: "vmodel",
    event: "insearch"
  },
  watch: {
    vmodel(newValue) {
      this.value = newValue;
    }
  },
  mounted() {
    this.value = this.vmodel == null ? "" : this.vmodel;
  },
  methods: {
    showIcon() {
      this.isNone = false;
    },
    noneIcon() {
      setTimeout(() => {
        this.isNone = true;
      }, 500);
    },
    input(val) {
      this.isNone = false;
      if (val.target.value) {
        this.$emit("insearch", val.target.value);
      }
    },
    closeit() {
      this.vmodel = "";
      this.value = "";
      this.$emit("close");
    }
  }
};
</script>

<style lang="less">
.asearch {
  width: 100%;
  height: 54px;
  box-sizing: border-box;
  background-color: #fff;
  display: flex;
  padding: 0 10px;
  align-items: center;
  .assearch-in {
    display: flex;
    align-items: center;
    background-color: #f7f8fa;
    display: flex;
    width: 100%;
    padding: 3px;
    border-radius: 18px;
    justify-content: space-between;
    .icon {
      width: 10px;
      margin: 0 5px 0 8px;
    }
    input {
      flex: 1;
      background-color: #f7f8fa;
      border: none;
      font-size: 14px;
      appearance: none;
      -webkit-appearance: none;
      outline: none;
      line-height: normal;
    }
    .iconcls {
      padding: 0 10px;
      display: none;
    }
  }
}
.searchNone {
  display: none !important;
}
.searchShow {
  display: inline-block !important;
}
</style>