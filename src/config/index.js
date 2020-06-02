import {
  order_deal_data
} from "./orderConf"
import {
  ktv_contract_data
} from "./ktvContractConf"

export default {
  homeName: 'home',
  /**
   * @description token在Cookie中存储的分钟，默认60分钟
   */
  cookieExpires: 60,
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev: 'https://dev.bjywkd.com',
    test: 'https://test.bjywkd.com',
    pro: 'https://pro.bjywkd.com',
  },
  socketUrl: {
    dev: 'wkdev.bjywkd.com',
    test: 'wkceshi.bjywkd.com',
    pro: 'wkpro.bjywkd.com',
  },
  ktv_contract_data, // ktv合同
  order_deal_data, // 订单交易
}
