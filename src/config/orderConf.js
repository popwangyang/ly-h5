export const order_deal_data = [{
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
