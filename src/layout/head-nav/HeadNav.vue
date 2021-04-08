<template>
    <div>

        <header class="head-nav">
            <div class="fl logo">
                拾贝引擎管理台
            </div>
            <div class="menu_wrap">
                <el-menu theme="dark" :default-active="$route.matched[0].path" class="el-menu-demo" @select="changeMenu"
                         mode="horizontal" unique-opened router>
                    <el-menu-item
                            v-for='item in menusData'
                            :index="item.path"
                            :key='item.path'
                            v-if='item.isAllowed'>
                        {{item.name}}
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="userinfo">
                <span class='username' style="font-size:14px; cursor: default">{{name}}
                </span>
                <i class="fa fa-sign-out logout" @click='logout'></i>
            </div>
        </header>

    </div>
</template>

<script>
	import HeadNavJs from './HeadNav.js';
	export default HeadNavJs;
</script>

<style lang='less'>
    

    .head-nav {
        width: 100%;
        height: 60px;
        background: #324057;
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 1000;
        color: #FFF;
        border-bottom: 1px solid #1F2D3D;
        .el-menu {
            background: none;
            .el-menu-item{
				color: #fff;
			}
            .el-menu-item.is-active {
                color: #409EFF;
                background-color: #324057;
                
            }
            .el-menu-item:hover {
                background: rgba(0, 0, 0, 0.6)
            }
        }
        .logout {
            width: 60px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            float: right;
            cursor: pointer;
        }
        .logo-container {
            height: 60px;
        }

        .logo {
            display: inline-block;
            height: 60px;
            line-height: 60px;
            width: 190px;
            text-align: center;
            font-size: 16px;
        }
        .menu_wrap{
            display: inline-block;
            width: auto;
        }

        .fa-user {
            position: relative;
            top: -2px;
            margin-right: 4px;
        }
        .userinfo {
            float: right;
            text-align: right;
        }

        .username {
            height: 60px;
            line-height: 60px;
            cursor: pointer;

            .el-dropdown {
                color: #FFF;
            }

        }
    }
    
</style>
