<template>
  <div class="personmidContract-wrapper" ref="scroll">
    <PageList :params="params" :getData="getContractList" noListText="暂未创建合同信息">
      <template v-slot:default="slotProps">
        <ContractListItem
          :showStatus="false"
          :data="item"
          :showPersonContract="true"
          v-for="(item, index) in slotProps.dataList"
          :key="index"
        />
      </template>
    </PageList>
  </div>
</template>

<script>
import PageList from "@/components/pageList";
import ContractListItem from "@/components/listItems/contactListItem";
import { getContractList } from "@/api/ktv";
import { cacheMixins } from "@/libs/mixins";

export default {
  name: "personContract",
  mixins: [cacheMixins],
  components: {
    PageList,
    ContractListItem
  },
  data() {
    return {
      params: {
        ktv: this.$store.state.user.ktv_id
      },
      getContractList: getContractList
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.personmidContract-wrapper {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: #f2f2f2;
}

::v-deep .van-pull-refresh {
  min-height: 100%;
}
</style>