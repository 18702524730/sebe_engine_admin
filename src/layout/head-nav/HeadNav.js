import {store} from 'utils/';
import VueCookie from 'vue-cookie'
export default {
	name: 'head-nav',
	data() {
	  return {
		menusData:[],
			name:'',
		dialog: {
			show_access: false,
			show_set: false,
			show_pass: false,
			title: '修改密码',
			user_info: this.$store.state.user.userinfo,

			set_info: {
				login_style: '',
				disabled_update_pass: [],
				select_users: []
			},

		}
	  }
	},
	mounted() {
	  // this.setDialogInfo('access');
	  this.initRouters();
		this.name = VueCookie.get('admin_name');
	},
	methods: {
		//修复切换主菜单不高亮的问题
		changeMenu(){
			this.$emit('complete', false);
			setTimeout(()=> {
				this.$emit('complete', true);
			}, 50);
		},
		initRouters(){
				var routes = this.$router.options.routes;
				// var permission = store.get('permission');
				var arr = [];
				for (var i = 0; i < routes.length; i++) {
					if (routes[i].hidden !== true) {
						var tempObj      = {},
							module       = routes[i],
							menus        = module.children || [];
						tempObj.name     = module.meta.name;
						tempObj.path     = module.path;
						tempObj.access   = module.path;
						tempObj.isAllowed = module.meta.permission == 'true';
						tempObj.children = [];
						for (var j = 0; j < menus.length; j++) {
							if (menus[j].hidden !== true && menus[j].children && menus[j].children.length) {
								var tempChildObj      = {},
									menu              = menus[j],
									pages             = menu.children;
								tempChildObj.name     = menu.meta.name;
								tempChildObj.path     = '/' + menu.path;
								tempChildObj.access   = tempObj.path + '/' + menu.path;
								tempChildObj.isAllowed = menu.meta.permission=='true';
								// tempChildObj.children = [];
								// for (var k = 0; k < pages.length; k++) {
								// 	if (pages[k].hidden !== true) {
								// 		var tempPageObj    = {},
								// 			page           = pages[k];
								// 		tempPageObj.name   = page.meta.name;
								// 		tempPageObj.path   = '/' + page.path;
								// 		tempPageObj.access = tempObj.path + '/' + menu.path + '/' + page.path;
								// 		tempPageObj.isAllowed = page.meta.permission =='true';
								// 		if (tempPageObj.isAllowed) {
								// 			tempChildObj.children.push(tempPageObj);
								// 		}
								// 	}
								// }
								if (tempChildObj.isAllowed) {
									tempObj.children.push(tempChildObj);
								}
							}
						}
						if (tempObj.isAllowed) {
							arr.push(tempObj);
						}
					}
				}
				console.log('menusData', arr);
				this.menusData = [].concat(arr);
				store.set('menusData', this.menusData);
				this.$emit('complete', true);
		},
		/**
		 * 退出登录
		 */
		logout() {
			this.$confirm('你确定退出登录么?', '确认退出', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$http.put('/api/admin/logout')
				.then((resp) => {
					this.$store.dispatch('remove_userinfo').then(() => {
				  	this.$router.push('/login');
				});
				}).catch((err) => {
				})
			});
		},



	}
}
