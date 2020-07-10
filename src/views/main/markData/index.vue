<template>
    <div class='markDataBox'>
        <RegionData @getData="getData" :hasTitle="false"/>
        <div class="tableBox">
          <TabbarBox :loading="loading" :data="data"/>
        </div>
    </div>
</template>

<script>
import RegionData from '../managementData/components/region'
import TabbarBox from './components/tabbar'
export default {
  components: {
    RegionData,
    TabbarBox
  },
  data() {
    return {
      loading: true,
      data: []
    }
  },
  methods: {
    getData(data){
      this.loading = false;
      this.data = data;
      console.log(data, "ppppp");
    }
  },
  created() {},


  mounted() {}
}

</script>


<style scope lang='less'>
  .markDataBox{
    height: 100%;
    display: flex;
    flex-direction: column;
    .tableBox{
      margin-top: 10px;
      flex: 1;
    }
  }
</style>