import {
	getKTVList
} from '@/api/ktv'
import {
	getCardTicketList
} from '@/api/cardTicket'
import {
	getOrderList
} from '@/api/order'
import ktvListItem from '@/components/listItems/ktvListItem.vue'
import cardTicketItem from '@/components/listItems/cardTicketItem'
import orderItem from '@/components/listItems/orderItem.vue'

export default {
	ktv: {
		api: getKTVList,
		template: ktvListItem,
		placeholder: '请输入门店名称'
	},
	cardTicket: {
		api: getCardTicketList,
		template: cardTicketItem,
		placeholder: '请输卡券序号'
	},
	order: {
		api: getOrderList,
		template: orderItem,
		placeholder: '请输入订单号'
	},
}