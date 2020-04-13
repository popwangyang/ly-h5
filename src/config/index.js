export default {

  homeName: 'home',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev: 'https://dev.bjywkd.com',
    test: 'https://test.bjywkd.com',
    pre: 'https://pre.bjywkd.com',
    info: 'https://info.bjywkd.com',
    socket: ''
  },
  ktv_contract_data: [{
      title: '合同类型',
      key: 'contract_type',
      list: [{
          id: 0,
          text: '全部',
          isSelected: true
        },
        {
          id: 1,
          text: '曲库服务协议',
          isSelected: false
        },
        {
          id: 2,
          text: '商户星盟',
          isSelected: false
        }
      ]
    },
    {
      title: '合同状态',
      key: 'contract_statue',
      list: [{
          id: 0,
          text: '全部',
          isSelected: true
        },
        {
          id: 1,
          text: '合同创建中',
          isSelected: false
        },
        {
          id: 2,
          text: '合同生效中',
          isSelected: false
        },
        {
          id: 3,
          text: '已过期',
          isSelected: false
        },
        {
          id: 4,
          text: '合同终止',
          isSelected: false
        }
      ]
    },
    {
      title: '审批状态',
      key: 'approval_statue',
      list: [{
          id: 0,
          text: '全部',
          isSelected: true
        },
        {
          id: 1,
          text: '审批中',
          isSelected: false
        },
        {
          id: 2,
          text: '已通过',
          isSelected: false
        },
        {
          id: 3,
          text: '未通过审批',
          isSelected: false
        }
      ]
    }
  ],

  order_deal_data: [{
      title: '交易状态',
      key: 'deal_status',
      list: [{
          id: 0,
          text: '全部',
          isSelected: true
        },
        {
          id: 2,
          text: '已支付',
          isSelected: false
        },
        {
          id: 4,
          text: '已退款',
          isSelected: false
        },
        {
          id: 6,
          text: '已完成',
          isSelected: false
        }
      ]
    },
    {
      title: '支付方式',
      key: 'pay_way',
      list: [{
          id: '',
          text: '全部',
          isSelected: true
        }, {
          id: 1,
          text: '微信',
          isSelected: false
        },
        {
          id: 2,
          text: '支付宝',
          isSelected: false
        },
        {
          id: 3,
          text: '其他',
          isSelected: false
        }
      ]
    },
  ]
}
