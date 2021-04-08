import {Content} from 'layout/';

import {Acount} from 'views/';

export default {
	path: 'acounts',
	name: 'acounts',
	meta:{
		name: '账户管理',
		permission: 'true'
	},
	icon: 'inbox',
	component: Content,
	redirect: '/acount/acounts/acountList',
	children: [{
		path: 'acountList',
		name: 'acountList',
		meta:{
			name: '账户列表',
			permission: 'true'
		},
		icon: 'edit',
		hidden   : true,
		component: Acount.acounts.acountList
	}, {
		path: 'acountList/:id',
		name: 'acountDetail',
		meta:{
			name: '收支详情',
			permission: 'true'
		},
		hidden   : true,
		icon: 'reorder',
		component: Acount.acounts.acountDetail
	}]
};
