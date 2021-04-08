import {Home,Content} from 'layout/';

import serviceOrder from './serviceOrder.js';

export default {
	path: '/order',
	name: 'order',
	meta:{
		name: '订单',
		permission: 'true'
	},
	icon: 'inbox',
	sort: 1,
	component: Home,
	redirect: '/order/serviceOrder',
	children:[serviceOrder]
};
