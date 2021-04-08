<template>
	<div class="left" :style="{'height':win_size.height,'width':$store.state.leftmenu.width}" id='admin-left'>
		<div id='left-menu'>
			<el-row class='tac'>
				<el-col :span="24">
					<el-menu class="el-menu-vertical-demo" theme="dark" :default-active="activePath" @select="handleSelect">
						<!-- v-if="!item.hidden && (($store.state.user.userinfo.access_status===1 && $store.state.user.userinfo.web_routers[route.path+'/'+item.path]) || $store.state.user.userinfo.access_status!==1)" -->
						<!-- <el-submenu :index="item.access" v-for="(item,index) in cMenusData" :key="item.name"
							v-if="item.isAllowed">
							<template slot="title">
								<el-tooltip	class="item" effect="dark" placement="right" :disabled="$store.state.leftmenu.menu_flag" :content="item.name">
									<i :class="'fa fa-'+item.icon"></i>
								</el-tooltip>
								<span class='menu-name' v-if="$store.state.leftmenu.menu_flag">{{item.name}}</span>
							</template>

							<el-menu-item
								v-for='child in item.children'
								:key='child.path'
								v-if="child.isAllowed"
								:style="{'padding-left':$store.state.leftmenu.menu_flag? '30px' : '23px'}"
								:index='child.access'>
								<el-tooltip class="item" effect="dark" placement="right" :disabled="$store.state.leftmenu.menu_flag" :content="child.name">
									<i :class="'fa fa-'+child.icon"></i>
								</el-tooltip>
								<span class='menu-name' v-if="$store.state.leftmenu.menu_flag">{{child.name}}</span>
							</el-menu-item>
						</el-submenu> -->
						<el-menu-item :index="item.access" v-for="item in cMenusData" :key="item.name"
							v-if="item.isAllowed">
							<template slot="title">
								<span class='menu-name'>{{item.name}}</span>
							</template>

						</el-menu-item>
					</el-menu>
				</el-col>
			</el-row>
			<!-- <div class="toggle-menu"
				 @click='toggleMenu'
				 :style='{left:$store.state.leftmenu.width}'>
				<i :class='[{"el-icon-arrow-left":$store.state.leftmenu.menu_flag},{"el-icon-arrow-right":!$store.state.leftmenu.menu_flag}]'></i>
			</div> -->
		</div>
	</div>
</template>

<script>
	import LeftMenu from './LeftMenu.js';
	export default LeftMenu;
</script>

<style lang='less'>
	@import url(./LeftMenu.less);
	#left-menu::-webkit-scrollbar{
		width: 4px;
	}
	#left-menu::-webkit-scrollbar-thumb{
		width: 4px;
		border-radius: 2px;
		background-color: #999;
	}
	#left-menu::-webkit-scrollbar-track{
		background-color: #ccc;
		border-radius: 2px;
	}
</style>
