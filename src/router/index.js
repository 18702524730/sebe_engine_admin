import Vue from 'vue';
import Router from 'vue-router';
const originalPush = Router.prototype.push;
const originalReplace = Router.prototype.replace;
Router.prototype.push = function push(location, onResolve, onReject) {
	return originalPush.call(this, location).catch((err) => {
		return err;
	});
};
Router.prototype.replace = function replace(location, onResolve, onReject) {
	return originalReplace.call(this, location).catch((err) => {
		return err;
	});
};
Vue.use(Router);

import {Home, Content} from 'layout/';
import {Login} from 'views/';

import Order from './order/';
import Acounts from './acount/'
export default new Router({
	routes: [
		{
			path     : '/',
			name     : 'default',
			meta:{
				name: '登录'
			},
			hidden   : true,
			component: Login
		},
		{
			path     : '/login',
			name     : 'login',
			meta:{
				name: '登录'
			},
			hidden   : true,
			component: Login
		},
		Order,
		Acounts,
		{
      path: '*',
      hidden: true,
      name: 'other',
      redirect: { path: '/' }
    }
	]
})
