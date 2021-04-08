import {Home,Content} from 'layout/';

import acounts from './acounts.js';

export default {
	path: '/acount',
	name: 'acount',
	meta:{
		name: '账户',
		permission: 'true'
	},
	icon: 'inbox',
	sort: 1,
	component: Home,
	redirect: '/acount/acounts',
	children:[acounts]
};
