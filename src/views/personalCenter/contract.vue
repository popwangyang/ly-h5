<template>
  <div class="contractBox">
    <div class="contentBox" ref="scroll">
      <PageList :params="params" :getData="getData" noListText="暂无合同信息" ref="pageList">
        <template v-slot:default="slotProps">
          <ContractListItem v-for="(item, index) in slotProps.dataList" :data="item" :key="index" />
        </template>
      </PageList>
    </div>
  </div>
</template>

<script>
import config from "@/config/index";
import PageList from "@/components/pageList";
import ContractListItem from "@/components/listItems/contactListItem";
import { getContractList } from "@/api/ktv";
import { cacheMixins } from "@/libs/mixins";
export default {
  name: "contract",
  mixins: [cacheMixins],
  components: {
    PageList,
    ContractListItem
  },
  computed: {},
  data() {
    return {
      params: {
        ktv: this.$store.state.ktv.ktvID
      },
      getContractList: getContractList,
      screen: false,
      show: false,
      dataList: [],
      popupValue: {
        contract_type: 0,
        contract_statue: 0,
        approval_statue: 0
      },
      searchValue: {
        contract_type: 0,
        contract_statue: 0,
        approval_statue: 0
      },
      popupData: config.ktv_contract_data
    };
  },
  watch: {
    searchValue: {
      handler(newValue) {
        let flag = false;
        Object.keys(newValue).map(item => {
          if (newValue[item] != 0) {
            flag = true;
          }
        });
        this.screen = flag;
      },
      deep: true
    }
  },
  methods: {
    getData(params) {
      return new Promise((resolve, reject) => {
        getContractList(params).then(res => {
          let priorityArr = [2, 1, 3, 4]; // 根据合同状态排序，合同已生效排在第一位
          res.data.results.sort((a, b) => {
            if (priorityArr.indexOf(a.state) > priorityArr.indexOf(b.state)) {
              return 1;
            } else {
              return -1;
            }
          });
          let results = {
            total: res.data.count,
            data: res.data.results
          };
          this.dataList = res.data.results;
          resolve(results);
        });
      });
    }
  }
};
</script>

<style scoped="scoped" lang="less">
.contractBox {
  display: flex;
  flex-direction: column;
  height: 100%;
  .contentBox {
    flex: 1;
    overflow: auto;
    background: #f6f6f6;
  }

  .popupRightBox {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .bottom {
      width: 100%;
      height: 50px;
      display: flex;
      background: rgba(243, 245, 247, 1);
      box-shadow: 0px -1px 5px -1px rgba(0, 0, 0, 0.16);
      font-size: 16px;
      font-weight: 500;

      & > span {
        display: flex;
        flex: 1;
        height: 100%;
        align-items: center;
        justify-content: center;
      }

      & > span:nth-child(2) {
        flex: 2;
      }

      .a {
        background: #0082ff;
        color: white;
      }
    }

    .content {
      padding-left: 20px;

      .box {
        .boxTitle {
          font-size: 14px;
          color: #444444;
          display: block;
          margin: 20px 0;
          font-weight: 600;
        }

        .boxList {
          display: flex;
          flex-wrap: wrap;
          font-size: 12px;

          & > span {
            padding: 10px 20px;
            margin: 0 20px 20px 0;
            min-width: 70px;
            box-sizing: border-box;
            background: #f3f5f7;
            color: #444444;
          }

          & > span[class="isSelected"] {
            background: white;
            color: #0082ff;
            border-radius: 2px;
            border: 1px solid rgba(0, 130, 255, 1);
          }
        }
      }
    }
  }
}
</style>
