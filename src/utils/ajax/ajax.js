import Vue from 'vue';
import axios from 'axios';
import VueCookie from 'vue-cookie'
import VueAxios from 'vue-axios';
require('es6-promise').polyfill();
Vue.use(VueAxios, axios);

// 导入封装的回调函数
import {
	cbs,
	gbs,
	CONFIG
} from 'config/';

window.CONFIG = CONFIG;

// 动态设置本地和线上接口域名
Vue.axios.defaults.baseURL = CONFIG.rootUrl;

axios.defaults.withCredentials = true;
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  //console.log('token:',VueCookie.get('token'))
  config.headers.Authorization = VueCookie.get('admin_token');
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 拦截未登录
axios.interceptors.response.use(function (response) {
  // Do something with response data
  var status = response.status;
  var data = response.data;
  return response;
}, function (error) {
	var data = error.response.data;
	if (data.status == 401) {
		location.href = '/#/login'
		return;
	}
  return Promise.reject(error);
});

/**
 * 封装axios的通用请求
 * @param  {string}   type      get或post
 * @param  {string}   url       请求的接口URL
 * @param  {object}   data      传的参数，没有则传空对象
 * @param  {Function} fn        回调函数
 * @param  {boolean}   tokenFlag 是否需要携带token参数，为true，不需要；false，需要。一般除了登录，都需要
 */
export default function({
							type,
							path,
							data,
							fn,
							errFn,
							tokenFlag,
							headers,
							opts
						} = {}) {

	var options = {
		method : type,
		url    : path,
		headers: headers && typeof headers === 'object' ? headers : {}
	};

	options[type === 'get' ? 'params' : 'data'] = data;

	// 分发显示加载样式任务
	this.$store.dispatch('show_loading');

	if (tokenFlag !== true) {
		//如果你们的后台不会接受headers里面的参数，打开这个注释，即实现token通过普通参数方式传
		// data.token = this.$store.state.user.userinfo.token;

		options.headers.token = this.$store.state.user.userinfo.token || 'iprp_admin_f9ee1422687549f2a2c53dcc8a63e6c332ea56eed39b4793872778e88046ce51';
	}

	//axios内置属性均可写在这里
	if (opts && typeof opts === 'object') {
		for (var f in opts) {
			options[f] = opts[f];
		}
	}

	// console.log(options);

	//发送请求
	Vue.axios(options).then((res) => {
		this.$store.dispatch('hide_loading');
		if (res.data[gbs.api_status_key_field] === gbs.api_status_value_field) {
			if (gbs.api_data_field) {
				fn(res.data[gbs.api_data_field]);
			} else {
				fn(res.data);
			}
		} else {
			if (gbs.api_custom[res.data[gbs.api_status_key_field]]) {
				gbs.api_custom[res.data[gbs.api_status_key_field]].call(this, res.data);
			} else {
				if (errFn) {
					errFn.call(this, res.data);
				} else {
					cbs.statusError.call(this, res.data);
				}
			}
		}
	}).catch((err) => {
		this.$store.dispatch('hide_loading');
		// cbs.requestError.call(this, err);
	});
};
