import {Content} from 'layout/';

import {Order} from 'views/';

export default {
	path: 'serviceOrder',
	name: 'serviceOrder',
	meta:{
		name: '服务订单',
		permission: 'true'
	},
	icon: 'inbox',
	component: Content,
	redirect: '/order/serviceOrder/orderList',
	children: [{
		path: 'orderList',
		name: 'orderList',
		meta:{
			name: '订单列表',
			permission: 'true'
		},
		icon: 'edit',
		hidden   : true,
		component: Order.serviceOrder.orderList
	}, {
		path: 'orderList/:id',
		name: 'orderDetail',
		meta:{
			name: '订单详情',
			permission: 'true'
		},
		hidden   : true,
		icon: 'reorder',
		component: Order.serviceOrder.orderDetail
	}]
};
