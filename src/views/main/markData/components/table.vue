<template>
    <div class='tableBox'>
        <span class="title">
            <span>省份</span>
            <span>城市开通数</span>
            <span>KTV数</span>
            <span>包厢数</span>
        </span>
        <span class="item" v-for="item in data">
            <span>{{item.name}}</span>
            <span>{{item.ktv}}</span>
            <span>{{item[key[2]]}}</span>
            <span>{{item[key[3]]}}</span>
        </span>
    </div>
</template>

<script>
export default {
  props: {
      data: {
          type: Array,
          default: () => {
              return [];
          }
      },
      key: {
          type: Array,
          default: () => {
              return [];
          }
      }
  },
  data() {
    return {}
  },
  created() {},
  mounted() {}
}

</script>


<style scope lang='less'>
.tableBox{
    background: white;
    .title{
        display: flex;
        height: 30px;
        background-color: #F8F8F8;
        margin: 10px 0;
        &>span{
            display: flex;
            width: 25%;
            height: 30px;
            justify-content: space-around;
            align-items: center;
            color: #666666;
        }
    }
    .item{
        display: flex;
        &>span:nth-child(1){
            color: #0082FF;
        }
        &>span{
            display: flex;
            width: 25%;
            height: 48px;
            justify-content: space-around;
            align-items: center;
            color: #666666;
        }
    }
    .item + .item{
        border-top: 1px solid #F6F6F6;
    }
}
</style>